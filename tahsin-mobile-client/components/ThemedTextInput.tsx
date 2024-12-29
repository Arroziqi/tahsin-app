import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import icons from "@/constants/icons";

export type ThemedTextInputProps = TextInputProps & {
  backgroundColor?: string;
  color?: string;
  type?: TextInputProps["textContentType"];
  name?: string;
};

const ThemedTextInput = ({
  backgroundColor = "#F0F5F5",
  color = "#000000",
  type = "none",
  ...rest
}: ThemedTextInputProps) => {
  const [iseSecureTextEntry, setIseSecureTextEntry] = React.useState(
    type === "password",
  );

  const handleSecureText = () => {
    setIseSecureTextEntry(!iseSecureTextEntry);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        textContentType={type}
        secureTextEntry={iseSecureTextEntry}
        style={[styles.textInput, { color, backgroundColor }]}
        {...rest}
      />
      {type === "password" && (
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={handleSecureText}
        >
          <Image
            source={icons.eye}
            style={styles.icon}
            resizeMode={"contain"}
          />
        </TouchableWithoutFeedback>
      )}
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

export default ThemedTextInput;
