var empObj = [];
var budget = null;
var remaining = null;

function loadTable() {
    empObj = JSON.parse(sessionStorage.getItem("tableData"));
    
    for(x in empObj) {
        insertNewProject(empObj[x]);
    }
}

function storeTable() {
    sessionStorage.setItem("tableData", JSON.stringify(empObj));
}

function resetForm() {
    document.getElementById("project").value="";
    document.getElementById("cost").value="";
    document.getElementById("budget").value="";
}

function getFormData() {
    var project = {};
    project.name = document.getElementById("project").value;
    if (project.name == "") {
        project.name = "Unknown";
    }
    var cost = document.getElementById("cost").value;
    cost = parseFloat(cost);
    project.cost = cost;
    return project;
}

function insertNewProject(project) {
    var table = document.getElementById("projectTable");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);
    newRow.insertCell(0).innerHTML = project.name;
    newRow.insertCell(1).innerHTML = project.cost;
}

function updateBudget() {
    remaining = budget;
    for(x in empObj) {
        remaining -= empObj[x].cost;
    }

    document.getElementById("dispBudget").innerText = "$" + budget;
    document.getElementById("remBudget").innerText = "$" + remaining;
}

function onFormSubmit() {
    var project = getFormData();
    insertNewProject(project);
    empObj.push(project);
    updateBudget();
    resetForm();
}

function onBudgetPress() {
    budget = parseInt(document.getElementById("budget").value);
    if (budget == NaN) {
        budget = 0;
    }
    updateBudget();
    resetForm();
}