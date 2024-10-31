// let count: number
let count = 0;


// let isEven: boolean
let isEven = true;


// let message: string
let message = "The current count is";


// let result: number
let result = 0;


// let operator: string
let operator = "+";


// let numbers: number[]
let numbers = [10, 20, 30, 40, 50];


// let allEven: boolean
let allEven = true;


// function addNumbers(a: number, b: number): number
function addNumbers(a, b) {
    return a + b;
}


// function checkEven(num: number): boolean
function checkEven(num) {
    return num % 2 === 0;
}


// function printMessage(currentCount: number): string
function printMessage(currentCount) {
    return message + " " + currentCount;
}


// function calculate(a: number, b: number, operator: string): number
function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return 0;
    }
}


// function sumArray(numArray: number[]): number
function sumArray(numArray) {
    let sum = 0;
    for (let i = 0; i < numArray.length; i++) {
        sum += numArray[i];
    }
    return sum;
}


// function areAllEven(numArray: number[]): boolean
function areAllEven(numArray) {
    for (let i = 0; i < numArray.length; i++) {
        if (numArray[i] % 2 !== 0) {
            return false;
        }
    }
    return true;
}


// function greetEveryone(nameList: string[]): void
function greetEveryone(nameList) {
    for (let i = 0; i < nameList.length; i++) {
        console.log("Hello, " + nameList[i] + "!");
    }
}


// let names: string[]
let names = ["Alice", "Bob", "Charlie", "Diana"];


for (let i = 0; i < 50; i++) {
    count = addNumbers(count, i);
    isEven = checkEven(count);
    
    if (isEven) {
        console.log(printMessage(count) + " and it is even.");
    } else {
        console.log(printMessage(count) + " and it is odd.");
    }
}


for (let i = 1; i <= 25; i++) {
    result = calculate(result, i, "+");
    console.log("After adding", i, "Result is:", result);
}


for (let i = 1; i <= 25; i++) {
    result = calculate(result, i, "-");
    console.log("After subtracting", i, "Result is:", result);
}


for (let i = 1; i <= 25; i++) {
    result = calculate(result, i, "*");
    console.log("After multiplying", i, "Result is:", result);
}


for (let i = 1; i <= 25; i++) {
    result = calculate(result, i, "/");
    console.log("After dividing", i, "Result is:", result);
}


console.log("The sum of the array is: " + sumArray(numbers));

allEven = areAllEven(numbers);

console.log("Are all numbers in the array even? " + allEven);


greetEveryone(names);