# Doc Converter Utility

The contained solution is a conversion utility to conver .DOC files to .DOCX files.

## Depedencies

The application requires the following:

* .NET 7.0
* Aspose.Words

## Usage

Once the solution is builty, you can execute the application with the following command:

```bash
# Widows

DocConverter.exe "<.doc full file path"
```

```bash
# Non-Windows

dotnet DocConverter.dll "<.doc full file path"
```

The application will output the file with the same full path with a .docx extension.
