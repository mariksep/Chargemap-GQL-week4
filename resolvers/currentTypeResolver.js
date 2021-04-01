import currentTypeModel from "../Models/currentTypeModel.js";

export default {
  Query: {
    CurrentType: () => currentTypeModel.find({}),
  },
  Connections: {
    CurrentTypeID: (parent) => {
      currentTypeModel.findById(parent.CurrentTypeID);
    },
  },
};
