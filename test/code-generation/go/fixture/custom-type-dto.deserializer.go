package packets

import (
    "bytes"
    "encoding/binary"
)

type CustomTypeDtoDeserializer struct {
}

func NewCustomTypeDtoDeserializer() *CustomTypeDtoDeserializer {
    return &CustomTypeDtoDeserializer{
    }
}

func (r *CustomTypeDtoDeserializer) Deserialize(buffer *bytes.Buffer) *CustomTypeDto {
    model := &CustomTypeDto{}

    var varcharFieldLength uint8
    _ = binary.Read(buffer, binary.LittleEndian, &varcharFieldLength)
    varcharFieldBytes := make([]byte, varcharFieldLength)
    _ = binary.Read(buffer, binary.BigEndian, &varcharFieldBytes)
    model.VarcharField = string(varcharFieldBytes)
    charFieldBytes := make([]byte, 10)
    _ = binary.Read(buffer, binary.BigEndian, &charFieldBytes)
    model.CharField = string(charFieldBytes)

    return model
}
