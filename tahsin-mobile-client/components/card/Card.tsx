import React from "react";
import {
  ColorValue,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../ThemedText";

export interface CardProps {
  image?: ImageSourcePropType;
  title?: string;
  subTitle?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  backgroundColor?: ColorValue;
}

function Card({
  image,
  title,
  subTitle,
  style,
  titleStyle,
  subTitleStyle,
  imageStyle,
  backgroundColor,
}: CardProps) {
  return (
    <View style={[styles.container, style, { backgroundColor }]}>
      {image && <Image source={image} style={[styles.image, imageStyle]} />}
      <View style={styles.body}>
        <ThemedText style={[styles.title, titleStyle]}>{title}</ThemedText>
        <ThemedText style={[styles.subTitle, subTitleStyle]}>
          {subTitle}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderRadius: 15,
    justifyContent: "center",
  },
  image: {},
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
  },
  body: {
    gap: 6,
  },
});

export default Card;
