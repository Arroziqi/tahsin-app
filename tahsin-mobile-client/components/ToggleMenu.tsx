import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

function ToggleMenu() {
  return (
    <TouchableOpacity style={styles.containier}>
      <Image
        source={require("@/assets/vectors/strip.png")}
        style={styles.strip}
      />
      <Image
        source={require("@/assets/vectors/strip.png")}
        style={styles.strip}
      />
      <Image
        source={require("@/assets/vectors/strip.png")}
        style={styles.strip}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containier: {
    justifyContent: "center",
    alignItems: "center",
    gap: 1.37,
  },
  strip: {
    width: 25,
    height: 7,
    resizeMode: "contain",
  },
});

export default ToggleMenu;
