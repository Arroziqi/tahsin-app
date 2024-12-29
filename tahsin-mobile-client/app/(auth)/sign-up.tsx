import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import SignupForm from "@/components/ui/auth/signup-form";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

const QuestionText = () => {
  return (
    <View style={styles.questionText}>
      <ThemedText style={styles.text}>Sudah punya akun?</ThemedText>
      <Link style={styles.link} href={"/sign-in"}>
        Masuk
      </Link>
    </View>
  );
};

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignupForm />
      <QuestionText />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 45,
    backgroundColor: "#fff",
  },
  questionText: {
    flexDirection: "row",
    gap: 5,
  },
  text: {
    fontSize: 14,
  },
  link: {
    fontWeight: "medium",
    color: Colors.primary.pMutedTeal,
  },
});

export default SignUpScreen;
