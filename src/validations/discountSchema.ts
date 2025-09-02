import * as yup from "yup";

export const discountSchema = yup.object({
  code: yup
    .string()
    .required("کد تخفیف الزامی است")
    .min(4, "کد تخفیف باید حداقل ۴ کاراکتر باشد")
    .matches(/^[A-Za-z0-9]+$/, "کد تخفیف فقط می‌تواند شامل حروف و عدد باشد"),
  maxUse: yup
    .number()
    .required("تعداد قابل استفاده الزامی است")
    .min(1, "حداقل تعداد استفاده باید ۱ باشد"),
  uses: yup
    .number()
    .required("تعداد استفاده شده الزامی است")
    .default(0)
    .min(0, "تعداد استفاده‌شده نمی‌تواند منفی باشد"),
  percent: yup
    .number()
    .required("درصد تخفیف الزامی است")
    .min(1, "حداقل درصد تخفیف باید ۱ باشد")
    .max(100, "حداکثر درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد"),
});
