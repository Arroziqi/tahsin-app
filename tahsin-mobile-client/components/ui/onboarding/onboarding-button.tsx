import React from "react";
import PrimaryButton from "@/components/buttons/primary-button";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const OnboardingButton = () => {
  const router = useRouter();
  return (
    <PrimaryButton
      text={"Mulai Gabung"}
      color={"#fff"}
      backgroundColor={Colors.primary.two}
      onPress={() => router.push("/sign-in")}
      style={styles.container}
    />
  );
};

export default OnboardingButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
