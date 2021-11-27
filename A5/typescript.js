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
    newElement.textContent = interpretValue + "        " + preisValue; //Fülle das Div-Element mit einem Text-Inhalt
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
/*var addEventButton = document.querySelector(".userinput-Button")!;
var eventToAddTxt = document.querySelector<HTMLInputElement>(".userinput")!;
var Eventtable = document.querySelector(".Eventtable")!;
var deleteButton = document.querySelector(".delete");

function addEventHandler(): void{
  if (eventToAddTxt.value,length > 0){
    let newListItem = document.createElement("tr");
  

    let Label = document.createElement("label");
    Label.appendChild(document.createTextNode(eventToAddTxt.value));
    Label.className="Label";
    newListItem.appendChild(Label);

    let newDeleteButton = document.createElement("button");
    newDeleteButton.appendChild(document.createTextNode("löschen"));
    newDeleteButton.className="delete";
    newDeleteButton.addEventListener("click", deleteHandler);
    newListItem.appendChild(newDeleteButton);
    Eventtable.appendChild(newListItem);
    eventToAddTxt.value="";

  }}
function addEventEnterHandler(event: KeyboardEvent): void{
  if(event.which==13){
    addEventHandler();
  }
}

//cross off the done item
function checkboxDoneHandler(event: Event): void {
  //change an elements class with toggling:
  //https://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript/196038

  let checkboxElement = event.srcElement!;
  let parent = checkboxElement.parentElement!;
  parent!.querySelector(".todo")!.classList.toggle("done");
}
function deleteHandler(event: Event): void {
  event.srcElement!.parentElement!.remove();
}

for ( let i = 0; i < deleteButton.lenght; i++) {
  deleteButton[i].addEventHandler("click", deleteHandler);
}

eventToAddTxt.addEventListener("keypress", addEventEnterHandler);
addItemButton.addEventListener("click", addEventHandler);*/ 
//# sourceMappingURL=typescript.js.map