import { TypeSchema } from "../../../src/contract/model/TypeSchema";
import { FieldFixture } from "./Field.fixture";

export class TypeSchemaFixture {
  static buildStringsObjectSchema() {
    return new TypeSchema(
      "StringsObject",
      FieldFixture.buildListOfStringFields()
    );
  }

  static buildNumbersObjectSchema() {
    return new TypeSchema(
      "NumbersObject",
      FieldFixture.buildListOfNumberFields()
    );
  }

  static buildParentObjectSchema() {
    return new TypeSchema(
      "ParentObject",
      FieldFixture.buildListWithChildObject()
    );
  }

  static buildChildObjectSchema() {
    return new TypeSchema(
      "ChildObject",
      FieldFixture.buildListOfStringFields()
    );
  }
}
