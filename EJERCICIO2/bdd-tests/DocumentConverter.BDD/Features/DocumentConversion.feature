Feature: Document Conversion
	As a user
	I want to convert documents to different formats
	So that I can use them in different applications

Background:
	Given I have a document converter factory

Scenario: Convert document to DOCX format
	Given I have a document with content "Sample document content"
	When I convert it to "docx" format
	Then the result should contain "Sample document content [Converted to DOCX]"
	And the target extension should be ".docx"

Scenario: Convert document to PDF format
	Given I have a document with content "Sample document content"
	When I convert it to "pdf" format
	Then the result should contain "Sample document content [Converted to PDF]"
	And the target extension should be ".pdf"

Scenario: Convert document to TXT format
	Given I have a document with content "Sample document content"
	When I convert it to "txt" format
	Then the result should contain "Sample document content [Converted to TXT]"
	And the target extension should be ".txt"

Scenario Outline: Convert document to different formats (case insensitive)
	Given I have a document with content "<content>"
	When I convert it to "<format>" format
	Then the result should contain "<expectedResult>"
	And the target extension should be "<extension>"

	Examples:
		| format | content                  | expectedResult                               | extension |
		| docx   | My document               | My document [Converted to DOCX]              | .docx     |
		| DOCX   | My document               | My document [Converted to DOCX]              | .docx     |
		| Docx   | My document               | My document [Converted to DOCX]              | .docx     |
		| pdf    | Important text            | Important text [Converted to PDF]             | .pdf      |
		| PDF    | Important text            | Important text [Converted to PDF]             | .pdf      |
		| Pdf    | Important text            | Important text [Converted to PDF]             | .pdf      |
		| txt    | Simple content            | Simple content [Converted to TXT]             | .txt      |
		| TXT    | Simple content            | Simple content [Converted to TXT]            | .txt      |
		| Txt    | Simple content            | Simple content [Converted to TXT]            | .txt      |

Scenario: Convert empty document
	Given I have a document with content ""
	When I convert it to "docx" format
	Then the result should contain " [Converted to DOCX]"

Scenario: Try to convert to unsupported format
	Given I have a document with content "Test content"
	When I try to convert it to "html" format
	Then an error should be thrown with message "Unsupported document format"

Scenario: Factory creates correct converter for DOCX
	When I create a converter for "docx" format
	Then the converter should be of type DocxConverter

Scenario: Factory creates correct converter for PDF
	When I create a converter for "pdf" format
	Then the converter should be of type PdfConverter

Scenario: Factory creates correct converter for TXT
	When I create a converter for "txt" format
	Then the converter should be of type TxtConverter

