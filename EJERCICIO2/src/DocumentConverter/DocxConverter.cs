namespace DocumentConverter;

public class DocxConverter : IDocumentConverter
{
    public string Convert(string content)
    {
        string conversion = " [Converted to DOCX]";
        return content + conversion;
    }

    public string TargetExtension => ".docx";
}

