import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";

interface IndicatorItemProps {
  active: boolean;
  width: DimensionValue;
}

const IndicatorItem = ({ active = false, width }: IndicatorItemProps) => {
  return (
    <View
      style={[
        styles.container,
        !active
          ? { backgroundColor: "#C7D3EB" }
          : { backgroundColor: "#428594" },
        { width },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 5,
  },
});

export default IndicatorItem;
