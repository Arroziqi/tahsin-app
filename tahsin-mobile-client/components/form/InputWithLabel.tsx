import React from "react";
import ThemedTextInput, {
  ThemedTextInputProps,
} from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Text, View } from "react-native";
import ThemedDateInput from "@/components/ThemedDateInput";
import ThemedCheckInput from "@/components/ThemedCheckInput";
import ThemedSelectInput from "@/components/ThemedSelectInput";

type InputType = "text" | "date" | "select" | "check";

export type InputWithLabelProps = ThemedTextInputProps & {
  label: string;
  constraint?: string;
  inputType?: InputType;
};

const InputWithLabel = ({
  label,
  constraint,
  inputType = "text",
  ...rest
}: InputWithLabelProps) => {
  const renderInput = (type: InputType) => {
    switch (type) {
      case "date":
        return <ThemedDateInput {...rest} />;
      case "select":
        return <ThemedSelectInput {...rest} />;
      case "check":
        return <ThemedCheckInput {...rest} />;
      default:
        return <ThemedTextInput {...rest} />;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <ThemedText type={"label"}>{label}</ThemedText>
        <Text style={styles.textConstraint}>
          {constraint ? `(${constraint})` : ""}
        </Text>
      </View>
      {renderInput(inputType)}
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
