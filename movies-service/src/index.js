import dotenv from "dotenv-safe";
dotenv.config();
import movies from "./api/movies.js";
import server from "./server/server.js";
import repository from "./repository/repository.js";
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await server.start(movies, repository);
        console.log('Server is up and running at ' + PORT);
    } catch (error) {
        console.error(error);
    }
})();