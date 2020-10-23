using System;
using System.IO;
using System.Text;

public class TestMessagePacketSerializer : IPacketSerializer<TestMessage> {

    private readonly IPacketSerializer<CustomTypeDto> _customTypeDtoSerializer;
    private readonly IPacketSerializer<StringsObjectDto> _stringsObjectDtoSerializer;

    public TestMessagePacketSerializer() {
        _customTypeDtoSerializer = new CustomTypeDtoPacketSerializer();
        _stringsObjectDtoSerializer = new StringsObjectDtoPacketSerializer();
    }

    public void Serialize(TestMessage testMessage, BinaryWriter writer) {
        writer.Write(BitConverter.GetBytes(TestMessage.Header));
        writer.Write(BitConverter.GetBytes(testMessage.Int32Field));
        writer.Write(BitConverter.GetBytes(testMessage.Float32Field));
        writer.Write(BitConverter.GetBytes(testMessage.Int16Field));
        writer.Write(BitConverter.GetBytes(testMessage.Int8Field));
        var VarcharFieldBytes = Encoding.ASCII.GetBytes(testMessage.VarcharField);
        writer.Write((byte) VarcharFieldBytes.Length);
        writer.Write(VarcharFieldBytes);
        writer.Write(Encoding.ASCII.GetBytes(testMessage.CharField));
        writer.Write(BitConverter.GetBytes(testMessage.Uint32Field));
        writer.Write(BitConverter.GetBytes(testMessage.Uint16Field));
        writer.Write(BitConverter.GetBytes(testMessage.Uint8Field));
        _customTypeDtoSerializer.Serialize(testMessage.CustomTypeField, writer);
        foreach(var element in testMessage.ArrayField) {
            _stringsObjectDtoSerializer.Serialize(element, writer);
        }
        foreach(var element in testMessage.PrimitiveNumericArrayField) {
            writer.Write(BitConverter.GetBytes(element));
        }
        foreach(var element in testMessage.PrimitiveCharArrayField) {
            writer.Write(Encoding.ASCII.GetBytes(element));
        }
        foreach(var element in testMessage.PrimitiveVarcharArrayField) {
            var elementBytes = Encoding.ASCII.GetBytes(element);
            writer.Write((byte) elementBytes.Length);
            writer.Write(elementBytes);
        }
        foreach(var element in testMessage.PrimitiveSingleByteArrayField) {
            writer.Write(BitConverter.GetBytes(element));
        }
    }
}