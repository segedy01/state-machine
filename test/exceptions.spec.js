const {
  InvalidPossibilitiesError,
  TooManyActionsError,
  DateError,
  FailValidationError,
  MissingKeyError
} = require("../lib/exception");

describe("Test exceptions", () => {
  it("Should expect InvalidPossibilitiesError to throw and Error", () => {
    expect(() => {
      throw InvalidPossibilitiesError();
    }).toThrow(Error());
  });
  it("Should expect TooManyActionsError to throw and Error", () => {
    expect(() => {
      throw TooManyActionsError("error message");
    }).toThrow(Error("error message"));
  });
  it("Should expect FailValidationError to throw and Error", () => {
    expect(() => {
      throw FailValidationError();
    }).toThrow(Error());
  });
  it("Should expect MissingKeyError to throw and Error", () => {
    expect(() => {
      throw MissingKeyError("error message");
    }).toThrow(Error("error message"));
  });
  it("should return a default error message if no message is provided", () => {
    const errorMessage = TooManyActionsError();
    expect(errorMessage.message).toBe("Possibilities Can't Be Represented");
  });
  it("should return relevant error messages in DateError", () => {
    const defaultErrorMessage = TooManyActionsError();
    const customErrorMessage = DateError("custom error message");
    expect(defaultErrorMessage.message).toBe("Possibilities Can't Be Represented");
    expect(customErrorMessage.message).toBe("custom error message");
  });
});
