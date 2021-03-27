const router = require("express").Router();
const station = require("./Models/modelStation");
const connectionType = require("./Models/modelConnectionType");
const connection = require("./Models/connectionModel");
const rectangleBounds = require("./rectangleBound");
require("./Models/levelTypeModel");
require("./Models/currentTypeModel");

/*GET ONE  STATIONS DATA*/
router.get("/:id", async (req, res) => {
  try {
    const data = await station.findById(req.params.id).populate({
      path: "Connections",
      populate: [
        {
          path: "ConnectionTypeID",
        },
        {
          path: "LevelID",
        },
        {
          path: "CurrentTypeID",
        },
      ],
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    s;
  }
});
/*GET 5 STATIONS DATA*/
router.get("/", async (req, res) => {
  let data;
  const { topRight, bottomLeft, limit } = req.query;
  console.log(req.query);

  console.log(req.query);
  if (topRight && bottomLeft) {
    const certainArea = rectangleBounds.rectangleBounds(
      JSON.parse(topRight),
      JSON.parse(bottomLeft)
    );
    try {
      data = await station
        .find()
        .limit(limit ? Number(limit) : 5)
        .within(certainArea)
        .populate({
          path: "Connections",
          populate: [
            {
              path: "ConnectionTypeID",
            },
            {
              path: "LevelID",
            },
            {
              path: "CurrentTypeID",
            },
          ],
        });
      res.json(data);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      data = await station
        .find()
        .limit(limit ? Number(limit) : 5)
        .populate({
          path: "Connections",
          populate: [
            {
              path: "ConnectionTypeID",
            },
            {
              path: "LevelID",
            },
            {
              path: "CurrentTypeID",
            },
          ],
        });
      res.json(data);
    } catch (error) {
      console.error(error);
    }
  }
});
/*POST STATIONS CONNECTIONS*/
router.post("/", async (req, res) => {
  console.log(req.body.Connections);
  const data = await req.body.Connections;
  try {
    const responseConnection = await data.map(async (newConnections) => {
      const newConnection = new connection(newConnections);
      await newConnection.save();
      return newConnection._id;
    });

    const stationsNew = new station({
      ...req.body.Station,
      Connections: resCon,
    });
    await stationsNew.save();
  } catch (error) {
    console.error(error);
  }
});
/*PUT STATIONS*/
router.put("/", async (req, res) => {
  try {
    const { Station, Connections } = await req.body;
    console.log(Station);
    const updateSation = await station.findByIdAndUpdate(Station._id, Station, {
      new: true,
    });
    const updatedConnections = await Promise.all(
      Connections.map(async (newConnection) => {
        try {
          const responseConnection = await connection.findByIdAndUpdate(
            newConnection._Id,
            newConnection
          );
          return responseConnection._Id;
        } catch (error) {
          console.log(error.message);
        }
      })
    );
    updateSation.Connections = updatedConnections;
    await updateSation.save();
    const populate = await document.populate("Connections").execPopulate();
    res.send(updateSation);
  } catch (error) {
    console.error(error);
  }
});

/*DELETE*/
router.delete("/:id", async (req, res) => {
  try {
    await station.findByIdAndDelete(req.params.id);
    res.send({ message: `Station ${id} is deleted!` });
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
