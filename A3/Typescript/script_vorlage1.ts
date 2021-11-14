// -- [Aufgabe 1]

/**
 * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
 */
let age: number = 20;

/**
 * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
 */
let firstName: string = `Lea`;

function func1(age: number): number {
  return 2021 - age;
}

let output: string = func2(firstName);

function func3(meal?: string): string {
  console.log(`Ich esse gerne ${meal || "Pizza"}.`);
  return func1(age) > 1995
    ? `Ich gehöre zur Generation Z`
    : `Ich gehöre zur Generation Y`;
}

console.log(output);

function func2(name: string): string {
  console.log(`Ich heiße ${name}.`);
  return func3();
}

/* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
 * 2001
 * Ich esse gerne Pizza.
 * Ich gehöre zu Generation Z
 */

// -- [Aufgabe 2]

let events: any[][] = [
  ["Mark Knopfler", 10.1],
  ["Pink Floyd", 15.9],
  ["Metallica", 20.1],
  ["Michael Bublé", 11.1],
  ["Dire Straits", 12.2],
  ["Mariah Carey", 1.1],
  ["Cat Stevens", 12.99],
  ["Mark Forster", 2.1],
  ["Helene Fischer", 3.1],
  ["Bee Gees", 25.2],
];

// -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 2 EINTRAGEN

// Lösung a) 

console.log(events.length);

// Lösung b) ...
for(let i=0; i< events.length; i++){
  console.log(events[i][0], events[i][1]);
}
// Lösung c) ...
function maxP(array:any[][]):number{
let resultat =0;
for(let i=0; i<array.length; i++){
  if(array[i][1]>resultat){
    resultat = array[i][1];
  }
}
return resultat;
}

// Lösung d) ...
function interpretSearch(array:any[][], interpret: string): boolean{
 
 for(let i=0; i < array.length; i++){
   if(array[i][0]==interpret){
     return true;
   }
 }
 
  return false;
}
console.log (interpretSearch(events, "Bee Gees"));
// Lösung e) ...

let i= 1;
let fakultaet =1;

function factorial(n=4){
  while(i<=n){
    fakultaet*=i;
    i++;
  }
  console.log("Fakultät= ",fakultaet);
 

}
// Lösung f) ...
let count: number =0;
for(let i=1; i<=100; i++){
if(i % 3==0){
  count++;
console.log(i);
}
}
console.log("count: ", count);
// Lösung g) ...

class ConcertEvent{

private interpret: string;
private price: number;

constructor(interpret:string ,price:number){
  this.interpret = interpret;
  this.price = price;
}
show():string{
  return `${this.interpret} Karten kosten ${this.price}€`;
}
}


  // ["Pink Floyd", 15.9],
  // ["Metallica", 20.1],
  // ["Michael Bublé", 11.1],
  // ["Dire Straits", 12.2],
  // ["Mariah Carey", 1.1],
  // ["Cat Stevens", 12.99],
  // ["Mark Forster", 2.1],
  // ["Helene Fischer", 3.1],
  // ["Bee Gees", 25.2],
// Lösung h) ...
let e=new ConcertEvent("Mark Knopfler", 10.1);
e.show();
console.log(e.show());