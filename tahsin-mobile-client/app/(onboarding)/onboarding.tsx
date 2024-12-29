import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import images from "@/constants/images";
import OnboardingItem, {
  ContentItem,
} from "@/components/ui/onboarding/onboarding-item";
import OnboardingIndicator from "@/components/ui/onboarding/onboarding-indicator";
import OnboardingButton from "@/components/ui/onboarding/onboarding-button";

const CONTENT: ContentItem[] = [
  {
    imgUrl: images.alquran,
    text: "Pelajari Al-Quran dengan \n Mudah di Tahsin App",
  },
  {
    imgUrl: images.muslim,
    text: "Belajar Tahsin Bersama \n Pengajar Berpengalaman",
  },
  {
    imgUrl: images.mosque,
    text: "Tingkatkan Kekhusyukan \n Ibadah dengan Tahsin App",
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const index = viewableItems[0]?.index || 0;
      setCurrentIndex(index);
      if (index === CONTENT.length - 1) {
        setHasReachedEnd(true);
      } else {
        setHasReachedEnd(false);
      }
    },
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slideContainer}>
        <FlatList
          data={CONTENT}
          keyExtractor={(item) => item.imgUrl}
          renderItem={({ item, index }) => (
            <OnboardingItem item={item} index={index} />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
        />
      </View>
      <View style={styles.indicatorContainer}>
        <OnboardingIndicator data={CONTENT} scrollX={scrollX} />
      </View>
      <View style={styles.buttonContainer}>
        {hasReachedEnd && <OnboardingButton />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideContainer: {
    flex: 2,
  },
  indicatorContainer: {
    flex: 0.2,
  },
  buttonContainer: {
    flex: 0.35,
  },
});

export default OnboardingScreen;
