package packets

const TestMessageHeader = uint16(1)

type TestMessage struct {
    Int32Field int32
    Float32Field float32
    Int16Field int16
    Int8Field int8
    VarcharField string
    CharField string
    Uint32Field uint32
    Uint16Field uint16
    Uint8Field uint8
    CustomTypeField *CustomTypeDto
    ArrayField []*StringsObjectDto
    PrimitiveNumericArrayField []int32
    PrimitiveCharArrayField []string
    PrimitiveVarcharArrayField []string
    PrimitiveSingleByteArrayField []int8
}