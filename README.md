

# packetizr [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=femoral_packetizr&metric=coverage)](https://sonarcloud.io/dashboard?id=femoral_packetizr)

## Intro

packetizr is a **non production ready** code generation tool for binary serialization based on contracts. 
Right now it's just being used on a hobby game server project. Any suggestions or advice would be greatly appreciated.

### Installation

```shell script
npm i -g packetizr
```

### Usage

```shell script
packetizr gen -l {language} -o {output directory} [contract file]
```

**Examples**
```shell script
packetizr gen -l go contract.yml # generates go source files for "contract.yml"
```

```shell script
packetizr gen --help # display help
```

## Contract Structure

### Packets 

Should be an array of packet definitions and each definition should have:
- `header` (_unsigned numeric value_) packet identifier, must be unique
- `name` (_string_) packet name, must be unique 
- `fields` (_object_) packet model

```yml
packets:
  - header: 1
    name: PositionMessage
    fields:
      x:
        type: float32
      y:
        type: float32
  - header: 2
    name: ChatMessage
    fields:
      userId:
        type: char
        length: 36
      message:
        type: varchar
...
```

### Fields
- `type` (_string_) corresponding to any of the supported types **required** 
- `length` (_unsigned numeric value_) used to specify the length of a char type field, required when type is char
- `schema` (_string_) name of a schema defined in `components.schemas`, required when type is object
- `items` (_object_) describe the type of each element, should be present when type is array.

```yaml
...
    fields:
      age:
        type: uint8
      name:
        type: char
        length: 10
      address:
        type: object
        schema: Address
      phoneNumbers:
        type: array
        items:
          type: char
          length: 10
...
```
### Supported Types

| name | size(bytes) | type |
|---|---|---|
| int32  | 4  | basic |
| int16  | 2  | basic |
| int8  | 1 | basic |
| uint32  | 4  | basic |
| uint16  |  2 | basic |
| uint8  | 1  | basic |
| float32  |  4 | basic |
| char  |  {defined fixed length} | basic |
| varchar  |  1+n | basic |
| object  |  sum({each attributes size}) | complex |
| array  |  1 + (n * {each item size}) | complex |

### Complex Types - object

Objects should have an `schema` which describes its attribute types
```yaml
packets:
  - header: 1
    name: LoginMessage
    fields:
      timestamp:
        type: uint32
      information:
        type: object
        schema: LoginInformation
components:
  schemas:
    LoginInformation
      username: 
        type: varchar
      password:
        type: varchar
```

### Complex Types - array

Array items can be described using the following properties:

- `type` (_string_) any supported types, except for `array` **required** 
- `length` (_unsigned numeric value_) used to specify the length of a char type field, required when type is char
- `schema` (_string_) name of a schema defined in `components.schemas`, required when type is object

```yaml
    fields:
      arrayOfIntegers:
        type: array
        items:
          type: int32
      arrayOfObjects:
        type: array
        items: 
          type: object
          schema: LoginInformation
```

### Schemas

Schemas describe specific object structure using the same properties that fields

```yaml
...

components:
  schemas:
    LoginInformation
      username: 
        type: varchar
      password:
        type: varchar
    Position:
      x:
        type: float32
      y:
        type: float32
```

### Example

```yaml
packets:
  - header: 1
    name: NumbersMessage
    fields:
      int32Field:
        type: int32
      float32Field:
        type: float32
      int16Field:
        type: int16
      int8Field:
        type: int8
      uint32Field:
        type: uint32
      uint16Field:
        type: uint16
      uint8Field:
        type: uint8
  - header: 2
    name: StringsMessage
    fields:
      varcharField:
        type: varchar
      charField:
        type: char
        length: 4
  - header: 3
    name: CustomMessage
    fields:
      parentField:
        type: object
        schema: ParentObject
  - header: 4
    name: ArraysMessage
    fields:
      customArray:
        type: array
        items:
          type: object
          schema: ParentObject
      numericArray:
        type: array
        items:
          type: int32
      charArray:
        type: array
        items:
          type: char
          length: 6
      varcharArray:
        type: array
        items:
          type: varchar
      singleByteArray:
        type: array
        items:
          type: int8
components:
  schemas:
    ParentObject:
      childField:
        type: object
        schema: ChildObject
    ChildObject:
      varcharField:
        type: varchar
      charField:
        type: char
        length: 10
```