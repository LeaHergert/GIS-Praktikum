namespace Aufgabe8 {

    interface EventElement {
        id: number;
        interpret: string;
        price: number;
        date: Date;
    }

    const pfad: string = "/concertEvents";
    const url: string = "http://localhost:3500"
    const loeschPfad: string = "/loesch";

    let idList = new Set();

    load();
    let testF = document.getElementById("TEST");
    testF.addEventListener("click", test);


    let todoFrom: HTMLFormElement = <HTMLFormElement>(document.getElementById("eventsForm"));
    todoFrom.addEventListener("submit", onSubmit);


    async function onSubmit(buttonEvent: Event) {
        buttonEvent.preventDefault();

        let id: number;
        let formData: FormData = new FormData(<HTMLFormElement>buttonEvent.currentTarget);


        let interpret: string = <string>formData.get("interpret_input");
        let price: number = parseInt(<string>(formData.get("priceInput")));
        let date: Date = new Date(<string>formData.get("datetimelocalInput"));

        if (interpret === "") {
            console.error("interpret  is empty");
            
            return;
        }
        if (price === null) {
            console.error("price is empty");
            return;
        }
        if (isNaN(Date.parse(date.toString()))) {
            console.error("date is empty");
           
            return;
        }

        id = createID(); 

        let event: EventElement = {
            id,
            interpret,
            price,
            date
        };
        postForm(event);
        createElement(event);
    }

    function createID(): number {
        let id: number;
        id = Math.floor((Math.random() * 100));

        while (idList.has(id)) {
            id = Math.floor((Math.random() * 100));
        }
        return id;
    }

    

    async function postForm(event: EventElement) {
        console.log(JSON.stringify(event));
        await fetch(url + pfad, {
            method: "post",
            body: JSON.stringify(event),
        });
    }

    async function getForm(): Promise<EventElement[]> {
        console.log("getting the Response for get Form");
        let events: EventElement[];
        try {
            let response: Response = await fetch(url + pfad, { method: "get" });
            let text = await response.text()
            events = JSON.parse(text);

        } catch (error) {
            console.error("server Offline");
            console.log(error);
            throw new Error(error);
        }

        return events;
    }
    async function loeschGet(id: number) {
        let searchPara: string = "?EventID=" + id;
        await fetch(url + loeschPfad + searchPara, {
            method: "get",
        });
    }
    function createElement(event: EventElement) {
        let tableWrapper: HTMLElement = document.getElementById("toDoOUT");

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
        cell[2].className = "priceOut";
        cell[3].className = "datetimeOut";
        cell[4].className = "delete";

        cell[0].textContent = event.id + "";
        cell[1].textContent = event.interpret + "";
        cell[2].textContent = event.price + "";
        cell[3].textContent = dateConverter(new Date(event.date));
        cell[4].append(addloeschButton(event.id))

        return cell;
    }

    function addloeschButton(id: number): HTMLElement {
        let loesch: HTMLElement = document.createElement("button");
        loesch.dataset.id = id + "";
        loesch.textContent = "X";
        loesch.className = "loeschButton";
        loesch.setAttribute("type", "button");
        loesch.addEventListener("click", function loeschElement() {
            
            console.log("loeschTableEvent: [" + id + "]");
            removeEventElement(id);
            idList.delete(id);
            loeschGet(id);
        })
        return loesch;
    }

    function dateConverter(date: Date): string {
        return date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }

    async function load() {
        let events: EventElement[] = new Array<EventElement>();
        try {
            events = await getForm();
            console.log("events found: " + events);

        } catch (error) {
            console.log("no events found");
            return;
        }
        
        events.forEach(event => {
            createElement(event);
            idList.add(event.id);
        });
        console.log("loading finished");
    }

    function removeEventElement(id: number) {
        let todoElements: HTMLCollection = document.getElementsByClassName("toDoElement")

        for (let element of todoElements) {
            let elementData: string = ((<HTMLElement>element).dataset.id) + "";

            if (elementData === "" + id) {
                element.remove();
                console.log("removed Event " + id + " with dataset of" + elementData);
            }

        }
    }

    function test(): void {
        idList.add(createID());
        idList.add(createID());
        idList.add(createID());
        idList.add(createID());

        console.log(idList);
    };
    document.getElementById("TESTID");
}