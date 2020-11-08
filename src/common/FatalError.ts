export class FatalError extends Error {
  hint: string | undefined;
  errorCode: number | undefined;

  constructor(params: FatalErrorParams) {
    super(params.message);
    this.name = "FatalError";
    this.hint = params.hint;
    this.errorCode = params.errorCode;
  }
}

interface FatalErrorParams {
  message: string;
  hint?: string;
  errorCode?: number;
}
