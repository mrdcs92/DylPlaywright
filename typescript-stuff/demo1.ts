let message1 : string = "Hello";
message1 = "bye";
console.log(message1);

let age:number = 20;

let numberArray : number[] = [1, 2, 3];

let data : any = "this could be anything";
data = 42;

console.log(data);

function add(a:number, b:number): number {
    return a+b;
}

add(3, 4);

let user:{name:string, age: number} = {name: "bob", age: 34};