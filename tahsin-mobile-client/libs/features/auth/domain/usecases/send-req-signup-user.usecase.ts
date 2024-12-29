import { SendReqUsecase } from "@/libs/core/domain/send-req.usecase";
import { SignupReqUserEntity } from "@/libs/features/auth/domain/entities/signup-req-user.entity";
import { mobileApiClient } from "@/libs/core/services/mobile-axios.service";
import axios from "axios";
import { signupUserUrl } from "@/libs/core/routes/local-api.url";

export class SendReqSignupUserUsecase
  implements SendReqUsecase<SignupReqUserEntity, any>
{
  async execute(req: SignupReqUserEntity): Promise<any> {
    try {
      console.log("trying to send req to api");
      const response = await mobileApiClient.post(signupUserUrl, req);

      console.log("Successfully received response: ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error saat signup: ", error);
      if (axios.isAxiosError(error)) {
        console.log("Response error:", error.response?.data);
      }
      return error.response?.data;
    }
  }
}
