class Button {
    constructor(text, operation, type, formula) {
        this.text = text;
        this.operation = operation;
        this.type = type;
        this.formula = formula;
    }
}
var Type;
(function (Type) {
    Type["MEMORY"] = "memory";
    Type["KEY"] = "key";
    Type["MATH"] = "math";
    Type["OPERATOR"] = "operator";
    Type["SYMBOL"] = "symbol";
    Type["NUMBER"] = "number";
    Type["TRIGO"] = "trigo";
})(Type || (Type = {}));
var Operations;
(function (Operations) {
    Operations["CLEAR"] = "clear";
    Operations["RESULT"] = "result";
    Operations["MEMORYPLUS"] = "memoryPlus";
    Operations["MEMORYMINUS"] = "memoryMinus";
    Operations["MEMORYSTORE"] = "memoryStore";
    Operations["INVERSESECOND"] = "inverseSecond";
    Operations["PI"] = "Math.PI";
    Operations["E"] = "Math.E";
    Operations["DELETE"] = "delete";
    Operations["SQUARE"] = "square";
    Operations["INVERSE"] = "inverse";
    Operations["ABS"] = "abs";
    Operations["EXP"] = "exponent";
    Operations["MOD"] = "modulus";
    Operations["SQRT"] = "square-root";
    Operations["OPENBRACKET"] = "(";
    Operations["CLOSEBRACKET"] = ")";
    Operations["FACTORIAL"] = "factorial";
    Operations["DIVISION"] = "division";
    Operations["POWER"] = "power";
    Operations["DIGIT"] = "digit";
    Operations["MULTIPLICATION"] = "multiplication";
    Operations["TEN_RAISE_TO"] = "10raiseto";
    Operations["SUBTRACTION"] = "subtraction";
    Operations["LOG10"] = "log10";
    Operations["ADDITION"] = "addition";
    Operations["NATURAL_LOG"] = "natural_log";
    Operations["SIGN"] = "sign";
    Operations["CALCULATE"] = "calculate";
    Operations["DOT"] = ".";
    Operations["SIN"] = "sin";
    Operations["COS"] = "cos";
    Operations["TAN"] = "tan";
    Operations["RAD"] = "rad";
    Operations["F_E"] = "f-e";
})(Operations || (Operations = {}));
const firstRowBtns = [
    new Button("Rad", Operations.RAD, Type.KEY, ""),
    new Button("F-E", Operations.F_E, Type.KEY, ""),
];
const btns = [
    new Button("MC", Operations.CLEAR, Type.MEMORY, ""),
    new Button("MR", Operations.RESULT, Type.MEMORY, ""),
    new Button("M+", Operations.MEMORYPLUS, Type.MEMORY, ""),
    new Button("M-", Operations.MEMORYMINUS, Type.MEMORY, ""),
    new Button("MS", Operations.MEMORYSTORE, Type.MEMORY, ""),
    new Button("2<span class='inverseSecond'>nd</span>", Operations.INVERSESECOND, Type.KEY, ""),
    new Button("π", Operations.PI, Type.MATH, Math.PI.toString()),
    new Button("e", Operations.E, Type.MATH, Math.E.toString()),
    new Button("C", Operations.CLEAR, Type.KEY, ""),
    new Button("⌫", Operations.DELETE, Type.KEY, ""),
    new Button("x²", Operations.SQUARE, Type.MATH, "**2"),
    new Button("1/x", Operations.INVERSE, Type.MATH, "**-1"),
    new Button("|x|", Operations.ABS, Type.MATH, "handleMath(Math.abs,"),
    new Button("exp", Operations.EXP, Type.MATH, "handleMath(Math.exp,"),
    new Button("mod", Operations.MOD, Type.OPERATOR, "%"),
    new Button("√x", Operations.SQRT, Type.MATH, "**0.5"),
    new Button("(", Operations.OPENBRACKET, Type.SYMBOL, "("),
    new Button(")", Operations.CLOSEBRACKET, Type.SYMBOL, ")"),
    new Button("n!", Operations.FACTORIAL, Type.MATH, "factorial"),
    new Button("÷", Operations.DIVISION, Type.OPERATOR, "/"),
    new Button("x<span class='power'>y</span>", Operations.POWER, Type.MATH, "**"),
    new Button("7", Operations.DIGIT, Type.NUMBER, "7"),
    new Button("8", Operations.DIGIT, Type.NUMBER, "8"),
    new Button("9", Operations.DIGIT, Type.NUMBER, "9"),
    new Button("X", Operations.MULTIPLICATION, Type.OPERATOR, "*"),
    new Button("10<span class='10raiseto'>x</span>", Operations.TEN_RAISE_TO, Type.MATH, "10**"),
    new Button("4", Operations.DIGIT, Type.NUMBER, "4"),
    new Button("5", Operations.DIGIT, Type.NUMBER, "5"),
    new Button("6", Operations.DIGIT, Type.NUMBER, "6"),
    new Button("-", Operations.SUBTRACTION, Type.OPERATOR, "-"),
    new Button("log", Operations.LOG10, Type.MATH, "handleMath(Math.log10,"),
    new Button("1", Operations.DIGIT, Type.NUMBER, "1"),
    new Button("2", Operations.DIGIT, Type.NUMBER, "2"),
    new Button("3", Operations.DIGIT, Type.NUMBER, "3"),
    new Button("+", Operations.ADDITION, Type.OPERATOR, "+"),
    new Button("ln", Operations.NATURAL_LOG, Type.MATH, "handleMath(Math.log,"),
    new Button("+/-", Operations.SIGN, Type.MATH, ""),
    new Button("0", Operations.DIGIT, Type.NUMBER, "0"),
    new Button(".", Operations.DOT, Type.OPERATOR, "."),
    new Button("=", Operations.CALCULATE, Type.KEY, ""),
];
let trigoBtns = [
    new Button("sin", Operations.SIN, Type.TRIGO, "handleTrigo(Math.sin,"),
    new Button("cos", Operations.COS, Type.TRIGO, "handleTrigo(Math.cos,"),
    new Button("tan", Operations.TAN, Type.TRIGO, "handleTrigo(Math.tan,"),
];
export { btns, trigoBtns, firstRowBtns, Button, Type, Operations };
