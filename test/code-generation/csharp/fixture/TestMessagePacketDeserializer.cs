using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

public class TestMessagePacketDeserializer : IPacketDeserializer<TestMessage> {

    private readonly IPacketDeserializer<CustomTypeDto> _customTypeDtoDeserializer;
    private readonly IPacketDeserializer<StringsObjectDto> _stringsObjectDtoDeserializer;

    public TestMessagePacketDeserializer() {
        _customTypeDtoDeserializer = new CustomTypeDtoPacketDeserializer();
        _stringsObjectDtoDeserializer = new StringsObjectDtoPacketDeserializer();
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
        model.ArrayField = new List<StringsObjectDto>();
        var arrayFieldLength = (uint) reader.ReadByte();
        for(var i = 0; i < arrayFieldLength; i++) {
            model.ArrayField.Add(_stringsObjectDtoDeserializer.Deserialize(reader));
        }
        model.PrimitiveNumericArrayField = new List<int>();
        var primitiveNumericArrayFieldLength = (uint) reader.ReadByte();
        for(var i = 0; i < primitiveNumericArrayFieldLength; i++) {
            model.PrimitiveNumericArrayField.Add(BitConverter.ToInt32(reader.ReadBytes(4), 0));
        }
        model.PrimitiveCharArrayField = new List<string>();
        var primitiveCharArrayFieldLength = (uint) reader.ReadByte();
        for(var i = 0; i < primitiveCharArrayFieldLength; i++) {
            model.PrimitiveCharArrayField.Add(Encoding.ASCII.GetString(reader.ReadBytes(9)));
        }
        model.PrimitiveVarcharArrayField = new List<string>();
        var primitiveVarcharArrayFieldLength = (uint) reader.ReadByte();
        for(var i = 0; i < primitiveVarcharArrayFieldLength; i++) {
            model.PrimitiveVarcharArrayField.Add(Encoding.ASCII.GetString(reader.ReadBytes(reader.ReadByte())));
        }
        model.PrimitiveSingleByteArrayField = new List<sbyte>();
        var primitiveSingleByteArrayFieldLength = (uint) reader.ReadByte();
        for(var i = 0; i < primitiveSingleByteArrayFieldLength; i++) {
            model.PrimitiveSingleByteArrayField.Add((sbyte) reader.ReadByte());
        }

        return model;
    }
}