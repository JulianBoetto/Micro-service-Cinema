import {
  createLogger,
  format as _format,
  transports as _transports,
} from "winston";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const logger = createLogger({
  format: _format.combine(_format.errors({ stack: true }), _format.json()),
  transports: [
    new _transports.File({
      filename: join(__dirname, "..", "logs", "error.log"),
      level: "error",
    }),
    new _transports.File({
      filename: join(__dirname, "..", "logs", "info.log"),
      level: "info",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new _transports.Console({ format: _format.simple() }));
}

export default logger;