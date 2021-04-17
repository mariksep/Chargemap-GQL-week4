import { AuthenticationError, UserInputError } from "apollo-server-errors";
import { login } from "../passport/autheticate.js";
import bcrypt from "bcrypt";
import User from "../Models/userModel.js";

export default {
  Query: {
    login: async (_, args, context) => {
      const { req, res } = context;
      req.body = args;

      try {
        const authResponse = await login(req, res);

        return {
          id: authResponse.user._id,
          username: authResponse.user.username,
          token: authResponse.token,
        };
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
  },
  Mutation: {
    register: async (parent, args) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userWithHash = {
          ...args,
          password: hashedPassword,
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        return result;
      } catch (error) {
        throw new UserInputError(
          `Error while creating an account: ${error.message}`
        );
      }
    },
  },
};
