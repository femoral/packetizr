package packets

import (
    "bytes"
)

type ParentObjectDtoDeserializer struct {
    childObjectDtoDeserializer *ChildObjectDtoDeserializer
}

func NewParentObjectDtoDeserializer() *ParentObjectDtoDeserializer {
    return &ParentObjectDtoDeserializer{
        NewChildObjectDtoDeserializer(),
    }
}

func (r *ParentObjectDtoDeserializer) Deserialize(buffer *bytes.Buffer) *ParentObjectDto {
    model := &ParentObjectDto{}

    model.ChildField = r.childObjectDtoDeserializer.Deserialize(buffer)

    return model
}
