import React from "react";
import ThemedTextInput, {
  ThemedTextInputProps,
} from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Text, View } from "react-native";

export type InputWithLabelProps = ThemedTextInputProps & {
  label: string;
  constraint?: string;
};

const InputWithLabel = ({
  label,
  constraint,
  ...rest
}: InputWithLabelProps) => {
  return (
    <ThemedView style={styles.container}>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <ThemedText type={"label"}>{label}</ThemedText>
        <Text style={styles.textConstraint}>
          {constraint ? `(${constraint})` : ""}
        </Text>
      </View>
      <ThemedTextInput {...rest} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 9,
    width: "100%",
  },
  textConstraint: {
    color: "#858C92",
    fontSize: 10,
    flexShrink: 1,
  },
});

export default InputWithLabel;
