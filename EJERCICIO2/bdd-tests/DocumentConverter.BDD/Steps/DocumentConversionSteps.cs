using DocumentConverter;
using TechTalk.SpecFlow;
using Xunit;

namespace DocumentConverter.BDD.Steps;

[Binding]
public class DocumentConversionSteps
{
    private string? _documentContent;
    private IDocumentConverter? _converter;
    private string? _conversionResult;
    private Exception? _exception;

    [Given(@"I have a document converter factory")]
    public void GivenIHaveADocumentConverterFactory()
    {
        // Background step - no action needed
    }

    [Given(@"I have a document with content ""(.*)""")]
    public void GivenIHaveADocumentWithContent(string content)
    {
        _documentContent = content;
    }

    [When(@"I convert it to ""(.*)"" format")]
    public void WhenIConvertItToFormat(string format)
    {
        try
        {
            _converter = DocumentConverterFactory.CreateDocumentConverter(format);
            _conversionResult = _converter.Convert(_documentContent ?? "");
            _exception = null;
        }
        catch (Exception ex)
        {
            _exception = ex;
        }
    }

    [When(@"I try to convert it to ""(.*)"" format")]
    public void WhenITryToConvertItToFormat(string format)
    {
        try
        {
            _converter = DocumentConverterFactory.CreateDocumentConverter(format);
            _conversionResult = _converter.Convert(_documentContent ?? "");
            _exception = null;
        }
        catch (Exception ex)
        {
            _exception = ex;
        }
    }

    [When(@"I create a converter for ""(.*)"" format")]
    public void WhenICreateAConverterForFormat(string format)
    {
        try
        {
            _converter = DocumentConverterFactory.CreateDocumentConverter(format);
            _exception = null;
        }
        catch (Exception ex)
        {
            _exception = ex;
        }
    }

    [Then(@"the result should contain ""(.*)""")]
    public void ThenTheResultShouldContain(string expectedContent)
    {
        Assert.NotNull(_conversionResult);
        Assert.Contains(expectedContent, _conversionResult);
    }

    [Then(@"the target extension should be ""(.*)""")]
    public void ThenTheTargetExtensionShouldBe(string expectedExtension)
    {
        Assert.NotNull(_converter);
        Assert.Equal(expectedExtension, _converter.TargetExtension);
    }

    [Then(@"an error should be thrown with message ""(.*)""")]
    public void ThenAnErrorShouldBeThrownWithMessage(string expectedMessage)
    {
        Assert.NotNull(_exception);
        Assert.Equal(expectedMessage, _exception.Message);
        Assert.IsType<ArgumentException>(_exception);
    }

    [Then(@"the converter should be of type DocxConverter")]
    public void ThenTheConverterShouldBeOfTypeDocxConverter()
    {
        Assert.NotNull(_converter);
        Assert.IsType<DocxConverter>(_converter);
    }

    [Then(@"the converter should be of type PdfConverter")]
    public void ThenTheConverterShouldBeOfTypePdfConverter()
    {
        Assert.NotNull(_converter);
        Assert.IsType<PdfConverter>(_converter);
    }

    [Then(@"the converter should be of type TxtConverter")]
    public void ThenTheConverterShouldBeOfTypeTxtConverter()
    {
        Assert.NotNull(_converter);
        Assert.IsType<TxtConverter>(_converter);
    }
}

