var empObj = [];

//-----------------------------------------TABLE PAGE FUNCTIONS-----------------------------------------
function loadTable() {
    empObj = JSON.parse(localStorage.getItem("tableData"));
    
    for(x in empObj) {
        insertNewProject(empObj[x]);
    }
}

function storeTable() {
    localStorage.setItem("tableData", JSON.stringify(empObj));
}

function resetTable() {
    var newt = document.createElement('tbody');
    var oldt = document.getElementById("projectTable").getElementsByTagName("tbody")[0];
    oldt = oldt.parentNode.replaceChild(newt, oldt);
}

function updateBudget() {
    var budget = 0;
    for(x in empObj) {
        budget += empObj[x].cost;
    }

    document.getElementById("dispBudget").innerText = "$" + budget;
}

//-----------------------------------------FORM DATA FUNCTIONS-----------------------------------------
function getFormData() {
    var project = {};

    project.name = document.getElementById("project").value;
    for (x in empObj) {
        if (empObj[x].name == project.name) {
            alert("Duplicate Project Name!");
            return null;
        }
    }
    if (project.name == "") {
        project.name = "Not Provided";
    }

    project.client = document.getElementById("client").value;

    var cost = document.getElementById("cost").value;
    cost = parseFloat(cost);
    project.cost = cost;

    return project;
}

function insertNewProject(project) {
    var table = document.getElementById("projectTable");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);
    newRow.insertCell(0).innerHTML = project.client;
    newRow.insertCell(1).innerHTML = project.name;
    newRow.insertCell(2).innerHTML = "$" + project.cost;
}

function resetForm() {
    document.getElementById("project").value="";
    document.getElementById("cost").value="";
    document.getElementById("client").value="";
}

//-----------------------------------------ONCLICK AND ON PAGE LOAD-----------------------------------------
function onAddSubmit() {
    var project = getFormData();
    if (project !== null) {
        empObj.push(project);
    }
    storeTable();
    resetForm();
}

function onClearSubmit() {
    resetForm();
}

function onResetSubmit() {
    empObj = [];
    storeTable();
}

function loadFinancePage() {
    resetTable();
    loadTable();
    updateBudget();
}