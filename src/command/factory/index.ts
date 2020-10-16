import { YamlContractReader } from "../../reader/YamlContractReader";
import { GetContractUseCase } from "../../contract/GetContractUseCase";
import { FileSystemSourceCodeWriter } from "../../writer/FileSystemSourceCodeWriter";
import { GenerateContractCodeUseCase } from "../../contract/GenerateContractCodeUseCase";

export function buildGetContractUseCase(contractFilePath: string) {
  const contractReader = new YamlContractReader(contractFilePath);
  return new GetContractUseCase(contractReader);
}

export async function buildGenerateContractCodeUseCaseFactory(
  outputDirectory: string,
  language: string
) {
  const fileWriter = new FileSystemSourceCodeWriter(outputDirectory);
  const codeGenerator = (
    await import(`../../code-generation/${language}`)
  ).generator();
  return new GenerateContractCodeUseCase(codeGenerator, fileWriter);
}
