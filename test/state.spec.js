const State = require("../lib/State");
const { 
  InvalidPossibilitiesError,
  MissingKeyError,
 } = require("../lib/exception");

const helperRules = {
  rules: {
    input: {
      number: ["valuetoBeMappedToinState", "anotherPossibleValue"],
      alphabets: ["alphabets"]
    },
    inputTwo: {
      driller: ["anotherPossibleValue"]
    }
  },
  trigger: {
    userInput: {
      consonants: ["consonants"],
      vowels: ["vowels"],
      oddNumbers: ["oddNumbers"],
      evenNumbers: ["evenNumbers"]
  }
}
};

const helperStates = {
    anotherPossibleValue: {
      availableStates: {
        consonants: {
          from: {
            input: "B",
            inputTwo: "Vowel",
          },
          to: {
            input: "C",
            inputTwo: "Alphabet",
          }
        }
      }
    }
};

const InvalidHelperStates = {
    anotherPossibleValue: {}
};

describe("State Machine Methods Test", () => {
  const sampleCurrentProps = {
    input: "number",
    inputTwo: "driller",
  };
  const input = {
    userInput: "consonants",
  };
  const invalidSampleCurrentProps = {
    input: "number",
    inputTwo: "anotherInvalid",
  };
  const invalidInput = {
    userInput: "invalid",
  };
  it("ensures mapToState returns first single element", () => {
    const stateMachine = new State(helperStates, helperRules);
    const response = stateMachine._mapToState(
      helperRules.rules,
      sampleCurrentProps
    );
    expect(response).toEqual(helperRules.rules.inputTwo.driller);
  });
  it("ensure mapToState raises an error when more than one element remains in the Array", () => {
    expect(() => {
      const stateMachine = new State(helperStates, helperRules);
      sampleCurrentProps.remove("inputTwo");
      const response = stateMachine._mapToState(
        helperRules.rules,
        sampleCurrentProps
      );
      expect(response).toEqual(helperRules.rules.inputTwo.driller);
    }).toThrow(InvalidPossibilitiesError());
  });
  it("should throw Missing key error exception if invalid state is passed", () => {
    const transiter = new State(InvalidHelperStates, helperRules);
    expect(() => {
      transiter.transit(sampleCurrentProps, input);
    }).toThrowError(MissingKeyError());
  });
  it("should throw an error if an invalid state has been passed state", () => {
    const transiter = new State(helperStates, helperRules);
    expect(() => {
      transiter.transit(invalidSampleCurrentProps, input)
    }).toThrowError(InvalidPossibilitiesError());
  });
});
