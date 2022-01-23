//namespace Aufgabe8{} <-- nor in namespace to have one node_modulesFolder

import * as http from "http";
import * as mongo from "mongodb";


const hostname: string = "127.0.0.1"; // localhost
const port: number = 3500;

const pfad: string = "/concertEvents";
const pfadDelete: string = pfad + "/delete";
const mongoUrl: string = "mongodb://localhost:27017"; // locale MongoDB

const dbCollection: string = "eventNode";
const db: string = "Events"

let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl); //mongo Client 

const server: http.Server = http.createServer(
    async (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.statusCode = 200;
        response.setHeader("Access-Control-Allow-Origin", "*");

        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
        console.log( "Pathrequest: " + url.pathname);
        switch (url.pathname) {
            case pfad: {
                // just pleas dont crash the server!
                try {
                    console.log("connecting to DB...");
                    const client = await mongoClient.connect();
                    if (!client) {
                        console.log("fetching the Database...");
                        mongoClient.db(db);
                    }
                } catch (error) {
                    console.error( "connection time out with DB");
                    response.statusCode = 404;
                    return;
                } finally {
                    mongoClient.close();
                }

                console.log("Request: " + request.method);

                switch (request.method) {
                    case "Get":
                        try {
                            console.log(   "Fetching the DB Collection...");
                            await mongoClient.connect();
                            let text = await dbGet()
                            response.setHeader("Content-Type", "application/json");
                            response.write(text);
                            console.log("Sending: " + text);

                        } catch (error) {
                            console.error( error);
                        } finally {
                            mongoClient.close();
                        }
                        break;

                    case "Post":
                        let input: string;
                        request.on("data", (data) => {
                            input += data;
                        })
                        try {
                            request.on("end", async () => {
                                input = input.replace("Is currently undefined", "");
                                console.log("Data: " + input);
                                console.log("Sending...");
                                await mongoClient.connect();
                                await dbSet(input);
                            });


                        } catch (error) {
                            console.error( error);
                        } finally {
                            mongoClient.close();
                        }
                        break;
                }
                break;
            }
            case pfadDelete:
                let eventID: number = Number(url.searchParams.get("eventID"));
                console.log("Request to delete one elment ID: " + eventID);

                break;
            default:
                response.statusCode = 404;
        }


    });



async function dbGet(): Promise<string> {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find()
        .toArray();
    console.log( "got the data");
    console.log( result);
    return JSON.stringify(result);
}

async function dbSet(event: string) {
    console.log( "send Data:" + JSON.parse(event) + +" " + (JSON.parse(event).id));
    mongoClient.db(db).collection(dbCollection).insertOne(JSON.parse(event));
    console.log("Data recived");
}

server.listen(port, hostname, () => {
    console.clear();
    console.log(`Server running at http://${hostname}:${port}/`);
});

