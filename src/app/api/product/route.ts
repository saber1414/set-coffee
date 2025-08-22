import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { handleYupError } from "@/lib/handleYupError";
import { authenticate } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/validations/productSchema";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});

    if (!products)
      return NextResponse.json(
        { message: "هیچ محصولی یافت نشد" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "همه محصولات", products },
      { status: 200 }
    );
  } catch (err) {
    const { body, status } = handleYupError(err);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "فقط مدیر مجاز به ثبت محصول است" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "ارسال حداقل یک عکس الزامی است" },
        { status: 400 }
      );
    }

    const imagePaths: string[] = [];

    for (const file of files) {
      if (file.size === 0) continue;

      const buffer = await file.arrayBuffer();
      const filename = Date.now() + "-" + file.name;
      const filePath = path.join(process.cwd(), "public", "uploads", filename);

      fs.writeFileSync(filePath, Buffer.from(buffer));
      imagePaths.push(`/uploads/${filename}`);
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
      details: {},
      images: imagePaths,
    };

    await productSchema.validate(productData, { abortEarly: false });

    const product = await Product.create(productData);

    return NextResponse.json(
      { message: "محصول با موفقیت ثبت شد", product },
      { status: 201 }
    );
  } catch (err) {
    const { body, status } = handleYupError(err);
    return NextResponse.json(body, { status });
  }
}
