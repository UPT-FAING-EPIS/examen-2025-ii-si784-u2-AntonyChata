using DocumentConverter;
using Xunit;

namespace DocumentConverter.Tests;

public class IntegrationTests
{
    [Fact]
    public void FactoryAndConverter_Integration_ShouldWork()
    {
        // Arrange
        var content = "Test document content";

        // Act
        var docxConverter = DocumentConverterFactory.CreateDocumentConverter("docx");
        var pdfConverter = DocumentConverterFactory.CreateDocumentConverter("pdf");
        var txtConverter = DocumentConverterFactory.CreateDocumentConverter("txt");

        var docxResult = docxConverter.Convert(content);
        var pdfResult = pdfConverter.Convert(content);
        var txtResult = txtConverter.Convert(content);

        // Assert
        Assert.Equal("Test document content [Converted to DOCX]", docxResult);
        Assert.Equal("Test document content [Converted to PDF]", pdfResult);
        Assert.Equal("Test document content [Converted to TXT]", txtResult);
    }

    [Fact]
    public void AllConverters_ShouldImplementIDocumentConverter()
    {
        // Act
        var docxConverter = DocumentConverterFactory.CreateDocumentConverter("docx");
        var pdfConverter = DocumentConverterFactory.CreateDocumentConverter("pdf");
        var txtConverter = DocumentConverterFactory.CreateDocumentConverter("txt");

        // Assert
        Assert.IsAssignableFrom<IDocumentConverter>(docxConverter);
        Assert.IsAssignableFrom<IDocumentConverter>(pdfConverter);
        Assert.IsAssignableFrom<IDocumentConverter>(txtConverter);
    }
}

