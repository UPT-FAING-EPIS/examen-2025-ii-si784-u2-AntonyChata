namespace DocumentConverter;

public class PdfConverter : IDocumentConverter
{
    public string Convert(string content)
    {
        string conversion = " [Converted to PDF]";
        return content + conversion;
    }

    public string TargetExtension => ".pdf";
}

