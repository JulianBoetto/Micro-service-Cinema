import dbApi from "../config/db.js";
import dbCinema from "../../../cinema-catalog-services/src/config/db.js";
import dbMovie from "../../../movies-service/src/config/db.js";
import usersSeed from "../../seeds/users.js";
import ttlBlocklist from "../../seeds/ttlBlocklist.js";
import cinemaSeed from "../../seeds/cinemaCatalog.js";
import movieSeed from "../../seeds/movies.js";

const runSeeds = async () => {
  try {
    const databaseApi = await dbApi.connect();
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
  } catch (error) {
    console.error(error);
  } finally {
    await dbApi.disconnect();
  }

  try {
    console.log("Trying insert cinema seeds...");
    const databaseCinema = await dbCinema.connect();

    const cinemaMetadata = await databaseCinema
      .collection("metadata")
      .findOne({ name: "cinemaSeeds" });

    if (!cinemaMetadata || !cinemaMetadata.seeded) {
      await databaseCinema
        .collection("cinema-catalog")
        .insertMany(cinemaSeed);
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
    await dbCinema.disconnect();
  }

  try {
    console.log("Trying insert movie seeds...");
    const databaseMovie = await dbMovie.connect();

    const movieMetadata = await databaseMovie
      .collection("metadata")
      .findOne({ name: "movieSeeds" });

    if (!movieMetadata || !movieMetadata.seeded) {
      await databaseMovie
        .collection("movies")
        .insertMany(movieSeed);
      console.log("Movie seeds successfully inserted!");
      await databaseMovie
        .collection("metadata")
        .updateOne(
          { name: "movieSeeds" },
          { $set: { seeded: true } },
          { upsert: true }
        );
    } else {
      console.log("Movie seeds already executed, skipping...");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await dbMovie.disconnect();
  }
};

runSeeds();
