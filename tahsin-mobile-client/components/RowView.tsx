import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface RowViewProps {
  style?: StyleProp<ViewStyle>;
  gap?: number;
  justifyContent?:
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "center"
    | "flex-start"
    | "flex-end";
  children?: React.ReactNode;
}

const RowView = ({ style, gap, justifyContent, children }: RowViewProps) => {
  return (
    <View style={[styles.container, style, { gap, justifyContent }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default RowView;
