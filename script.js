const inputBox = document.querySelector("#input-box");
let param = {
    curr: "",
    total: null,
    lastOper: "",
    isNewCalc: false
}

// DOM Selection
const numbersBtn = document.querySelectorAll(".number");
const opersBtn = document.querySelectorAll(".oper");
const pointBtn = document.querySelector(".point");

const keyList = [...numbersBtn, ...opersBtn, pointBtn];

keyList.forEach((key) => {
    key.addEventListener("click", (e) => {
        let text = e.currentTarget.textContent;
        if (text === "=") text = "Enter";
        if (text === "<=") text = "Backspace";
        operateValue(text);
    });
})

inputBox.addEventListener("keydown", (event) => {
    // Stops certain characters from being entered
    const allowedKeys = ['Backspace',  'Tab'];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault(); 
    }

    if (/[0-9]/.test(event.key) && param.isNewCalc) {
        param.curr = "";
        param.total = "";
        param.lastOper = "";
        param.isNewCalc = false;
        inputBox.value = "";
    }

    operateValue(event.key, event)
})

function operateValue(key, e=null) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    if (/[0-9]/.test(key)) {
        if (param.isNewCalc) resetState();
        param.curr += key;
        inputBox.value = param.curr;
    }
    
    if (["+", "-", "*", "/"].includes(key)) {
        if (param.curr === "" && param.total === null) return;
        
        if (param.total === null) {
            param.total = Number(param.curr);
        } else if (param.curr !== "") {
            calculate();
        }
        
        param.lastOper = key;
        param.curr = "";
        param.isNewCalc = false;
        inputBox.value = "";
    } else if (key === "Enter") {
        if (param.total !== null && param.curr !== "") {
            calculate();
            inputBox.value = param.total;
            param.isNewCalc = true;
        }
    } else if (key === "Backspace") {
        param.curr = param.curr.slice(0, -1);
        inputBox.value = param.curr || "0";
    } else if (key === "." && !param.curr.includes(".")) {
        param.curr = param.curr + ".";
        inputBox.value = param.curr;
    }
}

function resetState() {
    param.curr = "";
    param.total = null;
    param.lastOper = "";
    param.isNewCalc = false;
    inputBox.value = "";
}

function changeValues(digit) {
    param.curr += digit;
}

function deleteOneValue() {
    param.curr = param.curr.slice(0, -1);
    if (param.curr === "") inputBox.value = "0";
    else inputBox.value = param.curr;
}

function calculate() {
    const a = Number(param.total);
    const b = Number(param.curr);

    if (b === 0 && param.lastOper === "/") {
        param.total = "ERROR";
    } else {
        switch (param.lastOper) {
            case "+": param.total = a + b; break;
            case "-": param.total = a - b; break;
            case "*": param.total = a * b; break;
            case "/": param.total = a / b; break;
        }
        // Proper rounding to 3 decimal places
        if (typeof param.total === "number") {
            param.total = Math.round(param.total * 1000) / 1000;
        }
    }
    param.curr = ""; 
}
