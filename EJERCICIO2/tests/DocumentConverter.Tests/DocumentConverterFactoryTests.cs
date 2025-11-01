using DocumentConverter;
using Xunit;

namespace DocumentConverter.Tests;

public class DocumentConverterFactoryTests
{
    [Theory]
    [InlineData("docx", typeof(DocxConverter))]
    [InlineData("DOCX", typeof(DocxConverter))]
    [InlineData("Docx", typeof(DocxConverter))]
    [InlineData("pdf", typeof(PdfConverter))]
    [InlineData("PDF", typeof(PdfConverter))]
    [InlineData("Pdf", typeof(PdfConverter))]
    [InlineData("txt", typeof(TxtConverter))]
    [InlineData("TXT", typeof(TxtConverter))]
    [InlineData("Txt", typeof(TxtConverter))]
    public void CreateDocumentConverter_WithValidFormat_ShouldReturnCorrectConverter(string format, Type expectedType)
    {
        // Act
        var converter = DocumentConverterFactory.CreateDocumentConverter(format);

        // Assert
        Assert.NotNull(converter);
        Assert.IsType(expectedType, converter);
        Assert.NotNull(converter.TargetExtension);
    }

    [Fact]
    public void CreateDocumentConverter_WithDocx_ShouldReturnDocxConverter()
    {
        // Act
        var converter = DocumentConverterFactory.CreateDocumentConverter("docx");

        // Assert
        var docxConverter = Assert.IsType<DocxConverter>(converter);
        Assert.Equal(".docx", docxConverter.TargetExtension);
    }

    [Fact]
    public void CreateDocumentConverter_WithPdf_ShouldReturnPdfConverter()
    {
        // Act
        var converter = DocumentConverterFactory.CreateDocumentConverter("pdf");

        // Assert
        var pdfConverter = Assert.IsType<PdfConverter>(converter);
        Assert.Equal(".pdf", pdfConverter.TargetExtension);
    }

    [Fact]
    public void CreateDocumentConverter_WithTxt_ShouldReturnTxtConverter()
    {
        // Act
        var converter = DocumentConverterFactory.CreateDocumentConverter("txt");

        // Assert
        var txtConverter = Assert.IsType<TxtConverter>(converter);
        Assert.Equal(".txt", txtConverter.TargetExtension);
    }

    [Theory]
    [InlineData("doc")]
    [InlineData("html")]
    [InlineData("xml")]
    [InlineData("rtf")]
    [InlineData("")]
    [InlineData("invalid")]
    public void CreateDocumentConverter_WithInvalidFormat_ShouldThrowArgumentException(string format)
    {
        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => 
            DocumentConverterFactory.CreateDocumentConverter(format));
        
        Assert.Equal("Unsupported document format", exception.Message);
    }

    [Fact]
    public void CreateDocumentConverter_IsCaseInsensitive()
    {
        // Act
        var converter1 = DocumentConverterFactory.CreateDocumentConverter("DOCX");
        var converter2 = DocumentConverterFactory.CreateDocumentConverter("docx");
        var converter3 = DocumentConverterFactory.CreateDocumentConverter("DocX");

        // Assert
        Assert.IsType<DocxConverter>(converter1);
        Assert.IsType<DocxConverter>(converter2);
        Assert.IsType<DocxConverter>(converter3);
    }

    [Fact]
    public void CreateDocumentConverter_WithWhitespace_ShouldThrowException()
    {
        // Act & Assert
        Assert.Throws<ArgumentException>(() => 
            DocumentConverterFactory.CreateDocumentConverter(" docx "));
    }
}

