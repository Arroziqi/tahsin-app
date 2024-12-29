import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import icons from "@/constants/icons";

type SuccessNavAlertProps = {
  message: string;
  action: string;
  href: any;
};

const SuccessNavAlert = ({ message, action, href }: SuccessNavAlertProps) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.contentContainer}>
        <Image
          source={icons.checkCircle}
          resizeMode={"contain"}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Success</Text>
          <Text style={styles.text}>{message}</Text>
        </View>
        <Link style={styles.link} href={href}>
          {action}
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.primary.pSteelBlue,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
    alignContent: "center",
    gap: 20,
    alignItems: "center",

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    // Shadow for Android
    elevation: 5,
    backgroundColor: "#fff",
  },
  image: {
    width: 85,
    height: 85,
  },
  textContainer: {
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3A61FC",
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  link: {
    fontWeight: "semibold",
    fontSize: 16,
    color: "white",
    backgroundColor: "#3A61FC",
    paddingHorizontal: 32,
    paddingVertical: 5,
    borderRadius: 8,
  },
});

export default SuccessNavAlert;
