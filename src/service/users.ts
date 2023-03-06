import { compare } from "bcrypt";

import { Users } from "../entites";
import { UserDto } from "../dto/userDto";
import { TokenServices } from "./token";
import { MailServices } from "./mail";
import { ApiErrors } from "../utils/ApiErrors";

import * as uuid from "uuid";

const { HTTP_URL } = process.env;

export class UserService {
  async signin(email: string, password: string) {
    try {
      const tokenServices = new TokenServices();
      const mailServ = new MailServices();

      const candidat = await Users.findOneBy({ email });
      if (candidat) {
        throw ApiErrors.BadRequest("User with this email already register!");
      }

      const activationLink = uuid.v4();

      const newUser = Users.create({ email, password, activationLink });
      await newUser.save();

      // await mailServ.sendActivationMail(
      //   email,
      //   `${HTTP_URL}api/activate/${activationLink}`
      // );

      const payload = new UserDto(newUser);

      const { refreshToken } = await tokenServices.generationToken({
        ...payload,
      });
      const token = await tokenServices.saveToken(newUser, refreshToken);

      return {
        ...token,
        user: payload,
      };
    } catch (error) {
      throw ApiErrors.BadRequest(error.message);
    }
  }

  async signup(email: string, password: string) {
    try {
      const tokenServices = new TokenServices();

      const user = await Users.findOneBy({ email });

      if (!user) {
        throw ApiErrors.BadRequest("User not found!");
      }

      const comaprePassword = await compare(password, user.password);

      if (!comaprePassword) {
        throw ApiErrors.BadRequest("Wrong password!");
      }

      const payload = new UserDto(user);

      const { refreshToken } = await tokenServices.generationToken({
        ...payload,
      });
      const token = await tokenServices.saveToken(user, refreshToken);

      return {
        ...token,
        user: payload,
      };
    } catch (error) {
      throw ApiErrors.BadRequest(error.message);
    }
  }
  //
  //
  //
  async signout(refreshToken: string) {
    const tokenServices = new TokenServices();

    const token = await tokenServices.removeToken(refreshToken);
    return token;
  }
  //
  //
  //
  async getAll() {
    return await Users.find();
  }
  async isActive(activatedLink: string) {
    try {
      const user = await Users.findOneBy({ activationLink: activatedLink });
      if (!user) {
        throw ApiErrors.BadRequest("Uncorrect link activations");
      }
      user!.isActivated = true;
      user?.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
