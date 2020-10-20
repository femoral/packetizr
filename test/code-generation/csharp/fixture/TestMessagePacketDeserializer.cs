using System;
using System.IO;
using System.Text;

public class TestMessagePacketDeserializer : IPacketDeserializer<TestMessage> {

    private readonly IPacketDeserializer<CustomTypeDto> _customTypeDtoDeserializer;

    public TestMessagePacketDeserializer() {
        _customTypeDtoDeserializer = new CustomTypeDtoPacketDeserializer();
    }

    public TestMessage Deserialize(BinaryReader reader) {
        var model = new TestMessage();

        model.Int32Field = BitConverter.ToInt32(reader.ReadBytes(4), 0);
        model.Float32Field = BitConverter.ToSingle(reader.ReadBytes(4), 0);
        model.Int16Field = BitConverter.ToInt16(reader.ReadBytes(2), 0);
        model.Int8Field = (sbyte) reader.ReadByte();
        model.VarcharField = Encoding.ASCII.GetString(reader.ReadBytes(reader.ReadByte()));
        model.CharField = Encoding.ASCII.GetString(reader.ReadBytes(10));
        model.Uint32Field = BitConverter.ToUInt32(reader.ReadBytes(4), 0);
        model.Uint16Field = BitConverter.ToUInt16(reader.ReadBytes(2), 0);
        model.Uint8Field = reader.ReadByte();
        model.CustomTypeField = _customTypeDtoDeserializer.Deserialize(reader);

        return model;
    }
}