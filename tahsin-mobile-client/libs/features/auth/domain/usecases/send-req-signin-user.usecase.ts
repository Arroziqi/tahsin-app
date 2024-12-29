import { SendReqUsecase } from "@/libs/core/domain/send-req.usecase";
import { mobileApiClient } from "@/libs/core/services/mobile-axios.service";
import axios from "axios";
import { SigninReqUserEntity } from "@/libs/features/auth/domain/entities/signin-req-user.entity";
import { signinUserUrl } from "@/libs/core/routes/local-api.url";

export class SendReqSigninUserUsecase
  implements SendReqUsecase<SigninReqUserEntity, any>
{
  async execute(req: SigninReqUserEntity): Promise<any> {
    try {
      console.log("trying to send req to api");
      const response = await mobileApiClient.post(signinUserUrl, req);

      console.log("Successfully received response: ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error saat signin: ", error);
      if (axios.isAxiosError(error)) {
        console.log("Response error:", error.response?.data);
      }
      return error.response?.data;
    }
  }
}
