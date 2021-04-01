import { gql } from "apollo-server-express";
import stationSchema from "./stationSchema.js";
import connectionsSchema from "./connectionsSchema.js";
import currentTypeSchema from "./currentTypeSchema.js";
import connectionTypeSchema from "./connectionTypeSchema.js";
import levelTypeSchema from "./levelTypeSchema.js";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
export default [
  linkSchema,
  stationSchema,
  connectionsSchema,
  currentTypeSchema,
  connectionTypeSchema,
  levelTypeSchema,
];
