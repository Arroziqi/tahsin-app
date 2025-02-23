import React from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import icons from "@/constants/icons";
import ThemedTextInput from "@/components/ThemedTextInput";

export type ThemedSelectInputProps = {
  backgroundColor?: string;
  color?: string;
  name?: string;
};

const ThemedSelectInput = ({
  backgroundColor = "#F0F5F5",
  color = "#000000",
  ...rest
}: ThemedSelectInputProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ThemedTextInput
        style={[styles.textInput, { color, backgroundColor }]}
        {...rest}
      />
      {
        <TouchableWithoutFeedback style={{ flex: 1 }}>
          <Image
            source={icons.eye}
            style={styles.icon}
            resizeMode={"contain"}
          />
        </TouchableWithoutFeedback>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    borderRadius: 8,
  },
  textInput: {
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
    flex: 1,
    fontSize: 15,
  },
  icon: {
    width: 18,
    height: 18,
    marginHorizontal: 7,
    marginEnd: 21,
  },
});

export default ThemedSelectInput;
