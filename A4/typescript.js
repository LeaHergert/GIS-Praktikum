"use strict";
// Verweise auf die HTML Elemente im DOM
const inputInterpret = document.getElementById("input-Interpret"); //Verweis auf Interpret Input-Feld
const inputPreis = document.getElementById("input-Preis"); //Verweis auf Preis Input-Feld
const eventtable = document.querySelector("#eventtable"); //Verweis auf das Display-Elternelement
const addEvent = document.querySelector("#add"); //Verweis auf den Button
// Füge dem Button einen Eventlistener hinzu, der auf Click-Events lauschen soll
addEvent.addEventListener("click", addEventHandler); // Wenn ein Click-Event auf den Button ausgeführt wird, soll die Funktion "myButtonHandler" ausgeführt werden.
// Kurzer Test, ob die Input-Element im Dom auch gefunden wurden
console.log(inputInterpret);
console.log(inputPreis);
// Wenn alles klappt, sollten die entsprechenden HTML-Elemente in der Entwicklerkonsole angezeigt werden.
// Handler-Funktion für den Oben definierten Event-Listener
function addEventHandler() {
    //Holen der aktuellen Inhalte aus den Input-Elementen 
    let interpretValue = inputInterpret.value; //Das hier steht gerade im Interpret-Input
    let preisValue = Number(inputPreis.value); //Der Price-Input soll bitte einen Zahl sein
    let newElement = document.createElement("div"); // Erstelle ein Div-Element
    let deleteButton = document.createElement("button"); // Delete Button erstellen
    deleteButton.textContent = "Löschen"; //Delete-Button mit Inhalt füllen
    newElement.textContent = interpretValue + " ; " + preisValue + " € "; //Fülle das Div-Element mit einem Text-Inhalt
    eventtable.appendChild(newElement); //Füge nun noch Das erstellte Div-Element in das Display-Element als Kind-Objekt ein
    /* Da das Display Teil des DOMs ist und wir "newElement" dem Display-Element
    hinzugefügt haben ist das "newElement" nun auch Teil des DOMs und genaugenommen
    ein Kind(Child)-Objekt der Display-Elements */
    newElement.appendChild(deleteButton); //füge den Delete Button als Kindelement dem neu erstellten Element "newElement" hinzu
    // Eventlistener für den Deletebutton
    deleteButton.addEventListener("click", function () {
        deleteEvent(newElement); //Übergeben wird als Parameter das Element, welches später gelöscht werden soll.
    });
}
// Eventlistener für die Delete-Buttons
function deleteEvent(parentElement) {
    console.log("deleteEvent wurde aufgerufen!"); // Konsolenausgabe zum Testen des Funktionsaufrufes
    eventtable.removeChild(parentElement); //Lösche das als Parameter übergebene Element aus dem Elter-Element "display"
}
const jsonObj1 = JSON.stringify(inputInterpret);
localStorage.setItem("inputInterpret", jsonObj1);
const str1 = localStorage.getItem("inputInterpret");
const parsedObj1 = JSON.parse(str1);
console.log(parsedObj1);
//# sourceMappingURL=typescript.js.map