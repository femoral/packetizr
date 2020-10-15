public interface IPacketSerializer<in TModel> {
    byte[] Serialize(TModel model);
}