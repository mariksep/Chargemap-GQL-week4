import Station from "../Models/modelStation.js";
import connection from "../Models/connectionModel.js";
import { UserInputError } from "apollo-server-errors";
import { rectangelBounds } from "../rectangleBound.js";

export default {
  Query: {
    station: (parent, args) => {
      return Station.findById(args.id);
    },
    stations: async (parent, args) => {
      try {
        let res;
        const { start, limit, bounds } = args;
        console.log(args);
        if (bounds) {
          const limitedArea = rectangelBounds(
            bounds._southWest,
            bounds._northEast
          );
          res = await Station.find({}).limit(limit);
          skip(start).where("Location").within(limitedArea);
        } else {
          res = await Station.find({}).skip(start).limit(limit);
        }
        console.log(res);
        return res;
      } catch (error) {
        throw new UserInputError(
          `Error while getting the stations: ${error.message}`
        );
      }
    },
  },
  Mutation: {
    addStation: async (parents, args) => {
      try {
        const { Connections, ...data } = args;

        const addConnections = await Promise.all(
          Connections.map(async (conn) => {
            try {
              const newConnection = new connection(conn);
              await newConnection.save();
              return newConnection._id;
            } catch (error) {
              throw new UserInputError(
                `Error while creating the connections: ${error.message}`
              );
            }
          })
        );

        const newStation = new Station({
          ...data,
          Connections: addConnections,
        });
        console.log(data);
        newStation.save();
        return data;
      } catch (error) {
        throw new UserInputError(
          `Error while adding a new station: ${error.message}`
        );
      }
    },
    modifyStation: async (parents, args) => {
      try {
        const { id, Connections, ...data } = args;
        console.log(args);
        const stationUpdateData = await Station.findByIdAndUpdate(
          id,
          { ...data },
          {
            new: true,
            upsert: true,
          }
        );
        if (Connections) {
          await Promise.all(
            Connections.map(async (newConnections) => {
              try {
                const { id, ...data } = newConnections;
                await connection.findByIdAndUpdate(
                  id,
                  { ...data },
                  {
                    new: true,
                    upsert: true,
                  }
                );
              } catch (error) {
                throw new UserInputError(
                  `Error while adding a new station: ${error.message}`
                );
              }
            })
          );
        }
        return stationUpdateData.save();
      } catch (error) {
        throw new UserInputError(
          `Error while adding a new station: ${error.message}`
        );
      }
    },
    deleteStation: async (_, args) => {
      try {
        const { id } = args;

        await Station.findByIdAndDelete(id);

        return id;
      } catch (error) {
        throw new UserInputError(
          `Error while deleting a station: ${error.message}`
        );
      }
    },
  },
};
