import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RowView from "@/components/RowView";
import IndicatorItem from "@/components/progress/IndicatorItem";

interface IndicatorProps {
  title?: string;
  currentStep?: number;
}

const Indicator = ({ title, currentStep }: IndicatorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{"Langkah 1 dari 3"}</Text>
      <RowView justifyContent="space-between" style={styles.indicatorContainer}>
        <IndicatorItem active={true} width={"32%"} />
        <IndicatorItem active={false} width={"32%"} />
        <IndicatorItem active={false} width={"32%"} />
      </RowView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 35,
    gap: 10,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 12,
    color: "#848484",
  },
  indicatorContainer: {},
});

export default Indicator;
