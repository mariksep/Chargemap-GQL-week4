const router = require("express").Router();
const station = require("./Models/modelStation");
const connectionType = require("./Models/modelConnectionType");
const connection = require("./Models/connectionModel");
const rectangleBound = require("./rectangleBound");
require("./Models/levelTypeModel");
require("./Models/currentTypeModel");

/*GET ONE  STATIONS DATA*/
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const onestationId = await req.params.id;
  try {
    const data = await station.findById(onestationId).populate({
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
});
/*GET 5 STATIONS DATA*/
router.get("/", async (req, res) => {
  let data;
  const { limit, topRight, bottomLeft } = req.query;
  if (topRight && bottomLeft) {
    const certainArea = await rectangleBound.rectangleBounds(
      JSON.parse(topRight),
      JSON.parse(bottomLeft)
    );
    try {
      data = await station
        .find()
        .limit(limit ? Number(limit) : 5)
        .where("Location")
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
  const data = await req.body.Connections;
  try {
    const responseConnection = await Promise.all(
      data.map(async (newConnections) => {
        const newConnection = new connection(newConnections);
        const resforCon = await connection.create(newConnection);
        await resforCon.save();
        return resforCon;
      })
    );
    const stationsNew = await new station({
      ...req.body.Station,
      Connections: responseConnection,
    });

    await station.create(stationsNew);
    await stationsNew.save();

    res.send(
      `NEW station Added  ${stationsNew} created with id: ${stationsNew._id}`
    );
  } catch (error) {
    console.error(error);
  }
});
/*PUT STATIONS*/
router.put("/", async (req, res) => {
  try {
    const { Station, Connections } = await req.body;

    const stationUpdateData = await station.findByIdAndUpdate(
      Station._id,
      Station,
      {
        new: true,
        upsert: true,
      }
    );
    const updatedConnections = await Promise.all(
      Connections.map(async (newConnections) => {
        console.log("new", newConnections);
        try {
          const data = await connection.findByIdAndUpdate(
            newConnections._id,
            newConnections,
            {
              new: true,
              upsert: true,
            }
          );
          console.log("data", data);
          return data;
        } catch (error) {
          console.log(error.message);
        }
      })
    );
    stationUpdateData.Connections = updatedConnections;

    await stationUpdateData.save();

    const populate = await stationUpdateData
      .populate("Connections")
      .execPopulate();
    const dataforres = { Station, Connections };
    console.log(dataforres);
    res.status(200).json(dataforres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*DELETE*/
router.delete("/:id", async (req, res) => {
  const deleteID = await req.params.id;
  await station.findByIdAndDelete(deleteID, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
    }
  });
  res.send(`Station ${id} is deleted!`);
});

module.exports = router;
