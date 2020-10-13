import { YamlContractReader } from "../../reader/YamlContractReader";
import { GetContractUseCase } from "../../contract/GetContractUseCase";
import { FileSystemSourceCodeWriter } from "../../writer/FileSystemSourceCodeWriter";
import { generator } from "../../code-generation/csharp";
import { GenerateContractCodeUseCase } from "../../contract/GenerateContractCodeUseCase";

export function buildGetContractUseCase(contractFilePath: string) {
  const contractReader = new YamlContractReader(contractFilePath);
  return new GetContractUseCase(contractReader);
}

export function buildGenerateContractCodeUseCaseFactory(
  outputDirectory: string
) {
  const fileWriter = new FileSystemSourceCodeWriter(outputDirectory);
  const codeGenerator = generator();
  return new GenerateContractCodeUseCase(codeGenerator, fileWriter);
} 