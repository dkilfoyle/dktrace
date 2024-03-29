export const errorCodes = {
  INVALID_TYPE: 1000,
  INVALID_SIZE: 1001,
  NOT_INVERTIBLE: 1002
};

const errorMessages = {
  [errorCodes.INVALID_TYPE]: "Invalid Type",
  [errorCodes.INVALID_SIZE]: "Invalid Size",
  [errorCodes.NOT_INVERTIBLE]: "Not Invertible"
};

export class RtError extends Error {
  constructor(errorCode, message) {
    super();
    this.errorCode = errorCode;
    this.errorMessage = errorMessages[this.errorCode];
    this.message = `[${this.errorCode} - ${this.errorMessage}] ${message}`;
  }

  static get Code() {
    return errorCodes;
  }
}
