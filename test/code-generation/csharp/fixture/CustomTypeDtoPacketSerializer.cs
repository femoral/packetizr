using System;
using System.IO;
using System.Text;

public class CustomTypeDtoPacketSerializer : IPacketSerializer<CustomTypeDto> {

    public void Serialize(CustomTypeDto customTypeDto, BinaryWriter writer) {
        var VarcharFieldBytes = Encoding.ASCII.GetBytes(customTypeDto.VarcharField);
        writer.Write((byte) VarcharFieldBytes.Length);
        writer.Write(VarcharFieldBytes);
        writer.Write(Encoding.ASCII.GetBytes(customTypeDto.CharField));
    }
}