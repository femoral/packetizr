using System;
using System.IO;
using System.Text;

public class CustomTypeDtoPacketDeserializer : IPacketDeserializer<CustomTypeDto> {

    public CustomTypeDto Deserialize(BinaryReader reader) {
        var model = new CustomTypeDto();

        model.VarcharField = Encoding.ASCII.GetString(reader.ReadBytes(reader.ReadByte()));
        model.CharField = Encoding.ASCII.GetString(reader.ReadBytes(10));

        return model;
    }
}