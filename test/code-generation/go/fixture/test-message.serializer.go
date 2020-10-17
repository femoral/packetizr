package packets

import (
    "bytes"
    "encoding/binary"
)

type TestMessageSerializer struct {
}

func NewTestMessageSerializer() *TestMessageSerializer {
    return &TestMessageSerializer{}
}

func (r *TestMessageSerializer) Serialize(message *TestMessage) []byte {
    var buffer bytes.Buffer

    _ = binary.Write(&buffer, binary.LittleEndian, TestMessageHeader)
    _ = binary.Write(&buffer, binary.LittleEndian, message.Int32Field)
    _ = binary.Write(&buffer, binary.LittleEndian, message.Float32Field)
    _ = binary.Write(&buffer, binary.LittleEndian, message.Int16Field)
    _ = binary.Write(&buffer, binary.LittleEndian, message.Int8Field)
    varcharFieldBytes := []byte(message.VarcharField)
    _ = binary.Write(&buffer, binary.LittleEndian, uint8(len(varcharFieldBytes)))
    buffer.Write(varcharFieldBytes)
    buffer.WriteString(message.CharField)
    _ = binary.Write(&buffer, binary.LittleEndian, message.Uint32Field)
    _ = binary.Write(&buffer, binary.LittleEndian, message.Uint16Field)
    _ = binary.Write(&buffer, binary.LittleEndian, message.Uint8Field)

    return buffer.Bytes()
}
