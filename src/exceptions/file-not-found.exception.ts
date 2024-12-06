export class FileNotFoundException extends Error {
  code: string;

  constructor(filePath: string) {
    super(`File not found: ${filePath}`);
    this.name = "FileNotFoundException";
    this.code = "ENOENT";
    Error.captureStackTrace(this, FileNotFoundException);
  }
}
