package packets

import (
    "bytes"
    "encoding/binary"
)

type TestMessageDeserializer struct {
}

func NewTestMessageDeserializer() *TestMessageDeserializer {
    return &TestMessageDeserializer{}
}

func (r *TestMessageDeserializer) Deserialize(messageBytes []byte) *TestMessage {
    buffer := bytes.NewBuffer(messageBytes)
    message := &TestMessage{}

    _ = binary.Read(buffer, binary.LittleEndian, &message.Int32Field)
    _ = binary.Read(buffer, binary.LittleEndian, &message.Float32Field)
    _ = binary.Read(buffer, binary.LittleEndian, &message.Int16Field)
    _ = binary.Read(buffer, binary.LittleEndian, &message.Int8Field)
    var varcharFieldLength uint8
    _ = binary.Read(buffer, binary.LittleEndian, &varcharFieldLength)
    varcharFieldBytes := make([]byte, varcharFieldLength)
    _ = binary.Read(buffer, binary.BigEndian, &varcharFieldBytes)
    message.VarcharField = string(varcharFieldBytes)
    charFieldBytes := make([]byte, 10)
    _ = binary.Read(buffer, binary.BigEndian, &charFieldBytes)
    message.CharField = string(charFieldBytes)
    _ = binary.Read(buffer, binary.LittleEndian, &message.Uint32Field)
    _ = binary.Read(buffer, binary.LittleEndian, &message.Uint16Field)
    _ = binary.Read(buffer, binary.LittleEndian, &message.Uint8Field)

    return message
}
