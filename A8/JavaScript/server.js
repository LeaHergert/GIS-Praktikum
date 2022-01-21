"use strict";
//namespace Aufgabe8{} <-- nor in namespace to have one node_modulesFolder
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongo = require("mongodb");
const hostname = "127.0.0.1"; // localhost
const port = 3500;
const pfad = "/concertEvents";
const pfadDelete = pfad + "/delete";
const mongoUrl = "mongodb://localhost:27017"; // locale MongoDB
const dbCollection = "eventNode";
const db = "Events";
let mongoClient = new mongo.MongoClient(mongoUrl); //mongo Client 
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*");
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    console.log("\x1b[33m", "the rquest path: " + url.pathname);
    switch (url.pathname) {
        case pfad: {
            // just pleas dont crash the server!
            try {
                console.log("\x1b[33m", "connecting to DB...");
                const client = await mongoClient.connect();
                if (!client) {
                    console.log("\x1b[33m", "fetshing the Database...");
                    mongoClient.db(db);
                }
            }
            catch (error) {
                console.error("\x1b[31m", "connection time out with DB");
                console.log("\x1b[0m");
                response.statusCode = 404;
                return;
            }
            finally {
                mongoClient.close();
            }
            console.log("\x1b[32m", "this is the request: " + request.method);
            switch (request.method) {
                case "GET":
                    try {
                        console.log("\x1b[33m", "fetshing the DatabaseCollection...");
                        await mongoClient.connect();
                        let text = await dbGet();
                        response.setHeader("Content-Type", "application/json");
                        response.write(text);
                        console.log("\x1b[33m", "sending to client: " + text);
                    }
                    catch (error) {
                        console.error("\x1b[31m", error);
                    }
                    finally {
                        mongoClient.close();
                    }
                    break;
                case "POST":
                    let input;
                    request.on("data", (data) => {
                        input += data;
                    });
                    try {
                        request.on("end", async () => {
                            input = input.replace("undefined", ""); // the Stringfy has an undifnied in front?
                            console.log("\x1b[33m", "Data: " + input);
                            console.log("\x1b[33m", "sending Data...");
                            await mongoClient.connect();
                            await dbSet(input);
                        });
                    }
                    catch (error) {
                        console.error("\x1b[31m", error);
                    }
                    finally {
                        mongoClient.close();
                    }
                    break;
            }
            break;
        }
        case pfadDelete:
            let eventID = Number(url.searchParams.get("eventID"));
            console.log("\x1b[33m", "request to delete an elment ID: " + eventID);
            break;
        default:
            response.statusCode = 404;
    }
});
async function dbGet() {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find()
        .toArray();
    console.log("\x1b[32m", "got the data");
    console.log("\x1b[32m", result);
    return JSON.stringify(result);
}
async function dbSet(event) {
    console.log("\x1b[33m", "send Data:" + JSON.parse(event) + +" " + (JSON.parse(event).id));
    mongoClient.db(db).collection(dbCollection).insertOne(JSON.parse(event));
    console.log("\x1b[32m", "Data recived");
}
server.listen(port, hostname, () => {
    console.clear();
    console.log("\x1b[32m", `Server running at http://${hostname}:${port}/`);
});
/*
Coler code
"\x1b[31m" red
"\x1b[32m" green
"\x1b[33m" yellow

*/ 
//# sourceMappingURL=server.js.map