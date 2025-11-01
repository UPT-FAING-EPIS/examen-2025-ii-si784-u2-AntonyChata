using DocumentConverter;
using Xunit;

namespace DocumentConverter.Tests;

public class DocxConverterTests
{
    [Fact]
    public void Convert_ShouldAppendDocxConversion()
    {
        // Arrange
        var converter = new DocxConverter();
        var content = "Test content";

        // Act
        var result = converter.Convert(content);

        // Assert
        Assert.Equal("Test content [Converted to DOCX]", result);
    }

    [Fact]
    public void Convert_WithEmptyString_ShouldReturnConversionOnly()
    {
        // Arrange
        var converter = new DocxConverter();
        var content = "";

        // Act
        var result = converter.Convert(content);

        // Assert
        Assert.Equal(" [Converted to DOCX]", result);
    }

    [Fact]
    public void Convert_WithNull_ShouldHandleNull()
    {
        // Arrange
        var converter = new DocxConverter();
        string? content = null;

        // Act
        var result = converter.Convert(content!);

        // Assert
        Assert.Equal(" [Converted to DOCX]", result);
    }

    [Fact]
    public void TargetExtension_ShouldReturnDocx()
    {
        // Arrange
        var converter = new DocxConverter();

        // Act
        var extension = converter.TargetExtension;

        // Assert
        Assert.Equal(".docx", extension);
    }

    [Fact]
    public void Convert_MultipleCalls_ShouldWorkConsistently()
    {
        // Arrange
        var converter = new DocxConverter();
        var content = "Same content";

        // Act
        var result1 = converter.Convert(content);
        var result2 = converter.Convert(content);

        // Assert
        Assert.Equal(result1, result2);
        Assert.Equal("Same content [Converted to DOCX]", result1);
    }
}

