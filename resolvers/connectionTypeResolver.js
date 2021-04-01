import connectionTypeModel from "../Models/modelConnectionType.js";

export default {
  Query: {
    ConnectionType: () => connectionTypeModel.find(),
  },
  Connections: {
    ConnectionTypeID: (parent) => {
      connectionTypeModel.findById(parent.ConnectionTypeID);
    },
  },
};
