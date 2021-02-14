const InvalidPossibilitiesError = message => {
  if (message === undefined) {
    message = "Your Action Triggered So Many Event We Can't Handle.";
  }
  const instance = new Error(message);
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, DateError);
  }
  return instance;
};

const TooManyActionsError = message => {
  if (message === undefined) {
    message = "Possibilities Can't Be Represented";
  }
  const instance = new Error(message);
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, DateError);
  }
  return instance;
};

const FailValidationError = message => {
  if (message === undefined) {
    message = "Validation Failed";
  }
  const instance = new Error(message);
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, DateError);
  }
  return instance;
};

const MissingKeyError = message => {
  if (message === undefined) {
    message = "You seems to be missing some of our required keys";
  }
  const instance = new Error(message);
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, MissingKeyError);
  }
  return instance;
};

module.exports = {
  InvalidPossibilitiesError,
  TooManyActionsError,
  FailValidationError,
  MissingKeyError
};
