import React from "react";
import { StyleProp, View } from "react-native";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface BoxshadowProps {
  children: React.ReactNode;
  boxShadow?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Boxshadow({
  children,
  boxShadow = "0 0 10 1 rgba(0, 0, 0, 0.1)",
  style,
}: BoxshadowProps) {
  return <View style={[style, { boxShadow }]}>{children}</View>;
}
