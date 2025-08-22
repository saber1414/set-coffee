import * as yup from "yup";

export const commentSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "نام حداقل باید 3 حرف باشد")
    .required("نام کاربری الزامی است"),

  email: yup
    .string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی می باشد"),

  body: yup
    .string()
    .min(3, "متن حداقل باید 3 حرف باشد")
    .max(1000, "بیش از حد مجاز")
    .required("متن دیدگاه الزامی است"),

  score: yup
    .number()
    .min(1, "کمتر از 1 مجاز نیست")
    .max(5, "بیشتر از 5 مجاز نیست")
    .required("امتیاز الزامی می باشد"),

  product: yup
    .string()
    .required("شناسه محصول معتبر نیست")
    .matches(/^[0-9a-fA-F]{24}$/, "شناسه محصول معتبر نیست"),
});
