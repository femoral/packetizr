import errorHandler from "../../src/common/ErrorHandler";
import { FatalError } from "../../src/common/FatalError";
import logger from "../../src/common/Logger";

afterEach(() => {
  process.exitCode = 0;
});

describe("wrapped method is sync", () => {
  describe("wrapped method does not throw any error", () => {
    it("should keep 0 process exitCode", async () => {
      errorHandler(() => {
        console.log("test action");
      });

      await flushPromises();

      expect(process.exitCode).toBeUndefined();
    });
  });

  describe("wrapped method throws Fatal Error", () => {
    it("should change exit code to 1, given exitCode is not specified on error", () => {
      errorHandler(() => {
        throw new FatalError({ message: "error without exit code" });
      });

      expect(process.exitCode).toEqual(1);
    });

    it("should change exit code to specified exitCode, given exitCode is provided", () => {
      errorHandler(() => {
        throw new FatalError({
          message: "error with exit code",
          errorCode: 3,
        });
      });

      expect(process.exitCode).toEqual(3);
    });

    it("should log error message", () => {
      jest.spyOn(logger, "error");

      errorHandler(() => {
        throw new FatalError({
          message: "some error",
        });
      });

      expect(logger.error).toHaveBeenCalledWith("some error");
    });

    it("should log hint message", () => {
      jest.spyOn(logger, "info");

      errorHandler(() => {
        throw new FatalError({
          message: "some error",
          hint: "some hint",
        });
      });

      expect(logger.info).toHaveBeenCalledWith("some hint");
    });
  });
});

describe("wrapped method is async", () => {
  describe("wrapped method does not throw any error", () => {
    it("should keep 0 process exitCode", async () => {
      errorHandler(async () => {
        console.log("test action");
      });

      await flushPromises();

      expect(process.exitCode).toEqual(0);
    });
  });

  describe("wrapped method throws Fatal Error", () => {
    it("should change exit code to 1, given exitCode is not specified on error", async () => {
      errorHandler(async () => {
        throw new FatalError({ message: "error without exit code" });
      });

      await flushPromises();

      expect(process.exitCode).toEqual(1);
    });

    it("should change exit code to specified exitCode, given exitCode is provided", async () => {
      errorHandler(async () => {
        throw new FatalError({
          message: "error with exit code",
          errorCode: 3,
        });
      });

      await flushPromises();

      expect(process.exitCode).toEqual(3);
    });

    it("should log error message", async () => {
      jest.spyOn(logger, "error");

      errorHandler(async () => {
        throw new FatalError({
          message: "some error",
        });
      });

      await flushPromises();

      expect(logger.error).toHaveBeenCalledWith("some error");
    });

    it("should log hint message", async () => {
      jest.spyOn(logger, "info");

      errorHandler(async () => {
        throw new FatalError({
          message: "some error",
          hint: "some hint",
        });
      });

      await flushPromises();

      expect(logger.info).toHaveBeenCalledWith("some hint");
    });
  });
});

function flushPromises() {
  return new Promise((resolve) => {
    setImmediate(() => resolve());
  });
}
