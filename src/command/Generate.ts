import { GenerateArgs } from "./model/GenerateArgs";
import {
  buildGenerateContractCodeUseCaseFactory,
  buildGetContractUseCase,
} from "./factory";

export const execute = async ({ file, out, language }: GenerateArgs) => {
  let getContractUseCase = buildGetContractUseCase(file);
  let generateContractCodeUseCase = await buildGenerateContractCodeUseCaseFactory(
    out,
    language
  );

  const contract = await getContractUseCase.execute();
  await generateContractCodeUseCase.execute(contract);
};