





 class Eventtabelle {
    interpret: string;
    preis: number;
   

    constructor(interpret: string, preis: number) {
        this.interpret = interpret;
        this.preis = preis;
    }
}

 class Eventtabellen {
        elements: string[] = [];
        addElement(element: Eventtabelle, index: number) {
            this.elements[index] = JSON.stringify(element);

            localStorage.setItem(index.toString(), this.elements[index]);
        }

        readElement(index: number): Eventtabelle {
            var element: string;
            var interpret: string;
            var preis: number;

            element = this.elements[index];
            interpret = (JSON.parse(element).preis);

            return new Eventtabelle(interpret, preis);
        }


        editElement(index: number, element: Eventtabelle) {
            localStorage.removeItem(this.elements[index]);

            this.elements[index] = JSON.stringify(element).replace(this.elements[index], JSON.stringify(element));
            localStorage.setItem(index.toString(), this.elements[index]);
        }


    }


 let addButton: HTMLElement = document.getElementById("add");
 let elementID: number = 0;
 addButton.addEventListener("click", addElement);
 let Eventtabellen = new Eventtabellen();

 if (localStorage.getItem(elementID.toString()) ! == null) {
    for (let i: number = 0; i < localStorage.length; i++) {
        let element: string = localStorage.getItem(i.toString());

        let interpret: string = (JSON.parse(element).interpret);
        let preis: number = parseInt(JSON.parse(element).preis);

        let Eventtabelle: Eventtabelle = new Eventtabelle(interpret, preis);
        Eventtabelle.addElement(Eventtabelle, i);
        frameElement();
        fillForm();
        elementID++;
    }
} 

 function editElement(event: Event) {
    let eventID: string = (<HTMLElement>event.target).dataset.elementid;
    let dataEvent: string = "[data-todu-elementid]";
    let Eventtabelle = document.querySelectorAll(dataEvent);


    let Eventtabelle = document.querySelectorAll(dataEvent);
    Eventtabelle.forEach(element => {
        if (element.getAttribute("data-todu-elementid") == eventID) {
            ////console.log(element + " with Tag: data-todu-elementid= " + eventID + " will be edited");

            let eventNumber: number = parseInt(eventID);
            let toDoElement: HTMLElement = document.getElementById(eventNumber.toString());

            let interpret = toDoElement.getElementsByClassName("interpret_out");
            let preis = toDoElement.getElementsByClassName("price_out");

            ////console.log(interpret_out.item(0));

            interpret.item(0).textContent = (Eventtabelle.readElement(eventNumber).interpret).toString();
            preis.item(0).textContent = (Eventtabelle.readElement(eventNumber).price).toString();
            
        }
    });
 }

 function removeElement(event: Event) {
    let eventID: string = (<HTMLElement>event.target).dataset.elementid;
    let dataEvent: string = '[data-todu-elementid]';
    let Eventtabelle = document.querySelectorAll(dataEvent);


    //iterates thorug all elements end check to what needs to be removed
    Eventtabelle.forEach(element => {
        if (element.getAttribute("data-todu-elementid") == eventID) {
            ////console.log(element + " with Tag: data-todu-elementid= " + eventID + " will be removed");
            element.remove()
            Eventtabelle.readElement(parseInt(eventID)) == null;
            localStorage.removeItem(eventID.toString());

        }
    });
}

 function addElement() {
    createElement();
    fillForm();
    elementID++;
}

 function fillForm() {
    //get elemnt byID in this TAG
    let Eventtabelle: HTMLElement = document.getElementById(elementID.toString());

    let interpret = Eventtabelle.getElementsByClassName("interpret_out");
    let preis = Eventtabelle.getElementsByClassName("price_out");
   

    ////console.log(interpret_out.item(0));

    interpret.item(0).textContent = (Eventtabelle.readElement(elementID).interpret).toString();
    preis.item(0).textContent = (Eventtabelle.readElement(elementID).price).toString();
   
}





 function readForm() {

    let interpret: string = null;
    let preis: number = null;

    let Eventtabelle: Eventtabelle = new Eventtabelle(interpret, preis);
    Eventtabelle.addElement(Eventtabelle, elementID);

 }

 function createElement() {
    let table: HTMLElement = document.createElement("table");
    let tbody: HTMLElement = document.createElement("tbody");
    let Element: HTMLElement = document.createElement("tr");
    let interpret: HTMLElement = document.createElement("td");
    let preis: HTMLElement = document.createElement("td");
    let delete: HTMLElement = document.createElement("td");
    let deletBeutton: HTMLElement = document.createElement("button");
   
    toDoElement.classList.add("toDoElement");
    interpret.classList.add("interpret_out");
    preis.classList.add("price_out");
    delete.classList.add("delete");

    deleteButton.classList.add("delete");
    deleteButton.innerText = "Löschen";
    deleteButton.setAttribute("type", "button");
    deleteButton.addEventListener("click", removeElement, false);

    editButton.classList.add("editButton");
    editButton.innerText = "EDIT";
    editButton.setAttribute("type", "button");
    editButton.addEventListener("click", editElement, false);

    toDoElement.appendChild(interpret);
    toDoElement.appendChild(preis);

    delete.appendChild(deleteButton);
    

    toDoElement.appendChild(delete);

    tbody.appendChild(toDoElement);
    table.appendChild(tbody);

    let toDoOUT = document.getElementById("toDoOUT").appendChild(table);
    ////console.log("createt ToDo elemtn wit the ID: " + elementID);

    toDoOUT.setAttribute("data-todu-elementid", elementID + "");
    deleteButton.setAttribute("data-elementid", elementID + "");
    editButton.setAttribute("data-elementid", elementID + "");

    toDoOUT.id = elementID.toString();
}
}

/*

class ToDoElements {
    elements: string[] = [];
    addElement(element: ToDoElement, index: number) {
        ////console.log(this.elements);
        this.elements[index] = JSON.stringify(element);

        //safe to laocal sorage;
        localStorage.setItem(index.toString(), this.elements[index]);

        ////console.log(JSON.stringify(element));

    }




  // Verweise auf die HTML Elemente im DOM
  const inputInterpret: HTMLInputElement = <HTMLInputElement>document.getElementById("input-Interpret"); //Verweis auf Interpret Input-Feld
  const inputPreis: HTMLInputElement = <HTMLInputElement>document.getElementById("input-Preis"); //Verweis auf Preis Input-Feld
  const eventtable: HTMLElement = <HTMLElement>document.querySelector("#eventtable"); //Verweis auf das Display-Elternelement
  const addEvent: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#add"); //Verweis auf den Button
  

  // Füge dem Button einen Eventlistener hinzu, der auf Click-Events lauschen soll
  addEvent.addEventListener("click", addEventHandler); // Wenn ein Click-Event auf den Button ausgeführt wird, soll die Funktion "myButtonHandler" ausgeführt werden.

  // Kurzer Test, ob die Input-Element im Dom auch gefunden wurden
  console.log(inputInterpret);
  console.log(inputPreis);
  // Wenn alles klappt, sollten die entsprechenden HTML-Elemente in der Entwicklerkonsole angezeigt werden.


  // Handler-Funktion für den Oben definierten Event-Listener
  function addEventHandler(): void {
      //Holen der aktuellen Inhalte aus den Input-Elementen 
      let interpretValue: string = inputInterpret.value; //Das hier steht gerade im Interpret-Input
      let preisValue: number = Number(inputPreis.value); //Der Price-Input soll bitte einen Zahl sein


      let newElement: HTMLDivElement = document.createElement("div"); // Erstelle ein Div-Element
      let deleteButton: HTMLButtonElement = document.createElement("button"); // Delete Button erstellen
      deleteButton.textContent = "Löschen"; //Delete-Button mit Inhalt füllen
      
      newElement.textContent = interpretValue + " ; " + preisValue + " € "; //Fülle das Div-Element mit einem Text-Inhalt


      eventtable.appendChild(newElement); //Füge nun noch Das erstellte Div-Element in das Display-Element als Kind-Objekt ein
      /* Da das Display Teil des DOMs ist und wir "newElement" dem Display-Element
      hinzugefügt haben ist das "newElement" nun auch Teil des DOMs und genaugenommen
      ein Kind(Child)-Objekt der Display-Elements 

      newElement.appendChild(deleteButton); //füge den Delete Button als Kindelement dem neu erstellten Element "newElement" hinzu

      // Eventlistener für den Deletebutton
      deleteButton.addEventListener("click", function(): void {
          deleteEvent(newElement); //Übergeben wird als Parameter das Element, welches später gelöscht werden soll.
      });

  }

  // Eventlistener für die Delete-Buttons
  function deleteEvent(parentElement: HTMLDivElement): void {
      console.log("deleteEvent wurde aufgerufen!"); // Konsolenausgabe zum Testen des Funktionsaufrufes
      eventtable.removeChild(parentElement); //Lösche das als Parameter übergebene Element aus dem Elter-Element "display"
  }


  
  interface ConcertEvent {
    interpret: string;
    preis: number;
 }
 
 
 localStorage.setItem(preisValue: number)

  const jsonObj1 = JSON.stringify(inputInterpret);
  localStorage.setItem("inputInterpret", jsonObj1);
  const str1 = localStorage.getItem("inputInterpret");

  const parsedObj1 = JSON.parse(str1);

  console.log(parsedObj1);
  */