import { GenerateArgs } from "./model/GenerateArgs";
import {
  buildGenerateContractCodeUseCase,
  buildGetContractUseCase,
} from "./factory";
import logger from "../common/Logger";

export const execute = async ({ file, out, language, args }: GenerateArgs) => {
  logger.info(`generating ${language} source files of: ${file}`);

  let getContractUseCase = buildGetContractUseCase(file);
  let generateContractCodeUseCase = await buildGenerateContractCodeUseCase(
    out,
    language,
    args
  );

  const contract = await getContractUseCase.execute();
  await generateContractCodeUseCase.execute(contract);
};
