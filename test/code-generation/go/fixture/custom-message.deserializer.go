package packets

import (
    "bytes"
)

type CustomMessageDeserializer struct {
    parentObjectDtoDeserializer *ParentObjectDtoDeserializer
}

func NewCustomMessageDeserializer() *CustomMessageDeserializer {
    return &CustomMessageDeserializer{
        NewParentObjectDtoDeserializer(),
    }
}

func (r *CustomMessageDeserializer) Deserialize(buffer *bytes.Buffer) *CustomMessage {
    model := &CustomMessage{}

    model.ParentField = r.parentObjectDtoDeserializer.Deserialize(buffer)

    return model
}
