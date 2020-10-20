package packets

import (
    "bytes"
    "encoding/binary"
)

type TestMessageSerializer struct {
    customTypeDtoSerializer *CustomTypeDtoSerializer
}

func NewTestMessageSerializer() *TestMessageSerializer {
    return &TestMessageSerializer{
        NewCustomTypeDtoSerializer(),
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
}
