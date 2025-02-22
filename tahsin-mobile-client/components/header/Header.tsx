import React from "react";
import { StyleSheet, View } from "react-native";
import ToggleMenu from "../ToggleMenu";
import SecondaryButton from "../buttons/SecondaryButton";

function Header() {
  return (
    <View style={styles.container}>
      <ToggleMenu />
      <SecondaryButton text="Log In" width={118} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 31,
    paddingVertical: 29,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 27,
  },
});

export default Header;
