// declare some global variables

let heldValue = null;
let heldOperation = null;
let nextValue = null;

//user input events on digits & decimal

$('.digits button:not(.decimal)').click(function () {
    // user event
    // change data
    if (nextValue === null) {
        nextValue = 0;
    }
    nextValue = nextValue + $(this).text();
    // update ui
    updateDisplay();
});

$('.decimal').click(function () {
    if (nextValue === null) {
        nextValue = 0;
    }
    // prevents second decimal point s
    if (nextValue == 0) {
        nextValue = nextValue + $(this).text();
    } else {
        if (nextValue.indexOf('.') == -1) {
            nextValue = nextValue + '.';
        }
    }
    updateDisplay();
});

//special user input events for pi, plus/minus, & inverse

$('.pi').click(function () {
    if (nextValue === null) {
        nextValue = 0;
    }
    nextValue = Math.PI;
    updateDisplay();
});

$('.pi').click(function () {
    $('.next-value').text(nextValue);
    updateDisplay();
});

$('.plus-minus').click(function () {
    if (nextValue === null) {
        nextValue = 0;
    }
    nextValue = nextValue * -1;
    updateDisplay();
});

$('.plus-minus').click(function () {
    $('.next-value').text(nextValue);
    updateDisplay();
});

$('.inverse').click(function () {
    if (nextValue === null) {
        nextValue = 0;
    }
    nextValue = 1 / nextValue;
    updateDisplay();
});

$('.inverse').click(function () {
    setHeldOperation(inverse);
    $('.next-value').text(nextValue);
    updateDisplay();
});

// functions to update display after computations

$('.add').click(function () {
    setHeldOperation(add);
    $('.next-operation').html('&plus;');
    updateDisplay();
});

$('.subtract').click(function () {
    setHeldOperation(subtract);
    $('.next-operation').html('&minus;');
    updateDisplay();
});

$('.multiply').click(function () {
    setHeldOperation(multiply);
    $('.next-operation').html('&times;');
    updateDisplay();
});

$('.divide').click(function () {
    setHeldOperation(divide);
    $('.next-operation').html('&divide;');
    updateDisplay();
});

$('.sq-rt').click(function () {
    setHeldOperation(sqrt);
    $('.next-operation').html('&radic;');
    updateDisplay();
});

$('.power').click(function () {
    setHeldOperation(power);
    $('.next-operation').html('(e)');
    updateDisplay();
});

$('.equals').click(function () {
    setHeldOperation(null);
    $('.next-operation').text('');
    updateDisplay();
});

// make helper to update location & value

function showValue(location, value) {
    if (value === null) {
        $(location).text('');
        //handles divided by zero
    } else if (value === Infinity) {
        $(location).text('Cannot Divide By Zero');
    } else {
        $(location).text(Number(value));
    }
}

// make helper to update display via show value
function updateDisplay() {
    showValue('.held-value', heldValue);
    showValue('.next-value', nextValue);
}

// this is where all the magic happens i guess
// need detailed explanation of what this does
// only works because I deciphered the instructions
// this is where we can use deeper learning

function setHeldOperation(operation) {
    if (heldOperation !== null) {
        heldValue = heldOperation(heldValue, nextValue);
    } else {
        nextValue !== null && (heldValue = nextValue);
    }
    nextValue = null;
    heldOperation = operation;
}

// make computations

function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return Number(x) - Number(y);
}

function multiply(x, y) {
    return Number(x) * Number(y);
}

function divide(x, y) {
    return Number(x) / Number(y);
}

function sqrt() {
    return Math.sqrt(nextValue);
}

function power(x, y) {
    return Math.pow(Number(x), Number(y));
}

function inverse(x) {
    return 1 / Number(x);
}

// make functions to clear values

$('.memory button.clear-all').click(function () {
    (heldValue = null), (heldOperation = null), (nextValue = null);
    $('.next-operation').text('');
    updateDisplay();
});

$('.memory button.clear-entry').click(function () {
    nextValue = null;
    updateDisplay();
});
