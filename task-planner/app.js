const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 8000;
const basepath = `http:localhost:${port}`;

function findTaskIndex(taskId, tasks) {
    for (i in tasks) {
        if (tasks[i].taskId == taskId) {
            return i;
        }
    }
    return -1;
}

function removeTask(index, tasks) {
    return [...tasks.slice(0, index), ...tasks.slice(index + 1, tasks.length)];
}

let server = http.createServer((req, res) => {
    let myUrl = new url.URL(basepath + req.url)
    if(req.url == "/favicon.ico") {
        res.end();
    }
    console.log(req.url)
    if (myUrl.pathname == "/") {

        let jsonData = JSON.parse(fs.readFileSync("tasks.json").toString());

        if (myUrl.searchParams.get("deleteId")) {
            let deleteId = myUrl.searchParams.get("deleteId");
            jsonData = removeTask(findTaskIndex(deleteId, jsonData), jsonData);
            fs.writeFileSync("tasks.json", JSON.stringify(jsonData, null, 2));
        }

        if (myUrl.searchParams.get("taskId")) {
            let taskId = myUrl.searchParams.get("taskId");
            let employeeId = myUrl.searchParams.get("employeeId");
            let task = myUrl.searchParams.get("task");
            let deadline = myUrl.searchParams.get("deadline");
            if (findTaskIndex(taskId, jsonData) == -1) {
                jsonData.push({
                    "taskId": taskId,
                    "employeeId": employeeId,
                    "task": task,
                    "deadline": deadline
                })
                fs.writeFileSync("tasks.json", JSON.stringify(jsonData, null, 2));
            }
        }


        let displayHTML1 = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Task Planner</title>
        </head>
        
        <body>
            <h1>Task Planner</h1>
            <div>
                <ul>
                    <a href="/store">
                        <li>Add task</li>
                    </a>
                    <a href="/delete">
                        <li>Delete task</li>
                    </a>
                </ul>
            </div>
            <table rules=all>
                <tr>
                    <th>Task ID</th>
                    <th>Employee ID</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </tr>`;
        let displayHTML2 = `
        </table>
    </body>
    
    </html>`;
        let tableHTML = "";
        for (task of jsonData) {
            tableHTML += `        <tr>
            <td>${task.taskId}</td>
            <td>${task.employeeId}</td>
            <td>${task.task}</td>
            <td>${task.deadline}</td>
        </tr>
        `;
        }


        res.write(displayHTML1 + tableHTML + displayHTML2);

    } else if (myUrl.pathname == "/store") {

        let storeHTML = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add Task</title>
        </head>
        
        <body>
            <h1>Add Task</h1>
            <form method=GET action="/">
                <label>Task ID</label>
                <input type=number name=taskId required /><br />
                <label>Employee ID</label>
                <input type=number name=employeeId required /><br />
                <label>Task</label>
                <textarea name=task required></textarea><br />
                <label>Deadline</label>
                <input type=date name=deadline required /><br />
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>
        </body>
        
        </html>`;

        res.write(storeHTML);

    } else if (myUrl.pathname == "/delete") {

        let deleteHTML = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Delete Task</title>
        </head>
        
        <body>
            <h1>Delete Task</h1>
            <form action="/">
                <label>Task ID</label>
                <input name="deleteId" />
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>
        </body>
        
        </html>`;

        res.write(deleteHTML);

    }

    res.end();
})

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});