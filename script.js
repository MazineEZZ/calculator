const inputBox = document.querySelector("#input-box");
let param = {
    curr: "",
    total: "",
    lastOper: "",
    isNewCalc: false
}

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

    if (event.key >= "0" && event.key <= "9") {
        event.preventDefault();
        changeValues(event.key);
        inputBox.value = param.curr;
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        if (param.total === "") {
            param.total = param.curr;
        } else {
            getCalc(param.lastOper);
        }
        param.lastOper = event.key;
        param.curr = "";
        inputBox.value = "";
        event.preventDefault();
        param.isNewCalc = false;
    } else if (event.key === "Enter") {
        let result = getCalc(param.lastOper);
        if (result !== "ERROR") {
            inputBox.value = Math.floor(result * 1000) / 1000;
        } else {
            inputBox.value = result;
            param.curr = "";
            param.total = "";
            param.lastOper = "";
        }
        event.preventDefault();
        param.isNewCalc = true;
    } else if (event.key === "Backspace") {
        deleteOneValue();
    }
})

function changeValues(digit) {
    param.curr += digit;
}

function deleteOneValue() {
    param.curr = param.curr.slice(0, -1);
}

function getCalc(oper) {
    if ((param.curr === "" || parseInt(param.curr) === 0) && oper === "/") {
        return "ERROR";
    } else if (param.curr === "" && (oper === "*" || oper === "/"))  {
        param.curr = "1";
    } else if (param.curr === "") {
        param.curr = "0";
    }

    const a = Number(param.total);
    const b = Number(param.curr);
    
    switch (oper) {
        case "+": param.total = a + b; break;
        case "-": param.total = a - b; break;
        case "*": param.total = a * b; break;
        case "/": param.total = a / b; break;
    }

    param.curr = "";
    return param.total;
}

// TODO: * Backspace is non-functional only visual
//       * The "Chain" Execution Problem (Check with Gemini for more information)