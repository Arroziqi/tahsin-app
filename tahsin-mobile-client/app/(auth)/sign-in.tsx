import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import SigninForm from "@/components/ui/auth/signin-form";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

const QuestionText = () => {
  return (
    <View style={styles.questionText}>
      <ThemedText style={styles.text}>Belum punya akun?</ThemedText>
      <Link style={styles.link} href={"/sign-up"}>
        Daftar
      </Link>
    </View>
  );
};

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SigninForm />
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

export default SignInScreen;
