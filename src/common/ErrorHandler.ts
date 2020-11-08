import logger from "./Logger";
import { FatalError } from "./FatalError";

const errorHandler = (action: Function) => {
  try {
    action()?.catch(handle);
  } catch (error) {
    handle(error);
  }
};

function handle(error: any) {
  logger.error(error.message);

  if (error.hint) logger.info(error.hint);

  process.exitCode = error.errorCode || 1;
}

export default errorHandler;
