using DocumentConverter;
using Xunit;

namespace DocumentConverter.Tests;

public class TxtConverterTests
{
    [Fact]
    public void Convert_ShouldAppendTxtConversion()
    {
        // Arrange
        var converter = new TxtConverter();
        var content = "Test content";

        // Act
        var result = converter.Convert(content);

        // Assert
        Assert.Equal("Test content [Converted to TXT]", result);
    }

    [Fact]
    public void Convert_WithEmptyString_ShouldReturnConversionOnly()
    {
        // Arrange
        var converter = new TxtConverter();
        var content = "";

        // Act
        var result = converter.Convert(content);

        // Assert
        Assert.Equal(" [Converted to TXT]", result);
    }

    [Fact]
    public void TargetExtension_ShouldReturnTxt()
    {
        // Arrange
        var converter = new TxtConverter();

        // Act
        var extension = converter.TargetExtension;

        // Assert
        Assert.Equal(".txt", extension);
    }

    [Fact]
    public void Convert_WithMultilineContent_ShouldPreserveLines()
    {
        // Arrange
        var converter = new TxtConverter();
        var content = "Line 1\nLine 2\nLine 3";

        // Act
        var result = converter.Convert(content);

        // Assert
        Assert.Equal("Line 1\nLine 2\nLine 3 [Converted to TXT]", result);
    }
}

