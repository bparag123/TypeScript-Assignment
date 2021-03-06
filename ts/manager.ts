import { btns, trigoBtns, firstRowBtns, Button, Type, Operations } from "./data.js";
import CalculatorUtils from "./utils.js"

/*This is IIFE which is used to Initialise the Variables and create a private Scope of 
 some variables
*/

namespace varManager {



    let inputContainer = document.querySelector(".input-container") as HTMLElement;
    let radBtn = document.getElementById("rad");
    inputContainer.innerHTML = `<div class="row"></div>`;
    let userTyped = document.querySelector(".expression") as HTMLElement;
    let answerElement = document.querySelector(".answer") as HTMLElement;
    //this is used for design the button layout
    let btnCount = 0;
    let btnPerRow = 5;
    //this object contains actual data to display and calculation
    let data: {
        display: string[];
        formula: string[];
    } = {
        display: [],
        formula: []
    }
    let answer = 0;

    //this are toggler Variables
    let isRad = true;
    let isInverse = false;
    //this is for memory operations
    let memory = 0;

    //this function is for toggle between Trigonometry functions either Inverse / regular.
    let toggleInverse = () => {
        let inverse2nd = document.querySelector(".inverseSecond")!;

        if (isInverse) {
            inverse2nd.classList.remove("active")
        }
        else {
            inverse2nd.classList.add("active")
        }
        isInverse = !isInverse
    }

    //this function is used as formula for button instances for math functions
    //here cb is the value of formula and value types by users
    function handleMath(cb: Function, value: number) {
        return cb(value)
    }

    //this function is used as formula for button instances for trigo functions
    //here cb is the value of formula and value types by users
    function handleTrigo(cb: Function, value: number) {

        //default behaviour of math functions is taking radian as a angle
        //so if the entered angle is in radian then not an issue
        if (isRad) {
            return cb(value)
        }
        else {
            /*
            If user want to find inverse of value and want answer in decimal
            */
            if (isInverse) {

                let radAngle = cb(value)
                //convert radian to degree
                return radAngle * 180 / Math.PI
            }
            //if user inserted angle is degree then we need to convert degree into radian
            else {
                return cb(value * Math.PI / 180);
            }
        }
    }

    //This function is for find factorial of number.
    function factorial(n: number): number {
        if (n == 0 || n == 1) return 1;
        return n * factorial(n - 1);
    }


    //This function is Calalback for button Click Event
    export let clickCallback = (event: Event) => {

        let allBtns = [...btns, ...trigoBtns, ...firstRowBtns]

        let selectedBtn = allBtns.filter((btn) => {

            //Here in some buttton's text there are span
            //so there is chance to click on span and the innerHtml will be different
            //so i have compared with operation which is unique and will be class of element
            let test = btn.text.toString()
            let clickedBtn = event.target as HTMLElement;
            if (test.search("span") > 0) {

                return btn.operation == clickedBtn.classList[0];
            }
            return btn.text == clickedBtn.innerHTML;
        })


        if (selectedBtn[0].type === Type.KEY) {

            //perform different tasks based on selected button's operation
            switch (selectedBtn[0].operation) {
                case Operations.CLEAR:
                    data.display = [];
                    data.formula = [];
                    answerElement.innerHTML = "0";
                    break;

                case Operations.DELETE:
                    data.display.pop();
                    data.formula.pop();
                    userTyped.innerHTML = data.display.join("");
                    break;

                case Operations.CALCULATE:

                    if (data.formula.length !== 0) {

                        //This Function finds Factorial Keyword from Formula
                        let searchedExpressions = CalculatorUtils.getFactorialKeyword();

                        //If any factorial word found then we need to wrap previous expression
                        //with factorial()
                        let finalExpression = data.formula.join("");
                        searchedExpressions.forEach((ele) => {
                            let toReplace = ele + "factorial";
                            let replacement = `factorial(${ele})`
                            finalExpression = finalExpression.replace(toReplace, replacement);
                        })

                        try {
                            answer = eval(finalExpression);

                            if (isNaN(answer)) {
                                answerElement.innerHTML = "invalid";
                                data.display = []
                                data.formula = [answer.toString()]
                            } else {
                                data.display = [answer.toString()]
                                answerElement.innerHTML = answer.toString();
                                data.formula = [answer.toString()]
                            }

                        } catch (error) {
                            if (error instanceof SyntaxError) {

                                answerElement.innerHTML = "Syntax Error";
                            }
                        }
                    } else {
                        answerElement.innerHTML = answer.toString();
                    }
                    break;

                case Operations.RAD:
                    toggleRadian(selectedBtn[0])
                    break

                case Operations.INVERSESECOND:
                    toggleInverse()
                    break

                case Operations.F_E:
                    let myAnswer: string = answer.toExponential();
                    data.display = [myAnswer];
                    data.formula = [myAnswer]
                    answerElement.innerHTML = myAnswer;
                    break

                default:
                    break;
            }
        }
        else if (selectedBtn[0].type === Type.MATH) {
            //perform different tasks based on selected button's operation
            switch (selectedBtn[0].operation) {
                case Operations.LOG10:
                case Operations.NATURAL_LOG:
                    data.display.push(selectedBtn[0].text);
                    data.formula.push(selectedBtn[0].formula)
                    data.display.push("(")
                    break;

                case Operations.FACTORIAL:
                    data.display.push("!")
                    data.formula.push(selectedBtn[0].formula)
                    break;
                case Operations.SQUARE:
                    data.display.push("^2")
                    data.formula.push(selectedBtn[0].formula)
                    break;
                case Operations.POWER:
                    data.display.push("^")
                    data.formula.push(selectedBtn[0].formula)
                    break
                case Operations.TEN_RAISE_TO:
                    data.display.push("10^")
                    data.formula.push(selectedBtn[0].formula)
                    break;
                case Operations.INVERSE:
                    data.display.push("^(-1)");
                    data.formula.push(selectedBtn[0].formula)
                    break;
                case Operations.SQRT:
                    data.display.push("^0.5");
                    data.formula.push(selectedBtn[0].formula)
                    break;
                case Operations.EXP:

                    data.display.push("exp(");
                    data.formula.push(selectedBtn[0].formula)
                    break;

                case Operations.ABS:
                    data.display.push("abs(");
                    data.formula.push(selectedBtn[0].formula)
                    break;
                case Operations.SIGN:

                    answer *= -1

                    userTyped.innerHTML = answer.toString()
                    data.display = [answer.toString()]
                    data.formula = [answer.toString()]
                    break
                default:
                    data.display.push(selectedBtn[0].text);
                    data.formula.push(selectedBtn[0].formula)
                    break;
            }
        }
        else if (selectedBtn[0].type === Type.OPERATOR) {
            data.display.push(selectedBtn[0].text);
            data.formula.push(selectedBtn[0].formula)
        }
        else if (selectedBtn[0].type === Type.NUMBER) {
            data.display.push(selectedBtn[0].text);
            data.formula.push(selectedBtn[0].formula);
        }
        else if (selectedBtn[0].type === Type.TRIGO) {

            if (isInverse) {
                /*If User want to find inverse of Trigonometry then we need to modify
                its math formula
                */
                let splittedFormula = selectedBtn[0].formula.split(".")
                splittedFormula.splice(1, 0, ".a")
                let inverseFormula = splittedFormula.join("")
                data.display.push(`a${selectedBtn[0].text}`);
                data.formula.push(inverseFormula)
            } else {

                data.display.push(selectedBtn[0].text);
                data.formula.push(selectedBtn[0].formula)
            }
            data.display.push("(")
        }
        else if (selectedBtn[0].type == Type.MEMORY) {

            switch (selectedBtn[0].operation) {
                case Operations.CLEAR:
                    memory = 0;
                    answerElement.innerHTML = "0";
                    break;
                case Operations.MEMORYSTORE:
                    memory = answer;
                    data.formula = []
                    data.display = []
                    answerElement.innerHTML = "0";
                    break;
                case Operations.RESULT:
                    data.display = []
                    userTyped.innerHTML = memory.toString();
                    answerElement.innerHTML = memory.toString();
                    break;
                case Operations.MEMORYPLUS:
                    memory += answer;
                    data.formula = []
                    data.display = []
                    answerElement.innerHTML = "0";
                    break;
                case Operations.MEMORYMINUS:
                    memory -= answer;
                    data.formula = []
                    data.display = []
                    answerElement.innerHTML = "0";
                    break;

                default:
                    break;
            }

        }
        else {
            data.display.push(selectedBtn[0].text);
            data.formula.push(selectedBtn[0].formula);
        }

        userTyped.innerHTML = data.display.join("");

    }

    /*This Function is used when User want to Toggle between Rad and deg.
    here argument is Button Instance because we need to update its Display Text.
    */
    let toggleRadian = (btn: Button) => {

        radBtn = document.getElementById("Rad") as HTMLButtonElement
        if (isRad) {
            radBtn.innerHTML = "Deg";
            btn.text = "Deg";
        }
        else {
            radBtn.innerHTML = "Rad";
            btn.text = "Rad";
        }
        isRad = !isRad;

    }

    // This all methods are exported outside of the namespace to use from other scope

    export let changeInputContainer = (text: string) => {
        inputContainer.innerHTML += text;
    }
    export let btnCountIncrement = () => {
        btnCount++;
    }
    export let getBtnCount = () => {
        return btnCount;
    }
    export let getBtnPerRow = () => {
        return btnPerRow;
    }
    export let getData = () => {
        return data;
    }


}

export default varManager;