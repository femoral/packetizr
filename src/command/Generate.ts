import { GenerateArgs } from "./model/GenerateArgs";
import {
  buildGenerateContractCodeUseCaseFactory,
  buildGetContractUseCase,
} from "./factory";

export const execute = async ({ file, out }: GenerateArgs) => {
  let getContractUseCase = buildGetContractUseCase(file);
  let generateContractCodeUseCase = buildGenerateContractCodeUseCaseFactory(
    out
  );

  const contract = await getContractUseCase.execute();
  await generateContractCodeUseCase.execute(contract);
};