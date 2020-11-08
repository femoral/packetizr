import { YamlContractReader } from "../../reader/YamlContractReader";
import { GetContractUseCase } from "../../contract/GetContractUseCase";
import { FileSystemSourceCodeWriter } from "../../writer/FileSystemSourceCodeWriter";
import { GenerateContractCodeUseCase } from "../../contract/GenerateContractCodeUseCase";
import { CodeGenerator } from "../..";
import { FatalError } from "../../common/FatalError";

export function buildGetContractUseCase(contractFilePath: string) {
  const contractReader = new YamlContractReader(contractFilePath);
  return new GetContractUseCase(contractReader);
}

export async function buildGenerateContractCodeUseCase(
  outputDirectory: string,
  language: string,
  args: any
) {
  const fileWriter = new FileSystemSourceCodeWriter(outputDirectory);
  let codeGenerator: CodeGenerator;
  try {
    const generatorFactoryModule = await import(`packetizr-gen-${language}`);
    codeGenerator = generatorFactoryModule.generator(args);
  } catch (e) {
    throw new FatalError({
      message: `failed to load module "packetizr-gen-${language}"`,
      hint: `try installing missing generator with "npm i -g packetizr-gen-${language}"`,
    });
  }

  return new GenerateContractCodeUseCase(codeGenerator, fileWriter);
}
