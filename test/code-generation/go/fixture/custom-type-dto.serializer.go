package packets

import (
    "bytes"
    "encoding/binary"
)

type CustomTypeDtoSerializer struct {
}

func NewCustomTypeDtoSerializer() *CustomTypeDtoSerializer {
    return &CustomTypeDtoSerializer{
    }
}

func (r *CustomTypeDtoSerializer) Serialize(customTypeDto *CustomTypeDto, buffer *bytes.Buffer) {
    varcharFieldBytes := []byte(customTypeDto.VarcharField)
    _ = binary.Write(buffer, binary.LittleEndian, uint8(len(varcharFieldBytes)))
    buffer.Write(varcharFieldBytes)
    buffer.WriteString(customTypeDto.CharField)
}
