import { Users, Token } from "../entites";
import { UserDto } from "../dto/userDto";
import { TokenServices } from "./token";

import * as uuid from "uuid";

export class UserService {
  async signin(email: string, password: string) {
    try {
      const tokenServices = new TokenServices();

      const candidat = await Users.findOneBy({ email });
      if (candidat) {
        throw new Error("User with this email already register!");
      }

      const activationLink = uuid.v4();

      const newUser = Users.create({ email, password, activationLink });
      await newUser.save();

      const payload = new UserDto(newUser);

      const { refreshToken } = await tokenServices.generationToken({
        ...payload,
      });
      const token = tokenServices.saveToken(newUser, refreshToken);

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup() {}
  async signout() {}
  async getAll() {
    return await Users.find();
  }
  async isActive() {}
}