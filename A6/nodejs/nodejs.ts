import * as http from "http";

const hostname: string = 'localhost';
const port: number = 3500;

const server: http.Server = http.createServer(
    async (request: http.IncomingMessage, response: http.ServerResponse) => {

        response.statusCode = 200;
        response.setHeader("Access-Control-Allow-Origin", "*"); 
        response.setHeader("Content-Type", "application/json");

        let url: URL = new URL(request.url || "", `http://${request.headers.host}`); 

        if (url.pathname === "/") {
            response.write("Der Server ist erreichbar");

        } else if (request.method === "POST") {
            let input = "";
            let date: Date;
            let output = "";
            request.on("data", (data) => {
                input += data;
            })

            request.on("end", () => {
                date = new Date(JSON.parse(input));
                console.log(date);
                output = "Day: " + date.getDay() + ",";
                output += "Month: " + date.getMonth() + ",";
                output += "Year: " + date.getFullYear();
                console.log(output);
            })
            
            console.log("TEST");
            response.write(output);

        } else if (request.method === "GET") {

            let output: string = await convertDate(JSON.parse(url.searchParams.get("a")));
            console.log(output);
            response.write(output);

        }
        else {
            response.statusCode = 404;
        }
        response.end();
    }
);
async function convertDate(dateS: string): Promise<string> {


    let date: Date = new Date(dateS);

    let output = "";
    output += "Day: " + date.getDay() + ",";
    output += "Month: " + date.getMonth() + ",";
    output += "Year: " + date.getFullYear();

    return output;
}

server.listen(port, hostname, (): void => {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});