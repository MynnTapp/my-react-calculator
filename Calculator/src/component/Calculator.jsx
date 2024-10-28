import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [number, setNumber] = useState("0");
  const [result, setResult] = useState(null);
  const [isEvaluated, setIsEvaluated] = useState(false); // New state to track evaluation

  const numberKey = (num) => {
    setNumber((prevNum) => {
      if (isEvaluated) {
        setIsEvaluated(false); // Reset evaluation state for new input
        console.log(prevNum);
        return num.toString(); // Start fresh with the new number
      }
      return prevNum === "0" ? num.toString() : prevNum + num;
    });
  };

  const decimalKey = (value) => {
    setNumber((prevNum) => {
      if (isEvaluated) {
        setIsEvaluated(false); // Reset if entering a new decimal after evaluation
        return "0.";
      }
      const currentNum = prevNum
        .toString()
        .split(/[\+\-\*\/]/)
        .pop();
      if (currentNum.includes(".")) return prevNum;
      return prevNum + value;
    });
  };

  const operationKey = (operator) => {
    setNumber((prevNum) => {
      if (isEvaluated) {
        setIsEvaluated(false);
        return result + operator;
      }
      return prevNum + operator;
    });
  };

  const equalSign = () => {
    try {
      let expression = number;
      expression = expression.replace(/([+\-*/]{2,})/g, (match) => {
        const lastOperator = match.slice(-1);
        return lastOperator === "-" ? match : lastOperator;
      });
      let evaluatedResult = eval(expression);
      if (typeof evaluatedResult === "number") {
        evaluatedResult = parseFloat(evaluatedResult.toFixed(4)).toString();
      }
      setResult(evaluatedResult);
      setNumber(evaluatedResult);
      setIsEvaluated(true);
    } catch (error) {
      setResult("Error");
    }
  };

  const clearButton = () => {
    setNumber("0");
    setResult(null);
    setIsEvaluated(false); // Reset evaluation state
  };

  return (
    <div id="calculator">
      <div id="number-show">
        <textarea value={number} readOnly id="screen">
          {number}
        </textarea>
      </div>
      <div id="number-block">
        <button id="one" onClick={() => numberKey(1)}>
          1
        </button>
        <button id="two" onClick={() => numberKey(2)}>
          2
        </button>
        <button id="three" onClick={() => numberKey(3)}>
          3
        </button>
        <button id="four" onClick={() => numberKey(4)}>
          4
        </button>
        <button id="five" onClick={() => numberKey(5)}>
          5
        </button>
        <button id="six" onClick={() => numberKey(6)}>
          6
        </button>
        <button id="seven" onClick={() => numberKey(7)}>
          7
        </button>
        <button id="eight" onClick={() => numberKey(8)}>
          8
        </button>
        <button id="nine" onClick={() => numberKey(9)}>
          9
        </button>
        <button id="zero" onClick={() => numberKey(0)}>
          0
        </button>
        <button id="add" onClick={() => operationKey("+")}>
          +
        </button>
        <button id="subtract" onClick={() => operationKey("-")}>
          -
        </button>
        <button id="multiply" onClick={() => operationKey("*")}>
          *
        </button>
        <button id="divide" onClick={() => operationKey("/")}>
          /
        </button>
        <button id="decimal" onClick={() => decimalKey(".")}>
          .
        </button>
        <button id="equals" onClick={equalSign}>
          =
        </button>
        <button id="clear" onClick={clearButton}>
          Clear
        </button>
      </div>

      <div id="display">{result !== null ? result : number}</div>
    </div>
  );
}
