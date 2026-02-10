let inputBox = document.querySelector("#input-box");
let value1 = "";
let value2 = "0";
let toggle = false;


inputBox.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        changeValues(e.key);
    } else if (e.key === "+") {
        calcPrev()
        toggle = true;
        inputBox.value = "";
    } else if (e.key === "Enter") {
        getResult();
    }
})

function changeValues(digit) {
    if (!toggle) {
        value1 += digit;
    } else {
        value2 += digit;
    }
}

function getResult() {
    let result = parseInt(value1) + parseInt(value2);
    inputBox.value = result;
    
    value1 = result;
    value2 = "";
    toggle = false;
}

function calcPrev() {
    value1 = parseInt(value1) + parseInt(value2);
    console.log(value1);
    value2 = "";
}