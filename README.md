# HTML to Govspeak including tables
This builds on the existing GDS HTML to govspeak converter by adding the functionality to convert tables too.
This project brings together:

- [Paste HTML to govspeak](https://github.com/alphagov/paste-html-to-govspeak)
- [HTML table to markdown converter ](https://github.com/johnbeech/html-table-to-markdown-converter/tree/master)

## Paste HTML to govspeak

This package provides an event listener that will convert pasted HTML content on form inputs and textareas into [Govspeak](https://github.com/alphagov/govspeak) (a markdown extension library for government publishers).

The HTML data available to the browser clipboard is complicated and inconsistent, learn more about this [functionality and its limitations](https://github.com/alphagov/paste-html-to-govspeak/blob/main/docs/functionality-overview.md).

## HTML table to markdown converter

This uses javascript to convert HTML tables to markdown.

## Combination

I have built on the GDS tool to include the ability to convert tables to markdown. I have added an extra box in the 'Debug information from last paste' drop down which detects HTML tables in the clipboard data and returns the markdown version. 

If a table is detected then it will run convertTable() in table-converter.js on the table. If no tables are detected it will say so.
