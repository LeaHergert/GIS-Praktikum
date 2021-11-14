"use strict";
// -- [Aufgabe 1]
/**
 * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
 */
let age = 20;
/**
 * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
 */
let firstName = `Lea`;
function func1(age) {
    return 2021 - age;
}
let output = func2(firstName);
function func3(meal) {
    console.log(`Ich esse gerne ${meal || "Pizza"}.`);
    return func1(age) > 1995
        ? `Ich gehöre zur Generation Z`
        : `Ich gehöre zur Generation Y`;
}
console.log(output);
function func2(name) {
    console.log(`Ich heiße ${name}.`);
    return func3();
}
/* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
 * 2001
 * Ich esse gerne Pizza.
 * Ich gehöre zu Generation Z
 */
// -- [Aufgabe 2]
let events = [
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
for (let i = 0; i < events.length; i++) {
    console.log(events[i][0], events[i][1]);
}
// Lösung c) ...
function maxP(array) {
    let resultat = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i][1] > resultat) {
            resultat = array[i][1];
        }
    }
    return resultat;
}
// Lösung d) ...
function interpretSearch(array, interpret) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] == interpret) {
            return true;
        }
    }
    return false;
}
console.log(interpretSearch(events, "Bee Gees"));
// Lösung e) ...
// Schreiben Sie eine Funktion mit dem Namen "factorial" die einen Wert "n" entgegennimmt und deren Fakultät(1*2*3*...*n) 
// in der Funktion als Konsolen-Ausgabe ausgibt. Die Funktion soll keinen Rückgabewert haben. 
// Verwenden Sie diesmal für diese Funktion explizit eine "while"-Schleife. Testen Sie die Funktion mit den Werten 4, 5 und 10.
let i = 1;
let fakultaet = 1;
function factorial(n = 4) {
    while (i <= n) {
        fakultaet *= i;
        i++;
    }
    console.log("Fakultät= ", fakultaet);
}
// Lösung f) ...
// let count: number =0;
// for(let i=1; i<=100; i++){
// if(i % 3==0){
//   count++;
// console.log(i);
// }
// }
// console.log("count: ", count);
// Lösung g) ...
// Lösung h) ...
//# sourceMappingURL=script_vorlage1.js.map