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
    // const tokenData = await Token.find({ relations: { owner: true } });

    // console.log(tokenData);

    // // if (tokenData) {
    // //   tokenData.refreshToken = refreshToken;
    // //   tokenData.owner = user.id;
    // //   return tokenData.save();
    // // }
    const token = await Token.create({ refreshToken, owner: user }).save();

    return {
      refreshToken: token.refreshToken,
      user_id: token.id,
      id: token.id,
    };
  }
}
