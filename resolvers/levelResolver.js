import levelTypeModel from "../Models/levelTypeModel.js";

export default {
  Query: {
    LevelType: () => levelTypeModel.find({}),
  },
  Connections: {
    LevelID: (parent) => levelTypeModel.findById(parent.LevelID),
  },
};
