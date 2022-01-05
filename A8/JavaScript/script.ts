namespace Aufgabe8 {

    interface EventElement {
        id: number;
        interpret: string;
        price: number;
        date: Date;
    }

    const pfad: string = "/concertEvents";
    const url: string = "http://localhost:3500"
    const deletePfad: string = "/delete";

    let idList = new Set();

    //load end check if something is in the database
    load();

    let testF = document.getElementById("TEST");
    testF.addEventListener("click", test);


    let todoFrom: HTMLFormElement = <HTMLFormElement>(document.getElementById("eventsFrom"));
    todoFrom.addEventListener("submit", onSubmint);



    async function onSubmint(buttonEvent: Event) {
        buttonEvent.preventDefault();

        let id: number;
        let formData: FormData = new FormData(<HTMLFormElement>buttonEvent.currentTarget);

        //console.log(buttonEvent.currentTarget);

        let interpret: string = <string>formData.get("interpretInput");
        let price: number = parseInt(<string>(formData.get("priceInput")));
        let date: Date = new Date(<string>formData.get("datetimeLocalInput"));

        if (interpret === "") {
            console.error("Interpret fehlt");
            //set inteperet red
            return;
        }
        if (isNaN(price) || price === null) {
            console.error("Preis fehlt");
            //set inteperet red
            return;
        }
        if (isNaN(Date.parse(date.toString()))) {
            console.error("Datum fehlt");
            //set inteperet red
            return;
        }

        id = creatID(); //chekc wiht databes if id is used?

        let event: EventElement = {
            id,
            interpret,
            price,
            date
        };
        postForm(event);
        createElement(event);
    }

    function creatID(): number {
        let id: number; //-> chek if id is there   
        id = Math.floor((Math.random() * 1000));

        while (idList.has(id)) {
            id = Math.floor((Math.random() * 1000));
        }
        return id;
    }

    //fetsh post and get -> create new if id is empty if not edit current

    async function postForm(event: EventElement) {
        console.log(JSON.stringify(event));


        await fetch(url + pfad, {
            method: "post",
            body: JSON.stringify(event)
        });
    }

    async function getForm(): Promise<EventElement[]> {
        console.log("getting the Response vor get Form");

        let events: EventElement[];
        let response: Response;
        try {
            response = await fetch(url + pfad, { method: "get" });
            console.log(response);
            console.log(await response.text());
            events = JSON.parse(await response.text());

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }

        console.log("ENDE?");
        return events;
    }
    async function deleteGet(id: number) {
        let searchPara: string = "?EventID=" + id;
        await fetch(url + deletePfad + searchPara, {
            method: "get"
        });
    }
    function createElement(event: EventElement) {
        let tableWrapper: HTMLElement = document.getElementById("toDoOUT");
        console.log("found tableWrapper" + tableWrapper);

        let table: HTMLElement = document.createElement("table");
        let tbody: HTMLElement = document.createElement("tbody");

        let row: HTMLTableRowElement = addRow();
        let cell: HTMLTableCellElement[] = addCell(event);

        table.className = "toDoElement";
        table.dataset.id = event.id + "";

        cell.forEach(element => {
            row.appendChild(element);
        });

        tbody.append(row);
        table.append(tbody);
        tableWrapper.append(table);

    }

    function addRow(): HTMLTableRowElement {
        let row: HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
        row.className = "EventElement";
        return row;
    }

    function addCell(event: EventElement): HTMLTableCellElement[] {
        let cell: HTMLTableCellElement[] = new Array<HTMLTableCellElement>(5);



        for (let i: number = 0; i < 5; i++) {
            cell[i] = <HTMLTableCellElement>document.createElement("td");
        }
        cell[0].className = "idOut";
        cell[1].className = "interpretOut";
        cell[2].className = "preisOut";
        cell[3].className = "datumZeitOut";
        cell[4].className = "delete";

        cell[0].textContent = event.id + "";
        cell[1].textContent = event.interpret + "";
        cell[2].textContent = event.price + "";
        cell[3].textContent = dateConverter(event.date);
        cell[4].append(addDeleteButton(event.id));

        return cell;
    }

    function addDeleteButton(id: number): HTMLElement {
        let delete: HTMLElement = document.createElement("button");
        delete.dataset.id = id + "";
        delete.textContent = "X";
        delete.className = "deleteButton";
        delete.setAttribute("type", "button");
        delete.addEventListener("click", function deleteElement()) {
            //add functionality
            console.log("DeleteTableEvent: [" + id + "]");
            removeEventElement(id);
            idList.delete(id);
            deleteGet(id);
        }
        return delete;
    }

    function dateConverter(date: Date): string {
        return date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }

    async function load() {
        let events: EventElement[] = new Array<EventElement>();
        try {
            events = await getForm();

        } catch (error) {
            console.log("Keine Events gefunden");
            return;
        }
        // ony create new events in HTML if ther is something in the DB
        events.forEach(event => {
            createElement(event);
            idList.add(event.id);
        });
        console.log("Fertig geladen");

    }

    function removeEventElement(id: number) {
        let todoElements: HTMLCollection = document.getElementsByClassName("toDoElement")

        for (let element of todoElements) {
            let elemntData: string = ((<HTMLElement>element).dataset.id) + "";

            if (elemntData === "" + id) {
                element.remove();
                console.log("removed Event " + id + " with dataset of" + elemntData);
            }

        }
    }

    function test(): void {
        idList.add(creatID());
        idList.add(creatID());
        idList.add(creatID());
        idList.add(creatID());

        console.log(idList);
    };
    document.getElementById("TESTDIV").hidden = true;
}