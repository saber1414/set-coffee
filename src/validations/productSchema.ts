// validations/productSchema.ts
import * as yup from "yup";

export const productSchema = yup.object({
  title: yup
    .string()
    .required("عنوان الزامی است")
    .min(3, "عنوان باید حداقل ۳ حرف باشد"),
  slug: yup.string().required("اسلاگ الزامی است"),

  price: yup
    .number()
    .required("قیمت الزامی است")
    .min(1000, "قیمت باید بیشتر از ۱۰۰۰ تومان باشد"),
  rating: yup.number().min(0).max(5),
  shortDescription: yup
    .string()
    .required("توضیح کوتاه الزامی است")
    .min(10, "حداقل ۱۰ حرف"),
  description: yup
    .string()
    .required("توضیحات کامل الزامی است")
    .min(20, "حداقل ۲۰ حرف"),
  stock: yup.number().required("موجودی الزامی است").min(0),
  category: yup.string().required("دسته‌بندی الزامی است"),
  tags: yup.array().of(yup.string().min(2)).optional(),
  images: yup.array().of(yup.mixed()).optional(),
});
