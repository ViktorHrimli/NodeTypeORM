import jwt from "jsonwebtoken";

import { Token, Users } from "../entites";

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
  async saveToken(user: Users, refreshToken: string) {
    const tokenData = await Token.findOneBy({ user_id: user.id });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.user_id = user.id;
      return tokenData.save();
    }
    const token = await Token.create({ refreshToken, user_id: user.id }).save();

    return {
      refreshToken: token.refreshToken,
      user_id: token.id,
      id: token.id,
    };
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.findOneBy({ refreshToken });
    tokenData?.remove({ data: refreshToken });
    tokenData?.save();
    return tokenData;
  }
}
