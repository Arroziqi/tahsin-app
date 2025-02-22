import React from "react";
import { BoxShadowValue, StyleProp, StyleSheet } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface BoxShadowProps {
  boxShadow?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function BoxShadow({ boxShadow, children, style }: BoxShadowProps) {
  return (
    <View style={[styles.container, { boxShadow }, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    boxShadow: "4px 4px 30px 2px rgba(208, 193, 193, 0.25)",
  },
});

export default BoxShadow;
