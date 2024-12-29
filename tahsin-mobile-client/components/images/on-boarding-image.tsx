import React from "react";
import { Image, ImageProps, StyleSheet } from "react-native";

interface OnBoardingImageProps extends ImageProps {
  width?: number;
  height?: number;
}

export function OnBoardingImage({
  source,
  width = 200,
  height = 200,
  style,
  ...rest
}: OnBoardingImageProps) {
  return (
    <Image
      source={source}
      style={[styles.image, { width, height }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});
