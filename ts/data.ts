class Button {

    text: string;
    operation: string;
    type: string;
    formula: string;

    constructor(text: string, operation: string, type: string, formula: string) {
        this.text = text;
        this.operation = operation;
        this.type = type;
        this.formula = formula
    }
}

enum Type {
    MEMORY = "memory", KEY = "key", MATH = "math", OPERATOR = "operator", SYMBOL = "symbol", NUMBER = "number", TRIGO = "trigo"
}


const firstRowBtns = [
    new Button("Rad", "rad", Type.KEY, ""),
    new Button("F-E", "f-e", Type.KEY, ""),
]

const btns = [
    new Button("MC", "clear", Type.MEMORY, ""),
    new Button("MR", "result", Type.MEMORY, ""),
    new Button("M+", "memoryPlus", Type.MEMORY, ""),
    new Button("M-", "memoryMinus", Type.MEMORY, ""),
    new Button("MS", "memoryStore", Type.MEMORY, ""),
    new Button("2<span class='inverseSecond'>nd</span>", "inverseSecond", Type.KEY, ""),
    new Button("π", "Math.PI", Type.MATH, Math.PI.toString()),
    new Button("e", "Math.E", Type.MATH, Math.E.toString()),
    new Button("C", "clear", Type.KEY, ""),
    new Button("⌫", "delete", Type.KEY, ""),
    new Button("x²", "square", Type.MATH, "**2"),
    new Button("1/x", "inverse", Type.MATH, "**-1"),
    new Button("|x|", "abs", Type.MATH, "handleMath(Math.abs,"),
    new Button("exp", "exponent", Type.MATH, "handleMath(Math.exp,"),
    new Button("mod", "modulus", Type.OPERATOR, "%"),
    new Button("√x", "square-root", Type.MATH, "**0.5"),
    new Button("(", "(", Type.SYMBOL, "("),
    new Button(")", ")", Type.SYMBOL, ")"),
    new Button("n!", "factorial", Type.MATH, "factorial"),
    new Button("÷", "division", Type.OPERATOR, "/"),
    new Button("x<span class='power'>y</span>", "power", Type.MATH, "**"),
    new Button("7", "7", Type.NUMBER, "7"),
    new Button("8", "8", Type.NUMBER, "8"),
    new Button("9", "9", Type.NUMBER, "9"),
    new Button("X", "multiplication", Type.OPERATOR, "*"),
    new Button("10<span class='10raiseto'>x</span>", "10raiseto", Type.MATH, "10**"),
    new Button("4", "4", Type.NUMBER, "4"),
    new Button("5", "5", Type.NUMBER, "5"),
    new Button("6", "6", Type.NUMBER, "6"),
    new Button("-", "subtraction", Type.OPERATOR, "-"),
    new Button("log", "log10", Type.MATH, "handleMath(Math.log10,"),
    new Button("1", "1", Type.NUMBER, "1"),
    new Button("2", "2", Type.NUMBER, "2"),
    new Button("3", "3", Type.NUMBER, "3"),
    new Button("+", "addition", Type.OPERATOR, "+"),
    new Button("ln", "natural-log", Type.MATH, "handleMath(Math.log,"),
    new Button("+/-", "sign", Type.MATH, ""),
    new Button("0", "0", Type.NUMBER, "0"),
    new Button(".", ".", Type.OPERATOR, "."),
    new Button("=", "calculate", Type.KEY, ""),
]

let trigoBtns = [
    new Button("sin", "sin", Type.TRIGO, "handleTrigo(Math.sin,"),
    new Button("cos", "cos", Type.TRIGO, "handleTrigo(Math.cos,"),
    new Button("tan", "tan", Type.TRIGO, "handleTrigo(Math.tan,"),
]
export { btns, trigoBtns, firstRowBtns, Button, Type };