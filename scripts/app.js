// declare some global variables
let heldValue = null;
let heldOperation = null;
let nextValue = null;

//user input events on digits
$('.digits button').click(function () {
    //event
    // change data
    if (nextValue === null) {
        nextValue = 0;
    }
    nextValue = nextValue + $(this).text();
    // update ui
    updateDisplay();
});

// user input events on operators
$('.add').click(function () {
    setHeldOperation(add);
    $('.next-operation').text('+');
    updateDisplay();
});

$('.subtract').click(function () {
    setHeldOperation(subtract);
    $('.next-operation').text('-');
    updateDisplay();
});

$('.multiply').click(function () {
    setHeldOperation(multiply);
    $('.next-operation').text('×');
    updateDisplay();
});

$('.divide').click(function () {
    setHeldOperation(divide);
    $('.next-operation').text('÷');
    updateDisplay();
});

$('.sq-rt').click(function () {
    setHeldOperation(sqrt);
    $('.next-operation').text('√');
    updateDisplay();
});

$('.power').click(function () {
    setHeldOperation(power);
    $('.next-operation').html('(E)');
    updateDisplay();
});

$('.plus-minus').click(function () {
    setHeldOperation(plusminus);
    $('.next-value').text(nextValue);
    updateDisplay();
});

$('.equals').click(function () {
    setHeldOperation(null);
    $('.next-operation').text('');
    updateDisplay();
});

// make helper for location and value
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

// make helper to update the display via show value
function updateDisplay() {
    showValue('.held-value', heldValue);
    showValue('.next-value', nextValue);
}

// this is where all the magic happens i guess
// we need a more explanation of what this does
// it only works because I deciphered the instructions
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

// make computational functions
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

function plusminus() {
  
  if(nextValue > 0) {
    return (Number(nextValue) * -1);
   }
  else if (nextValue < 0) { 
    return (Number(heldValue)) * -1;
  }
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
