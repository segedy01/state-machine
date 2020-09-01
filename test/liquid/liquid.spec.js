const rules = require("./rules.json");
const moves = require("./moves.json");
const State = require("../../index");
const { FailValidationError } = require("../../lib/exception");

const sampleCurrentProperties = {
  composition: "H2O",
  state: "liquid"
};

const stateMachine = new State(moves, rules);

describe("Test Liquid transition based on test and rules", () => {
  it("Should move to gas and solid state based on current properties", () => {
    const input = { temperature: "greaterthan100" };
    let response = stateMachine.transit(sampleCurrentProperties, input);
    expect(response).toEqual("gas");

    input.temperature = "lessthan16";
    response = stateMachine.transit(sampleCurrentProperties, input);
    expect(response).toEqual("solid");
  });

  it("should move to liquid based on the current properties and input", () => {
    const input = { temperature: "between16and100" };
    sampleCurrentProperties.state = "gas";
    let response = stateMachine.transit(sampleCurrentProperties, input);
    expect(response).toEqual("liquid");

    sampleCurrentProperties.state = "solid";
    response = stateMachine.transit(sampleCurrentProperties, input);
    expect(response).toEqual("liquid");
  });

  it("should check that callbacks work", () => {
    const sampleCallBack = () => {
      if (input.temperatureInFigure !== 101) throw "You Shall Not Pass";
    };
    const input = { temperature: "between16and100", temperatureInFigure: 101 };
    sampleCurrentProperties.state = "gas";
    let response = stateMachine.transit(
      sampleCurrentProperties,
      input,
      sampleCallBack
    );
    expect(response).toEqual("liquid");
  });

  it("should check that callback throws validationError", () => {
    expect(() => {
      const sampleCallBack = () => {
        if (input.temperatureInFigure !== 101) throw "You Shall Not Pass";
      };
      const input = {
        temperature: "between16and100",
        temperatureInFigure: 100
      };
      sampleCurrentProperties.state = "gas";
      let response = stateMachine.transit(
        sampleCurrentProperties,
        input,
        sampleCallBack
      );
    }).toThrowError(FailValidationError());
  });
});
