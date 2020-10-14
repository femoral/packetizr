using System;
using System.IO;

public class TestMessagePacketSerializer : IPacketSerializer<TestMessage> {
    public byte[] Serialize(TestMessage message) {
        using (var m = new MemoryStream())
        {
            using (var w = new BinaryWriter(m))
            {
                w.Write(BitConverter.GetBytes(TestMessage.Header));
                w.Write(BitConverter.GetBytes(message.Int32Field));
                w.Write(BitConverter.GetBytes(message.Float32Field));
                w.Write(BitConverter.GetBytes(message.Int16Field));
                w.Write(BitConverter.GetBytes(message.Int8Field));
                w.Write(BitConverter.GetBytes(message.VarcharField));
                w.Write(BitConverter.GetBytes(message.CharField));
                w.Write(BitConverter.GetBytes(message.Uint32Field));
                w.Write(BitConverter.GetBytes(message.Uint16Field));
                w.Write(BitConverter.GetBytes(message.Uint8Field));
                return m.ToArray();
            }
        }
    }
}