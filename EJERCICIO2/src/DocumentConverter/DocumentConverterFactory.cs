namespace DocumentConverter;

public static class DocumentConverterFactory
{
    public static IDocumentConverter CreateDocumentConverter(string format)
    {
        switch (format.ToLower())
        {
            case "docx":
                return new DocxConverter();
            case "pdf":
                return new PdfConverter();
            case "txt":
                return new TxtConverter();
            default:
                throw new ArgumentException("Unsupported document format");
        }
    }
}

