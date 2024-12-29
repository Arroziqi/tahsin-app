import React from "react";
import PrimaryButton from "@/components/buttons/primary-button";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const OnboardingButton = () => {
  const router = useRouter();
  return (
    <PrimaryButton
      text={"Mulai Gabung"}
      color={"#fff"}
      backgroundColor={Colors.primary.pDeepBlue}
      onPress={() => router.push("/sign-in")}
    />
  );
};

export default OnboardingButton;
