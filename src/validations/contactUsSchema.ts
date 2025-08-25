import * as yup from "yup";

export const contactUsSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, "نام و نام خانوادگی حداقل باید 6 حرف باشد")
    .required("نام و نام خانوادگی الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  phone: yup
    .string()
    .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن الزامی است"),
  company: yup.string().optional(),
  message: yup
    .string()
    .min(3, "متن پیام حداقل باید سه حرف باشد")
    .required("متن پیام الزامی است"),
});
