import React from "react";
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type PrimaryButtonProps = TouchableOpacityProps & {
  text: string;
  color: string;
  backgroundColor: string;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
};

const PrimaryButton = ({
  text,
  backgroundColor,
  color,
  width = "80%",
  style,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      style={[style, styles.button, { backgroundColor, width: width }]}
      {...rest}
    >
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  text: {
    fontWeight: "semibold",
    fontSize: 18,
    lineHeight: 27,
    textAlign: "center",
    paddingVertical: 17,
  },
});

export default PrimaryButton;
