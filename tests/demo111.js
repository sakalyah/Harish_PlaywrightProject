"use strict";
let message11 = "Hello World";
message11 = "Updated message";
let ageee = 25;
let isStudent = true;
let numberArray = [1, 2, 3, 4, 5];
let data = { name: "John", age: 30, isStudent: true };
console.log(message11);
console.log(ageee);
console.log(isStudent);
console.log(numberArray);
console.log(data);
function add(a, b) {
    return a + b;
}
add(5, 10);
let use23 = { name: "Alice", age: 22, isStudent: false };
use23.location = "New York"; // This will cause an error because 'location' is not defined in the type. But still it gets compiled to JS
//Correct Usage from ts point of view
let use = { name: "Alice", age: 22, isStudent: false, location: "New York" };
