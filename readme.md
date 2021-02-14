# State Machine
A finite state machine that allows you define possible transitions and rules.


Lets define a liquid and the posible state's it can transition into. All the moves should be defined in this format.
moves.js

```json
{
  "liquid": {
    "availableStates": {
      "greaterthan100": {
        "from": "liquid",
        "to": "gas"
      },
      "lessthan16": {
        "from": "liquid",
        "to": "solid"
      }
    }
  },
  "solid": {
    "availableStates": {
      "between16and100": {
        "from": "solid",
        "to": "liquid"
      }
    }
  },
  "gas": {
    "availableStates": {
      "between16and100": {
        "from": "gas",
        "to": "liquid"
      }
    }
  }
}
```

```json
{
  "rules": {
    "composition": {
      "H2O": ["liquid", "solid", "gas"]
    },
    "state": {
      "liquid": ["liquid"],
      "solid": ["solid"],
      "gas": ["gas"]
    }
  },
  "trigger": {
    "temperature": {
      "greaterthan100": ["greaterthan100"],
      "between16and100": ["between16and100"],
      "lessthan16": ["lessthan16"]
    }
  }
}
```

Your Input should contain `key: value` pairs that can be mapped to `key: Object` and `key: value` pairs in your `rules` and `trigger` respectively.

```javascript
State = require(State);
const currentProperties = {
  state: "liquid",
  composition: "H2O"
};
const input = {
  temperature: "greaterthan100"
};
const stateMachine = new State(moves, rules);
const value = stateMachine.transit(currentProperties, input);
console.log(value); // gas
```

```javascript
//ensure temperature is 101 degrees

input.temperatureInFigure = 101;
callBack = () => {
  if (input.temperatureInFigure != 101) throw "You Shall Not Pass";
};
const value = stateMachine.transit(currentProperties, input, callBack);
console.log(value); //gas

//fails when its not 101 degrees
input.temperatureInFigure = 100;
const value = transition((currentProperties, input, callBack); //throws error
```
