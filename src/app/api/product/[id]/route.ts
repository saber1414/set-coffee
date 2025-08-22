import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { handleYupError } from "@/lib/handleYupError";
import { authenticate } from "@/middleware/auth";
import { productSchema } from "@/validations/productSchema";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/models/Comment";
import path from "path";
import fs from "fs";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    const imagePaths: string[] = [];

    for (const file of files) {
      if (file.size === 0) continue;

      const buffer = await file.arrayBuffer();
      const fileName = Date.now + "-" + file.name;
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);

      fs.writeFileSync(filePath, Buffer.from(buffer));

      imagePaths.push(`/uploads/${fileName}`);
    }

    const productData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      price: Number(formData.get("price")),
      rating: Number(formData.get("rating") || 0),
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      stock: Number(formData.get("stock") || 0),
      category: formData.get("category"),
      tags: (formData.get("tags") as string)?.split(",") || [],
      images: imagePaths.length > 0 ? imagePaths : undefined,
    };

    await productSchema.validate(productData, { abortEarly: false });

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      productData,
      { new: true }
    );

    return NextResponse.json(
      { message: "محصول با موفقیت ویرایش شد", product: updatedProduct },
      { status: 200 }
    );
  } catch (err) {
    const { body, status } = handleYupError(err);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const user = await authenticate();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json(
        { message: "محصولی با این شناسه یافت نشد" },
        { status: 404 }
      );
    }

    await Comment.deleteMany({ product: id });

    return NextResponse.json(
      { message: "محصول و دیدگاه‌های مرتبط با موفقیت حذف شدند" },
      { status: 200 }
    );
  } catch (err) {
    console.error("🔥 خطا در حذف محصول:", err);
    return NextResponse.json({ error: "خطای ناشناخته" }, { status: 500 });
  }
}
