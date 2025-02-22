import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { TextInputProps, View } from "react-native";
import PrimaryButton from "@/components/buttons/primary-button";
import { Colors } from "@/constants/Colors";
import ErrorLabel from "@/components/form/error-label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SigninReqUserEntity,
  SigninReqUserSchema,
} from "@/libs/features/auth/domain/entities/signin-req-user.entity";
import { SendReqSigninUserUsecase } from "@/libs/features/auth/domain/usecases/send-req-signin-user.usecase";
import { Redirect, router } from "expo-router";
import InputWithValidation from "@/components/form/input-with-validation";
import { development } from "@/libs/core/config";

type FormField = {
  label: string;
  name: keyof SigninReqUserEntity;
  type: TextInputProps["textContentType"];
  constraint?: string;
};

const FORM_FIELD: FormField[] = [
  {
    name: "username",
    label: "Username",
    type: "username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const SigninForm = () => {
  const [error, setError] = React.useState("");
  const [isSubmitSuccessful, setIsSubmitSuccessful] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninReqUserEntity>({
    resolver: zodResolver(SigninReqUserSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SigninReqUserEntity> = async (
    data: SigninReqUserEntity
  ) => {
    console.log("Payload:", data);

    const sendReqSigninUserUsecase = new SendReqSigninUserUsecase();
    const response = await sendReqSigninUserUsecase.execute(data);

    if (response.data) {
      console.log("Signin berhasil, respons:", response);
      setError("");
      setIsSubmitSuccessful(true);
    } else {
      setError(
        response.errors.message
          ? response.errors.message
          : response.errors.error
      );
    }
  };

  if (isSubmitSuccessful) {
    return <Redirect href={"/home"} />;
  }

  return (
    <View style={{ width: "80%" }}>
      <ThemedView style={{ gap: 24 }}>
        {FORM_FIELD.map(({ constraint, label, name, type }: FormField) => (
          <InputWithValidation
            label={label}
            control={control}
            errors={errors}
            constraint={constraint}
            name={name}
            type={type}
            key={name}
          />
        ))}
      </ThemedView>
      {error ? <ErrorLabel error={error} /> : <View style={{ height: 45 }} />}
      <PrimaryButton
        width={"100%"}
        text={"Masuk"}
        color={"#fff"}
        backgroundColor={
          (isValid ? Colors.primary.pMutedTeal : "#97B6BD") as string
        }
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      />
      {development && (
        <PrimaryButton
          width={"100%"}
          text={"Masuk"}
          color={"#fff"}
          backgroundColor={Colors.primary.pMutedTeal as string}
          onPress={() => {
            router.push("/(tabs)/home");
          }}
          disabled={false}
        />
      )}
    </View>
  );
};

export default SigninForm;
