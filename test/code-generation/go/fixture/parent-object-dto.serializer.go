package packets

import (
    "bytes"
)

type ParentObjectDtoSerializer struct {
    childObjectDtoSerializer *ChildObjectDtoSerializer
}

func NewParentObjectDtoSerializer() *ParentObjectDtoSerializer {
    return &ParentObjectDtoSerializer{
        NewChildObjectDtoSerializer(),
    }
}

func (r *ParentObjectDtoSerializer) Serialize(parentObjectDto *ParentObjectDto, buffer *bytes.Buffer) {
    r.childObjectDtoSerializer.Serialize(parentObjectDto.ChildField, buffer)
}
