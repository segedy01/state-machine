/* No, no -- 'antelope' - 'antelope', *tinny* sort of word.
   Oh, sorry old man. Really, Mansfield. Well, she's got to
   come to terms with these things.	'Seemly.' 'Prodding.'
   'Vac-u-um.' 'Leap.' Oh -- hate 'leap'. Perfectly dreadful.
   Sort of PVC sort of word, don't you know. Lower middle.
   'Bound!' Now you're talking! 'Bound.' 'Vole!' 'Recidivist!'
   Bit *tinny*...
*/
const {
  InvalidPossibilitiesError,
  FailValidationError,
  MissingKeyError
} = require("./exception");

class State {
  constructor(states, rules) {
    this.states = states;
    this.rules = rules.rules;
    this.trigger = rules.trigger;
  }

  /**
   * @description
   *  This function helps map a list of possible moves as a return.
   *  At the end of the call, it should be able to return an Array of
   *  containing a single element.
   * @param {Object} currentProperties This should hold the current
   *  representation of whatever is in transit. Its like a current status
   *
   * @param {Object} input Theese are triggers. Actions the state
   *  machine is waiting for to transit
   *
   * @param {Function} callBack This is primarily to act like a validator.
   *  to help validate your input before letting it transit. But, what the
   *  hell thinker away!
   *
   * @throws FailsValidationError,
   *
   * @returns {Object}
   */
  transit(currentProperties, input, callBack) {
    const validStates = this._mapToState(this.rules, currentProperties);
    const currentState = this.states[validStates[0]];
    const currentTrigger = this._mapToState(this.trigger, input);
    this._checkAvailableStates(currentState);
    const destination = currentState.availableStates[currentTrigger[0]];
    this._checkDestination(destination);
    const from = destination.from;
    const to = destination.to;
    this._validator(to, currentProperties, input, callBack);
    return destination.to;
  }

  /**
   * @description Action Handler collects a map and a user input.
   *  identify positions in the map until a single position
   *  is left. This position is return as an element in an array
   *
   * @param {object} map : contains keys to transition object
   * @param {object} input : contains keys(same as ones used in rules)
   *
   * @throws InvalidPossibilitiesError
   *
   * @returns {Array}
   */
  _mapToState(map, input, typeCheck) {
    let validMap = [];
    const availableKeys = Object.keys(map);
    const keysCount = availableKeys.length;
    let counter = 0;
    while (counter !== keysCount) {
      if (validMap && validMap.length === 1) break;
      let currentKey = availableKeys[counter];
      let valuefromInput = input[currentKey];
      if (validMap.length === 0 && valuefromInput) {
        validMap = map[currentKey][valuefromInput];
      } else if (
        validMap.length > 1 &&
        valuefromInput &&
        map[currentKey][valuefromInput]
      ) {
        validMap = validMap.filter(location => {
          return map[currentKey][valuefromInput].indexOf(location) !== -1;
        });
      }
      counter += 1;
    }

    this._checkPossibilities(validMap);
    return validMap;
  }

  /**
   * @description: validator takes callBack. I'm still
   *  trying to wrap some deep use of how js callBack
   *  can work by passing some value into it implicitly
   *  so library user can access the values in their call
   *  backs too. Passes silently but fails loudly
   *
   * @param {object} to : Should be available for users by just
   *  referencing it. contains where the transition leads to
   * @param {Function} callBack : Your callBack our call please
   *
   * @throws FailValidationError
   */
  _validator(to, currentProps, input, callBack) {
    if (callBack === undefined) callBack = () => {};
    try {
      callBack(to);
    } catch (err) {
      throw FailValidationError(err);
    }
  }

  _checkPossibilities(value) {
    if (value && value.length !== 1) {
      throw InvalidPossibilitiesError(
        "Don't know where to go! This is mostly likely caused by passing invalid current state"
      );
    } else if (!value) {
      throw InvalidPossibilitiesError(
        "An empty array was returned. This might be an issue with your rules and trigger definitions, incorrect current state or input"
      );
    }
  }

  _checkDestination(destination) {
    if (!destination){
      throw InvalidPossibilitiesError("You cannot be moved to defined destination")
    }
  }

  _checkAvailableStates(states) {
    if (!states.availableStates) {
      throw MissingKeyError();
    }
  }
}

module.exports = State;
