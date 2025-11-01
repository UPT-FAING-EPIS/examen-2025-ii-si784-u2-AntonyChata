namespace DocumentConverter;

public interface IDocumentConverter
{
    string Convert(string content);
    string TargetExtension { get; }
}

