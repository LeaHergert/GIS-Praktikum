"use strict";
var Aufgabe8;
(function (Aufgabe8) {
    const pfad = "/concertEvents";
    const url = "http://localhost:3500";
    const loeschPfad = "/loesch";
    let idList = new Set();
    load();
    let testF = document.getElementById("TEST");
    testF.addEventListener("click", test);
    let todoFrom = (document.getElementById("eventsForm"));
    todoFrom.addEventListener("submit", onSubmit);
    async function onSubmit(buttonEvent) {
        buttonEvent.preventDefault();
        let id;
        let formData = new FormData(buttonEvent.currentTarget);
        let interpret = formData.get("interpret_input");
        let price = parseInt((formData.get("priceInput")));
        let date = new Date(formData.get("datetimelocalInput"));
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
        let event = {
            id,
            interpret,
            price,
            date
        };
        postForm(event);
        createElement(event);
    }
    function createID() {
        let id;
        id = Math.floor((Math.random() * 100));
        while (idList.has(id)) {
            id = Math.floor((Math.random() * 100));
        }
        return id;
    }
    async function postForm(event) {
        console.log(JSON.stringify(event));
        await fetch(url + pfad, {
            method: "post",
            body: JSON.stringify(event),
        });
    }
    async function getForm() {
        console.log("getting the Response for get Form");
        let events;
        try {
            let response = await fetch(url + pfad, { method: "get" });
            let text = await response.text();
            events = JSON.parse(text);
        }
        catch (error) {
            console.error("server Offline");
            console.log(error);
            throw new Error(error);
        }
        return events;
    }
    async function loeschGet(id) {
        let searchPara = "?EventID=" + id;
        await fetch(url + loeschPfad + searchPara, {
            method: "get",
        });
    }
    function createElement(event) {
        let tableWrapper = document.getElementById("toDoOUT");
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let row = addRow();
        let cell = addCell(event);
        table.className = "toDoElement";
        table.dataset.id = event.id + "";
        cell.forEach(element => {
            row.appendChild(element);
        });
        tbody.append(row);
        table.append(tbody);
        tableWrapper.append(table);
    }
    function addRow() {
        let row = document.createElement("tr");
        row.className = "EventElement";
        return row;
    }
    function addCell(event) {
        let cell = new Array(5);
        for (let i = 0; i < 5; i++) {
            cell[i] = document.createElement("td");
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
        cell[4].append(addloeschButton(event.id));
        return cell;
    }
    function addloeschButton(id) {
        let loesch = document.createElement("button");
        loesch.dataset.id = id + "";
        loesch.textContent = "X";
        loesch.className = "loeschButton";
        loesch.setAttribute("type", "button");
        loesch.addEventListener("click", function loeschElement() {
            console.log("loeschTableEvent: [" + id + "]");
            removeEventElement(id);
            idList.delete(id);
            loeschGet(id);
        });
        return loesch;
    }
    function dateConverter(date) {
        return date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }
    async function load() {
        let events = new Array();
        try {
            events = await getForm();
            console.log("events found: " + events);
        }
        catch (error) {
            console.log("no events found");
            return;
        }
        events.forEach(event => {
            createElement(event);
            idList.add(event.id);
        });
        console.log("loading finished");
    }
    function removeEventElement(id) {
        let todoElements = document.getElementsByClassName("toDoElement");
        for (let element of todoElements) {
            let elementData = (element.dataset.id) + "";
            if (elementData === "" + id) {
                element.remove();
                console.log("removed Event " + id + " with dataset of" + elementData);
            }
        }
    }
    function test() {
        idList.add(createID());
        idList.add(createID());
        idList.add(createID());
        idList.add(createID());
        console.log(idList);
    }
    ;
    document.getElementById("TESTID");
})(Aufgabe8 || (Aufgabe8 = {}));
//# sourceMappingURL=client.js.map