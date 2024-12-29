import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export type ContentItem = {
  imgUrl: any;
  text: string;
};

type OnboardingItemProps = {
  item: ContentItem;
  index?: number;
};

const OnboardingItem = ({ item, index }: OnboardingItemProps) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.imageContainer}>
        <Image source={item.imgUrl} style={[styles.image, { width }]} />
      </View>
      <View style={styles.textContainer}>
        <ThemedText style={styles.text}>{item.text}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "flex-end",
  },
  image: {
    height: 415,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 0.3,
  },
  text: {
    fontSize: 18,
    color: "#8789A3",
    textAlign: "center",
    lineHeight: 27,
  },
});

export default OnboardingItem;
