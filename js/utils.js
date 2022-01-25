import varManager from "./manager.js";
//This Class is Helper Class which is used to add Functionalities for Manager. 
export default class CalculatorUtils {
}
//This method returns array which contains elements which are found before factorial keyword
CalculatorUtils.getFactorialKeyword = () => {
    let getFactorialIndexes = [];
    varManager.getData().formula.forEach((ele, index) => {
        //Storing index of keyword factorial
        if (ele === "factorial") {
            getFactorialIndexes.push(index);
        }
    });
    let searchedExpressions = [];
    for (let i = 0; i < getFactorialIndexes.length; i++) {
        let factorial_index = getFactorialIndexes[i];
        //Start finding for expression before keyword factorial
        let prev = factorial_index - 1;
        let beforeExpression = [];
        let operators = ["+", "*", "/", "-", "**", "%"];
        //This is used to match paranthesis if any expression is found before keyword factorial
        let parenthesisCount = 0;
        while (prev >= 0) {
            if (varManager.getData().formula[prev] === ")")
                parenthesisCount++;
            if (varManager.getData().formula[prev] === "(") {
                if (parenthesisCount === 0)
                    break;
                parenthesisCount--;
            }
            if (operators.includes(varManager.getData().formula[prev]) && parenthesisCount == 0)
                break;
            beforeExpression.unshift(varManager.getData().formula[prev]);
            prev--;
        }
        searchedExpressions.push(beforeExpression.join(""));
    }
    return searchedExpressions;
};
