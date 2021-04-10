"use strict";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../Models/userModel.js";
import passportJWT from "passport-jwt";
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      console.log("Local strategy", user);
      if (user === null) {
        return done(null, false, { message: "Incorrect credentials." });
      }
      const validate = await bcrypt.compare(password, user.password);
      if (!validate) {
        return done(null, false, { message: "Incorrect credentials." });
      }
      const strippedUser = user.toObject();
      delete strippedUser.password;
      console.log("deleted pwd", strippedUser);
      return done(null, strippedUser, { message: "Logged In Successfully" });
    } catch (err) {
      return done(err);
    }
  })
);

// TODO: JWT strategy for handling bearer token
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "MyAwesomeSuperSecret",
    },
    async (jwtPayload, done) => {
      console.log("payload", jwtPayload);
      try {
        const user = await User.findById({ username: jwtPayload.username });

        if (user !== null) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(null, false);
      }
    }
  )
);

export default passport;
