import MyButton from "@/components/base/Button";
import { Input } from "@/components/base/Input";
import MySwitch from "@/components/base/Switch";
import R from "@/constants";
import { HabitFormik } from "@/hooks/useHabitForm";
import { FormikProps } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  formik: FormikProps<HabitFormik>;
  handleBlur: (field: keyof HabitFormik) => () => void;
  submitLabel?: string;
};

export default function AddOrUpdateHabitForm({
  formik,
  handleBlur,
  submitLabel = "submit",
}: Props) {
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
          value={formik.values.target.hasAmount}
          onValueChange={(val) => {
            formik.setFieldValue("target.hasAmount", val);
          }}
        />
        {formik.values.target.hasAmount && (
          <Input
            id="targetAmount"
            label="Target Amount"
            value={formik.values.target.amount?.toString() || ""}
            onChangeText={(val: string) =>
              formik.setFieldValue("target.amount", Number(val))
            }
            placeholder="Enter your target amount, e.g., 10 times or 1 hour"
            keyboardType="numeric"
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
