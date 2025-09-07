import MyButton from "@/components/base/Button";
import { Input } from "@/components/base/Input";
import MySwitch from "@/components/base/Switch";
import R from "@/constants";
import { HabitFormik } from "@/hooks/useHabitForm";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  formik: FormikProps<HabitFormik>;
  handleBlur: (field: keyof HabitFormik) => () => void;
  submitLabel?: string;
  initialValues?: HabitFormik;
};

export default function AddOrUpdateHabitForm({
  formik,
  handleBlur,
  submitLabel = "submit",
  initialValues,
}: Props) {
  const [hasTarget, setHasTarget] = useState(false);
  useEffect(() => {
    if (initialValues) {
      formik.setFieldValue("title", initialValues.title);
      formik.setFieldValue("description", initialValues.description);
      if (initialValues.target) {
        setHasTarget(true);
        formik.setFieldValue("target", initialValues.target);
      }
    }
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Input
          id="title"
          label="title"
          value={formik.values.title}
          onChangeText={(val: string) => formik.setFieldValue("title", val)}
          placeholder="Enter the habits title, e.g., Read a book"
          onBlur={handleBlur("title")}
          error={formik.touched.title ? formik.errors.title : ""}
        />
        <Input
          id="description"
          label="Description"
          value={formik.values.description}
          onChangeText={(val: string) =>
            formik.setFieldValue("description", val)
          }
          placeholder="Enter the habits description, e.g., tack a shower"
          error={formik.touched.description ? formik.errors.description : ""}
          onBlur={handleBlur("description")}
        />
        <MySwitch
          label="Set Target Amount"
          value={hasTarget}
          onValueChange={() => {
            setHasTarget(!hasTarget);
            if (hasTarget) {
              formik.setFieldValue("target", undefined); // reset target when disabling
            }
          }}
        />
        {hasTarget && (
          <Input
            id="targetAmount"
            label="Target Amount"
            value={formik.values?.target?.toString() || ""}
            onChangeText={(val: string) =>
              formik.setFieldValue("target", Number(val))
            }
            placeholder="Enter your target amount, e.g., 10 times or 1 hour"
            keyboardType="numeric"
            error={formik.touched.target ? formik.errors.target : ""}
          />
        )}
      </View>
      <MyButton title={submitLabel} onPress={() => formik.handleSubmit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: R.dimensions.h16,
    flex: 1,
  },
  inputsContainer: {
    gap: R.dimensions.v16,
    flex: 1,
  },
});
