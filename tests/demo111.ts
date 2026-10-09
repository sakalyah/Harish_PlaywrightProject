let message11: string = "Hello World";
message11 = "Updated message";

let ageee: number = 25;
let isStudent: boolean = true;

let numberArray: number[] = [1, 2, 3, 4, 5];

let data: any = { name: "John", age: 30, isStudent: true };

console.log(message11);
console.log(ageee);
console.log(isStudent);
console.log(numberArray);
console.log(data);

function add(a: number, b: number): number {
    return a + b;
}

add(5, 10);

let use23: { name: string; age: number; isStudent: boolean } = { name: "Alice", age: 22, isStudent: false };
use23.location = "New York"; // This will cause an error because 'location' is not defined in the type. But still it gets compiled to JS

//COrrect Usage
let use: { name: string; age: number; isStudent: boolean ; location: string } = { name: "Alice", age: 22, isStudent: false, location: "New York" };