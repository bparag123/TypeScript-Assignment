import { btns, trigoBtns, firstRowBtns, Button , Type} from "./data.js";
import CalculatorUtils from "./utils.js"

/*This is IIFE which is used to Initialise the Variables and create a private Scope of 
 some variables
*/

let varManager = (

    function () {

        let inputContainer = document.querySelector(".input-container") as HTMLElement;
        let radBtn = document.getElementById("rad");
        inputContainer.innerHTML = `<div class="row"></div>`;
        let userTyped = document.querySelector(".expression") as HTMLElement;
        let answerElement = document.querySelector(".answer") as HTMLElement;
        //this is used for design the button layout
        let btnCount = 0;
        let btnPerRow = 5;
        //this object contains actual data to display and calculation
        let data:{
            display:string[];
            formula:string[];
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
        function handleMath(cb:Function, value:number) {
            return cb(value)
        }

        //this function is used as formula for button instances for trigo functions
        //here cb is the value of formula and value types by users
        function handleTrigo(cb:Function, value:number) {

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
        function factorial(n: number) : number {
            if (n == 0 || n == 1) return 1;
            return n * factorial(n - 1);
        }


        //This function is Calalback for button Click Event
        let clickCallback = (event:Event) => {

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
                    case "clear":
                        data.display = [];
                        data.formula = [];
                        answerElement.innerHTML = "0";
                        break;

                    case "delete":
                        data.display.pop();
                        data.formula.pop();
                        userTyped.innerHTML = data.display.join("");
                        break;

                    case "calculate":

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
                                    
                                    answerElement.innerHTML ="Syntax Error";
                                }
                            }
                        } else {
                            answerElement.innerHTML = answer.toString();
                        }
                        break;

                    case "rad":
                        toggleRadian(selectedBtn[0])
                        break

                    case "inverseSecond":
                        toggleInverse()
                        break

                    case "f-e":
                        let myAnswer:string = answer.toExponential();
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
                    case "log10":
                    case "natural-log":
                        data.display.push(selectedBtn[0].text);
                        data.formula.push(selectedBtn[0].formula)
                        data.display.push("(")
                        break;

                    case "factorial":
                        data.display.push("!")
                        data.formula.push(selectedBtn[0].formula)
                        break;
                    case "square":
                        data.display.push("^2")
                        data.formula.push(selectedBtn[0].formula)
                        break;
                    case "power":
                        data.display.push("^")
                        data.formula.push(selectedBtn[0].formula)
                        break
                    case "10raiseto":
                        data.display.push("10^")
                        data.formula.push(selectedBtn[0].formula)
                        break;
                    case "inverse":
                        data.display.push("^(-1)");
                        data.formula.push(selectedBtn[0].formula)
                        break;
                    case "square-root":
                        data.display.push("^0.5");
                        data.formula.push(selectedBtn[0].formula)
                        break;
                    case "exponent":

                        data.display.push("exp(");
                        data.formula.push(selectedBtn[0].formula)
                        break;

                    case "abs":
                        data.display.push("abs(");
                        data.formula.push(selectedBtn[0].formula)
                        break;
                    case "sign":

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
                    case "clear":
                        memory = 0;
                        answerElement.innerHTML = "0";
                        break;
                    case "memoryStore":
                        memory = answer;
                        data.formula = []
                        data.display = []
                        answerElement.innerHTML = "0";
                        break;
                    case "result":
                        data.display = []
                        userTyped.innerHTML = memory.toString();
                        answerElement.innerHTML = memory.toString();
                        break;
                    case "memoryPlus":
                        memory += answer;
                        data.formula = []
                        data.display = []
                        answerElement.innerHTML = "0";
                        break;
                    case "memoryMinus":
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
        let toggleRadian = (btn:Button) => {

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

        /*This all are Closures which used to manage the Variable of Current Scope
        from Outside of this Scope
        */
        let changeInputContainer = (text:string) => {
            inputContainer.innerHTML += text;
        };
        let changeUserTyped = (text:string) => {
            userTyped.innerHTML = text;
        };
        let changeAnswerElement = (text:string) => {
            answerElement.innerHTML = text;
        };
        let btnCountIncrement = () => {
            btnCount++;
        }
        let getBtnCount = () => {
            return btnCount;
        }
        let getBtnPerRow = () => {
            return btnPerRow;
        }
        let getAnswer = () => {
            return answer;
        }
        let getData = () => {
            return data;
        }
        let updateData = (display:string[], formula:string[]) => {
            data = {
                display, formula
            }
        }

        return {
            changeInputContainer,
            changeUserTyped,
            changeAnswerElement,
            btnCountIncrement,
            getBtnCount,
            getBtnPerRow,
            getAnswer,
            updateData,
            getData,
            clickCallback,

        }
    }
)()

export default varManager;