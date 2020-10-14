using System;
using System.IO;
using System.Text;

public class TestMessagePacketDeserializer : IPacketDeserializer<TestMessage> {
    public TestMessage Deserialize(byte[] buffer) {
        var message = new TestMessage();

        using (var m = new MemoryStream(buffer)) {
            using (var r = new BinaryReader(m)) {
                message.Int32Field = BitConverter.ToInt32(r.ReadBytes(4), 0);
                message.Float32Field = BitConverter.ToSingle(r.ReadBytes(4), 0);
                message.Int16Field = BitConverter.ToInt16(r.ReadBytes(2), 0);
                message.Int8Field = (sbyte) r.ReadByte();
                message.VarcharField = Encoding.ASCII.GetString(r.ReadBytes(r.ReadByte()));
                message.CharField = Encoding.ASCII.GetString(r.ReadBytes(10));
                message.Uint32Field = BitConverter.ToUInt32(r.ReadBytes(4), 0);
                message.Uint16Field = BitConverter.ToUInt16(r.ReadBytes(2), 0);
                message.Uint8Field = r.ReadByte();
            }
        }

        return message;
    }
}