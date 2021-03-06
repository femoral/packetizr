#!/usr/bin/env node
import * as yargs from "yargs";
import { Arguments } from "yargs";
import * as generate from "./command/Generate";
import { GenerateArgs } from "./command/model/GenerateArgs";
import { CodeGenerator } from "./code-generation/CodeGenerator";
import { SourceFile } from "./code-generation/SourceFile";
import {
  Contract,
  Field,
  FieldTypes,
  Packet,
  TypeSchema,
} from "./contract/model";
import errorHandler from "./common/ErrorHandler";

export {
  SourceFile,
  CodeGenerator,
  Contract,
  Field,
  FieldTypes,
  Packet,
  TypeSchema,
};

yargs
  .command(
    "gen [file]",
    "generate source code from contract file",
    (yargs) => {
      yargs.positional("file", {
        describe: "contract file path",
        default: "./packetizr.yml",
      });
    },
    async (argv: Arguments<GenerateArgs>) => {
      errorHandler(async () => await generate.execute(argv));
    }
  )
  .option("language", {
    alias: "l",
    type: "string",
    description: "Language of the source code to be generated",
    default: "csharp",
  })
  .option("out", {
    alias: "o",
    type: "string",
    description:
      "Output directory (where the generated source code will be written)",
    default: "./out",
  })
  .option("args", {
    description: "arguments handled to the generator",
    default: {},
  }).argv;
