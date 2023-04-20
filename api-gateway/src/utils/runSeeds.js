import dbApi from "../config/db.js";
import dbCinema from "../../../cinema-catalog-services/src/config/db.js";
import usersSeed from "../../seeds/users.js";
import ttlBlocklist from "../../seeds/ttlBlocklist.js";

const runSeeds = async () => {
  try {
    const databaseApi = await dbApi.connect();
    const databaseCinema = await dbCinema.connect();

    console.log("Trying insert user seeds...");
    const apiSeed = await databaseApi
      .collection("metadata")
      .findOne({ name: "userSeeds" });

    
    if (!apiSeed || !apiSeed.seeded) {
      await databaseApi.collection("users").insertMany(usersSeed);
      await ttlBlocklist.createTtlIndex(databaseApi);
      console.log("User seeds successfully inserted!");
      await databaseApi
        .collection("metadata")
        .updateOne(
          { name: "userSeeds" },
          { $set: { seeded: true } },
          { upsert: true }
        );
    } else {
      console.log("User seeds already executed, skipping...");
    }

    console.log("Trying insert cinema seeds...");
    const cinemaSeed = await databaseCinema
      .collection("metadata")
      .findOne({ name: "cinemaSeeds" });

    if (!cinemaSeed || !cinemaSeed.seeded) {
      console.log("Cinema seeds successfully inserted!");
      await databaseCinema
        .collection("metadata")
        .updateOne(
          { name: "cinemaSeeds" },
          { $set: { seeded: true } },
          { upsert: true }
        );
    } else {
      console.log("Cinema seeds already executed, skipping...");
    }
  } catch (error) {
    console.error(error);
  } finally {
    dbApi.disconnect();
    dbCinema.disconnect();
  }
 
};

runSeeds();
