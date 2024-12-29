import { z } from "zod";

export const SigninReqUserSchema = z.object({
  username: z.string().nonempty("Username tidak boleh kosong"),
  password: z.string().nonempty("Password tidak boleh kosong"),
});

export type SigninReqUserEntity = z.infer<typeof SigninReqUserSchema>;
