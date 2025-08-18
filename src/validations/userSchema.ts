import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "نام حداقل باید 3 حرف باشد")
    .required("نام الزامی است"),

  email: yup.string().email("ایمیل معتبر نیست").optional(),
  phone: yup
    .string()
    .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن الزامی است"),

  password: yup.string().min(6, "رمز عبور حداقل باید 6 رقم باشد"),
  role: yup.string().oneOf(["USER", "ADMIN"], "نقش باید USER یا ADMIN باشد"),
  refreshToken: yup.string().optional()
});
