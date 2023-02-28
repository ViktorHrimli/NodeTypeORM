import jwt from "jsonwebtoken";
import { Token } from "../entites";

interface IPayload {
  email: string;
  id: number;
  isActivated: boolean;
}

const { SECRET_ACCESS_JWT, SECRET_REFRESH_JWT } = process.env;

export class TokenServices {
  async generationToken(payload: IPayload) {
    const accssesToken = jwt.sign(payload, SECRET_ACCESS_JWT!, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(payload, SECRET_REFRESH_JWT!, {
      expiresIn: "30d",
    });

    return {
      accssesToken,
      refreshToken,
    };
  }
  async saveToken(user: any, refreshToken: string) {
    // const tokenData = await Token.findOneBy({ users_id: user.id });

    // if (tokenData) {
    //   tokenData.refreshToken = refreshToken;
    //   tokenData.users_id = user.id;
    //   return tokenData.save();
    // }
    const token = Token.create({ refreshToken });

    token.users_id = user.id;
    await token.save();

    return token;
  }
}
