import { Controller } from "react-hook-form";
import InputWithLabel, {
  InputWithLabelProps,
} from "@/components/form/InputWithLabel";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import React from "react";

type InputWithValidationProps = InputWithLabelProps & {
  control: any;
  errors: any;
};

const InputWithValidation = ({
  control,
  errors,
  label,
  constraint,
  type,
  name,
  ...rest
}: InputWithValidationProps) => {
  return (
    <View>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <InputWithLabel
            label={label}
            constraint={constraint}
            onBlur={onBlur}
            type={type}
            value={value}
            onChangeText={onChange}
            {...rest}
          />
        )}
        name={name!}
      />
      {errors[name!] && (
        <ThemedText style={{ color: Colors.primary.red }}>
          {errors[name!].message}
        </ThemedText>
      )}
    </View>
  );
};

export default InputWithValidation;
