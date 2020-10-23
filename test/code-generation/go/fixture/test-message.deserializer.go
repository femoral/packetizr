package packets

import (
    "bytes"
    "encoding/binary"
)

type TestMessageDeserializer struct {
    customTypeDtoDeserializer *CustomTypeDtoDeserializer
    stringsObjectDtoDeserializer *StringsObjectDtoDeserializer
}

func NewTestMessageDeserializer() *TestMessageDeserializer {
    return &TestMessageDeserializer{
        NewCustomTypeDtoDeserializer(),
        NewStringsObjectDtoDeserializer(),
    }
}

func (r *TestMessageDeserializer) Deserialize(buffer *bytes.Buffer) *TestMessage {
    model := &TestMessage{}

    _ = binary.Read(buffer, binary.LittleEndian, &model.Int32Field)
    _ = binary.Read(buffer, binary.LittleEndian, &model.Float32Field)
    _ = binary.Read(buffer, binary.LittleEndian, &model.Int16Field)
    _ = binary.Read(buffer, binary.LittleEndian, &model.Int8Field)
    var varcharFieldLength uint8
    _ = binary.Read(buffer, binary.LittleEndian, &varcharFieldLength)
    varcharFieldBytes := make([]byte, varcharFieldLength)
    _ = binary.Read(buffer, binary.BigEndian, &varcharFieldBytes)
    model.VarcharField = string(varcharFieldBytes)
    charFieldBytes := make([]byte, 10)
    _ = binary.Read(buffer, binary.BigEndian, &charFieldBytes)
    model.CharField = string(charFieldBytes)
    _ = binary.Read(buffer, binary.LittleEndian, &model.Uint32Field)
    _ = binary.Read(buffer, binary.LittleEndian, &model.Uint16Field)
    _ = binary.Read(buffer, binary.LittleEndian, &model.Uint8Field)
    model.CustomTypeField = r.customTypeDtoDeserializer.Deserialize(buffer)
    var arrayFieldLength uint8
    _ = binary.Read(buffer, binary.LittleEndian, &arrayFieldLength)
    model.ArrayField = make([]*StringsObjectDto, arrayFieldLength)
    for i := uint8(0); i < arrayFieldLength; i++ {
        model.ArrayField[i] = r.stringsObjectDtoDeserializer.Deserialize(buffer)
    }
    var primitiveNumericArrayFieldLength uint8
    _ = binary.Read(buffer, binary.LittleEndian, &primitiveNumericArrayFieldLength)
    model.PrimitiveNumericArrayField = make([]int32, primitiveNumericArrayFieldLength)
    for i := uint8(0); i < primitiveNumericArrayFieldLength; i++ {
        _ = binary.Read(buffer, binary.LittleEndian, &model.PrimitiveNumericArrayField[i])
    }
    var primitiveCharArrayFieldLength uint8
    _ = binary.Read(buffer, binary.LittleEndian, &primitiveCharArrayFieldLength)
    model.PrimitiveCharArrayField = make([]string, primitiveCharArrayFieldLength)
    for i := uint8(0); i < primitiveCharArrayFieldLength; i++ {
        elementBytes := make([]byte, 9)
        _ = binary.Read(buffer, binary.BigEndian, &elementBytes)
        model.PrimitiveCharArrayField[i] = string(elementBytes)
    }
    var primitiveVarcharArrayFieldLength uint8
    _ = binary.Read(buffer, binary.LittleEndian, &primitiveVarcharArrayFieldLength)
    model.PrimitiveVarcharArrayField = make([]string, primitiveVarcharArrayFieldLength)
    for i := uint8(0); i < primitiveVarcharArrayFieldLength; i++ {
        var elementLength uint8
        _ = binary.Read(buffer, binary.LittleEndian, &elementLength)
        elementBytes := make([]byte, elementLength)
        _ = binary.Read(buffer, binary.BigEndian, &elementBytes)
        model.PrimitiveVarcharArrayField[i] = string(elementBytes)
    }
    var primitiveSingleByteArrayFieldLength uint8
    _ = binary.Read(buffer, binary.LittleEndian, &primitiveSingleByteArrayFieldLength)
    model.PrimitiveSingleByteArrayField = make([]int8, primitiveSingleByteArrayFieldLength)
    for i := uint8(0); i < primitiveSingleByteArrayFieldLength; i++ {
        _ = binary.Read(buffer, binary.LittleEndian, &model.PrimitiveSingleByteArrayField[i])
    }

    return model
}
