import React from "react";
import { StyleSheet, Text } from "react-native";
import InputWithLabel, {
  InputWithLabelProps,
} from "@/components/form/InputWithLabel";
import BoxShadow from "@/components/BoxShadow";

export interface CardFormProps {
  title: string;
  inputs: InputWithLabelProps[];
}

export default function CardForm({ title, inputs }: CardFormProps) {
  return (
    <BoxShadow style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {inputs.map((input: InputWithLabelProps, index: number) => (
        <InputWithLabel
          label={input.label}
          inputType={input.inputType}
          placeholder={input.placeholder}
          key={index}
        />
      ))}
    </BoxShadow>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 27,
    borderRadius: 8,
    backgroundColor: "white",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006970",
  },
});
