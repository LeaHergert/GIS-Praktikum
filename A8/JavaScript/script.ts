namespace Aufgabe8 {

    interface EventElement {
        id: number;
        interpret: string;
        price: number;
        date: Date;
    }

    const pfad: string = "/concertEvents";
    const url: string = "http://localhost:3500"
    const deletPfad: string = "/delet";

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

        let interpret: string = <string>formData.get("interpret_input");
        let price: number = parseInt(<string>(formData.get("price_input")));
        let date: Date = new Date(<string>formData.get("datetime_local_input"));

        if (interpret === "") {
            console.error("interpret  is empty");
            //set inteperet red
            return;
        }
        if (isNaN(price) || price === null) {
            console.error("price is empty");
            //set inteperet red
            return;
        }
        if (isNaN(Date.parse(date.toString()))) {
            console.error("date is empty");
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
    async function deletGet(id: number) {
        let searchPara: string = "?EventID=" + id;
        await fetch(url + deletPfad + searchPara, {
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

        cell[0].className = "id_out";
        cell[1].className = "interpret_out";
        cell[2].className = "price_out";
        cell[3].className = "datetime_out";
        cell[4].className = "delet";

        cell[0].textContent = event.id + "";
        cell[1].textContent = event.interpret + "";
        cell[2].textContent = event.price + "";
        cell[3].textContent = dateConverter(new Date(event.date));
        cell[4].append(addDeletButton(event.id))

        return cell;
    }

    function addDeletButton(id: number): HTMLElement {
        let delet: HTMLElement = document.createElement("button");
        delet.dataset.id = id + "";
        delet.textContent = "X";
        delet.className = "deletButton";
        delet.setAttribute("type", "button");
        delet.addEventListener("click", function deletElement() {
            
            console.log("DeletTableEvent: [" + id + "]");
            removeEventElement(id);
            idList.delete(id);
            deletGet(id);
        })
        return delet;
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
        // ony create new events in HTML if ther is something in the DB
        events.forEach(event => {
            createElement(event);
            idList.add(event.id);
        });
        console.log("loading finished");
    }

    function removeEventElement(id: number) {
        let todoElements: HTMLCollection = document.getElementsByClassName("toDoElement")

        for (let element of todoElements) {
            let elemntData: string = ((<HTMLElement>element).dataset.id) + "";

            if (elemntData === "" + id) {
                element.remove();
                console.log("removed Event " + id + " wiht dataset of" + elemntData);
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