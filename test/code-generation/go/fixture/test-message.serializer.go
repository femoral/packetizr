package packets

import (
    "bytes"
    "encoding/binary"
)

type TestMessageSerializer struct {
    customTypeDtoSerializer *CustomTypeDtoSerializer
    stringsObjectDtoSerializer *StringsObjectDtoSerializer
}

func NewTestMessageSerializer() *TestMessageSerializer {
    return &TestMessageSerializer{
        NewCustomTypeDtoSerializer(),
        NewStringsObjectDtoSerializer(),
    }
}

func (r *TestMessageSerializer) Serialize(testMessage *TestMessage, buffer *bytes.Buffer) {
    _ = binary.Write(buffer, binary.LittleEndian, TestMessageHeader)
    _ = binary.Write(buffer, binary.LittleEndian, testMessage.Int32Field)
    _ = binary.Write(buffer, binary.LittleEndian, testMessage.Float32Field)
    _ = binary.Write(buffer, binary.LittleEndian, testMessage.Int16Field)
    _ = binary.Write(buffer, binary.LittleEndian, testMessage.Int8Field)
    varcharFieldBytes := []byte(testMessage.VarcharField)
    _ = binary.Write(buffer, binary.LittleEndian, uint8(len(varcharFieldBytes)))
    buffer.Write(varcharFieldBytes)
    buffer.WriteString(testMessage.CharField)
    _ = binary.Write(buffer, binary.LittleEndian, testMessage.Uint32Field)
    _ = binary.Write(buffer, binary.LittleEndian, testMessage.Uint16Field)
    _ = binary.Write(buffer, binary.LittleEndian, testMessage.Uint8Field)
    r.customTypeDtoSerializer.Serialize(testMessage.CustomTypeField, buffer)
    _ = binary.Write(buffer, binary.LittleEndian, uint8(len(testMessage.ArrayField)))
    for _, element := range testMessage.ArrayField {
        r.stringsObjectDtoSerializer.Serialize(element, buffer)
    }
    _ = binary.Write(buffer, binary.LittleEndian, uint8(len(testMessage.PrimitiveNumericArrayField)))
    for _, element := range testMessage.PrimitiveNumericArrayField {
        _ = binary.Write(buffer, binary.LittleEndian, element)
    }
    _ = binary.Write(buffer, binary.LittleEndian, uint8(len(testMessage.PrimitiveCharArrayField)))
    for _, element := range testMessage.PrimitiveCharArrayField {
        buffer.WriteString(element)
    }
    _ = binary.Write(buffer, binary.LittleEndian, uint8(len(testMessage.PrimitiveVarcharArrayField)))
    for _, element := range testMessage.PrimitiveVarcharArrayField {
        elementBytes := []byte(element)
        _ = binary.Write(buffer, binary.LittleEndian, uint8(len(elementBytes)))
        buffer.Write(elementBytes)
    }
    _ = binary.Write(buffer, binary.LittleEndian, uint8(len(testMessage.PrimitiveSingleByteArrayField)))
    for _, element := range testMessage.PrimitiveSingleByteArrayField {
        _ = binary.Write(buffer, binary.LittleEndian, element)
    }
}
