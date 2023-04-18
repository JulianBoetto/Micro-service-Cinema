import cinemaCatalog from "./api/cinema-catalog-service.js";
import server from "./server/server.js";
import repository from "./repository/repository.js";

(async () => {
    try {
        await server.start(cinemaCatalog, repository);
        console.log('Server is up and running at ' + process.env.PORT);
    } catch (error) {
        console.error(error);
    }
})();