import Connections from "../Models/connectionModel.js";

export default {
  Station: {
    Connections: (parent) =>
      parent.Connections.map((id) => Connections.findById(id)),
  },
};
