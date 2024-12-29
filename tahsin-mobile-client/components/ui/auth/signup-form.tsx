import React from "react";
import { TextInputProps, View } from "react-native";
import PrimaryButton from "@/components/buttons/primary-button";
import { ThemedView } from "@/components/ThemedView";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  SignupReqUserEntity,
  SignupReqUserSchema,
} from "@/libs/features/auth/domain/entities/signup-req-user.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithValidation from "@/components/form/input-with-validation";
import { Colors } from "@/constants/Colors";
import { SendReqSignupUserUsecase } from "@/libs/features/auth/domain/usecases/send-req-signup-user.usecase";
import ErrorLabel from "@/components/form/error-label";
import SuccessNavAlert from "@/components/alert/success-nav-alert";

type FormField = {
  label: string;
  name: keyof SignupReqUserEntity;
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
    constraint: "min. 8 karakter unik",
  },
  {
    name: "email",
    label: "Email",
    type: "emailAddress",
  },
];

const SignupForm = () => {
  const [responseMessage, setResponseMessage] = React.useState({
    error: null,
    message: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupReqUserEntity>({
    resolver: zodResolver(SignupReqUserSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupReqUserEntity> = async (
    data: SignupReqUserEntity,
  ) => {
    setResponseMessage({ error: null, message: "" });
    console.log("Payload:", data);

    const sendReqSignupUserUsecase = new SendReqSignupUserUsecase();
    const response = await sendReqSignupUserUsecase.execute(data);

    if (response.data) {
      console.log("Signup berhasil, respons:", response);
      setResponseMessage({ error: null, message: "Akun berhasil didaftarkan" });
    } else {
      console.log("respose error", response.errors.message);
      setResponseMessage({
        error: response.errors.status,
        message: response.errors.message
          ? response.errors.message
          : response.errors.error,
      });
    }
  };

  return (
    <>
      <View style={{ width: "80%" }}>
        {!responseMessage.error && responseMessage.message !== "" && (
          <SuccessNavAlert
            message={responseMessage.message}
            href={"/sign-in"}
            action={"Login"}
          />
        )}
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
        {responseMessage.error ? (
          <ErrorLabel error={responseMessage.message} />
        ) : (
          <View style={{ height: 45 }} />
        )}
        <PrimaryButton
          width={"100%"}
          text={"Daftar"}
          color={"#fff"}
          backgroundColor={isValid ? Colors.primary.pMutedTeal : "#97B6BD"}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </View>
    </>
  );
};

export default SignupForm;
