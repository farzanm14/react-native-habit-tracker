import MyText from "@/components/base/Text";
import R from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export type PieChartSlice = {
  value: number;
  color: string;
  label: string;
};

export type PieChartProps = {
  data: PieChartSlice[];
  centerLabel: string;
};

export default function DonutChart({ data, centerLabel }: PieChartProps) {
  return (
    <View style={styles.wrapper}>
      <PieChart
        data={data}
        donut
        innerRadius={70}
        showGradient
        strokeWidth={R.dimensions.borderWidthHalf}
        strokeColor={R.colors.border}
        centerLabelComponent={() => (
          <MyText variant="subtitle" style={styles.centralLabel}>
            {centerLabel}
          </MyText>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: "center", justifyContent: "center" },
  centralLabel: {
    alignSelf: "center",
    textAlign: "center",
  },
});
