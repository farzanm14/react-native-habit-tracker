import { useFormik } from "formik";
import * as Yup from "yup";

export type HabitFormik = {
  title: string;
  description: string;
  target?: number;
};

export default function useHabitForm(submitForm: () => void) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      target: 0,
    },
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: HabitSchema,
    onSubmit: async (values) => {
      try {
        submitForm();
      } catch (error: any) {}
    },
  });

  // Custom handleBlur to validate field on blur
  const handleBlur = (field: keyof HabitFormik) => () => {
    formik.setFieldTouched(field, true);
    formik.validateField(field);
  };

  return { formik, handleBlur };
}

export const HabitSchema = Yup.object({
  title: Yup.string()
    .min(2, "title should be at least 2 characters")
    .required("title is required"),
  description: Yup.string().notRequired(),
});
