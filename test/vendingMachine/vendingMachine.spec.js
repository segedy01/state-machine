const rules = require("./rules.json");
const moves = require("./moves.json");
const State = require("../../index");

const machine = new State(moves, rules);

describe("  state moves", () => {
    it("should transition from idle to fiveCents if the input of fiveCents is provided", () =>{
        const currentState = { state: "idle" };
        const userInput = { input: "fiveCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.idle.availableStates.fiveCents.to;
        expect(response).toEqual(actual);
    })

    it("should transition from idle to fiftyCents if the input of fiftyCents is provided", () =>{
        const currentState = { state: "idle" };
        const userInput = { input: "fiftyCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.idle.availableStates.fiftyCents.to;
        expect(response).toEqual(actual);
    })

    it("should transition from fiveCents to twentyFiveCents if the input of twentyCents is provided", () =>{
        const currentState = { state: "fiveCents" };
        const userInput = { input: "twentyCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.fiveCents.availableStates.twentyCents.to;
        expect(response).toEqual(actual);
    })

    it("should return a balance of fortyCents if you provide an input of fiftyCents at sixtyFiveCentsState", () =>{
        const currentState = { state: "sixtyFiveCents" };
        const userInput = { input: "fiftyCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.sixtyFiveCents.availableStates.fiftyCents.to.balance;
        expect(response.balance).toEqual(actual);
    })

    it("should not return a balance if you provide an input of fiveCents at seventyCentsState", () =>{
        const currentState = { state: "seventyCents" };
        const userInput = { input: "fiveCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.seventyCents.availableStates.fiveCents.to.balance;
        expect(response.balance).toEqual(actual);
    })

    it("should transition from finish to idle after five seconds", () =>{
        const currentState = { state: "finish" };
        const userInput = { input: "fiveSeconds" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.finish.availableStates.fiveSeconds.to;
        expect(response).toEqual(actual);
    })

    it("should transition from fiftyCents to finish if the input of fiftyCents is provided", () =>{
        const currentState = { state: "fiftyCents" };
        const userInput = { input: "fiftyCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.fiftyCents.availableStates.fiftyCents.to.state;
        expect(response.state).toEqual(actual);
    })

    it("should transition from sixtyCents to seventyCents if the input of tenCents is provided", () =>{
        const currentState = { state: "sixtyCents" };
        const userInput = { input: "tenCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.sixtyCents.availableStates.tenCents.to;
        expect(response).toEqual(actual);
    })

    it("should transition from seventyCents to finish if the input of tenCents is provided", () =>{
        const currentState = { state: "seventyCents" };
        const userInput = { input: "tenCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.seventyCents.availableStates.tenCents.to.state;
        expect(response.state).toEqual(actual);
    })

    it("should transition from thirtyCents to fiftyCents if the input of twentyCents is provided", () =>{
        const currentState = { state: "thirtyCents" };
        const userInput = { input: "twentyCents" };
        const response = machine.transit(currentState, userInput);
        const actual = moves.thirtyCents.availableStates.twentyCents.to;
        expect(response).toEqual(actual);
    })

    it("should return an error if incorrect current state is provided", () =>{
        const currentState = { state: "thirty" };
        const userInput = { input: "twentyCents" };
        expect(() => {
            machine.transit(currentState, userInput)
        }).toThrowError('An empty array was returned. This might be an issue with your rules and trigger definitions')

    })

    it("should return an error if incorrect  input is provided", () =>{
        const currentState = { state: "fiveCents" };
        const userInput = { input: "twelve" };
        expect(() => {
            machine.transit(currentState, userInput)
        }).toThrowError('An empty array was returned. This might be an issue with your rules and trigger definitions')

    })

})