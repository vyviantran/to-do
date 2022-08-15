class Task {
    constructor(name, dueDate, priority, isComplete) { //dont pass isComplete
        this.name = name;   //task name, string
        this.dueDate = dueDate; //string 'yyyy-mm-dd'
        this.priority = priority; //integer 1-3, 1 is highest priority
        this.isComplete = false; //boolean initializes as false and changes to true when user checks box
    }

    toString() {
        return this.name + ',' + this.dueDate + ',' + this.priority;
    }
}

let tasks = [];

function newTask(name_, dueDate_, priority_) {
    let warning = document.querySelector('#warning')
    if (name_ === '') {
        warning.innerHTML = 'Enter a task name.';
    } else {
        let newTask = new Task(name_, dueDate_, priority_, false)
        // user input matches a task in the array
        for (let i=0; i<tasks.length; i++) {
            if (newTask.toString() === tasks[i].toString()) {
                warning.innerHTML = 'Task already in list.';
                return;
            }
        }
        warning.innerHTML = ''
        tasks.push(newTask);
        // check whether all input fields match a task already in the array
    }

}

function listRefresh() {

    let taskList = document.getElementById('task-list');
    let tasks_ = document.querySelectorAll('#task-list li');
    for (let i=0; i<tasks_.length; i++) {
         taskList.removeChild(tasks_[i]);
    }

    // add items from tasks
    for (let i=0; i<tasks.length; i++) {
        let newListItem = document.createElement('li');
        if (tasks[i].isComplete) {
            newListItem.innerHTML = '<input type="checkbox" checked> ' + tasks[i].toString();
            newListItem.textDecoration = 'line-through';
        } else {
            newListItem.innerHTML = '<input type="checkbox"> ' + tasks[i].toString();
            newListItem.textDecoration = 'none';
        }
        newListItem.addEventListener('change', changeStatus);
        document.querySelector('#task-list').appendChild(newListItem);
    }
}


//Removes the line item clicked in the table
function changeStatus(e){

    //iterate through tasks
    for (let i = 0; i < tasks.length; i++) {
        // whichever item is clicked is removed from array
        let listItemTask = e.currentTarget.innerHTML.substring(0, 32);
        if (listItemTask === '<input type="checkbox" checked> ') {
            listItemTask = e.currentTarget.innerHTML.substring(32);
        } else {
            listItemTask = e.currentTarget.innerHTML.substring(24);
        }
        if (listItemTask === tasks[i].toString()) {
            if (tasks[i].isComplete) {
                tasks[i].isComplete = false;
                e.currentTarget.style.textDecoration = 'none'; 
            } 
            else {
                tasks[i].isComplete = true;
                e.currentTarget.style.textDecoration = 'line-through';
            }
        }
    }
    sortTasks(tasks);
    console.log(tasks);
    
}

function addTask() {
    let name_ = document.querySelector('#task-name').value;
    let date_ = document.querySelector('#due-date').value;
    let priority_ = document.querySelector('#priority').value;
    
    newTask(name_, date_, priority_, false);
    sortTasks(tasks);
    listRefresh();
    fieldReset();
    console.log(tasks);
}

function fieldReset() {
    document.querySelector('#task-name').value = '';
    document.querySelector('#due-date').value = '';
    document.querySelector('#priority').value = 3;
}

/* sort tasks */
function compareCompletion(task1, task2) {
    if (task1.isComplete < task2.isComplete) {  //task1 is incomplete and task2 is complete
        return -1;                              //task1 sorted before task2
    } 
    if (task1.isComplete > task2.isComplete) {  //task1 is incomplete and task2 is complete
        return 1;                               //task1 sorted after task2
    }
    return 0;    

}

function comparePriority(task1, task2) {
    if (task1.priority < task2.priority) {      //task1 higher priority
        return -1;                              //task1 sorted before task2
    }
    if (task1.priority > task2.priority) {      //task1 lower priority
        return 1;                               //task1 sorted after task2
    }
    return 0;                                   //same priority, keep original order
}

function compareDueDate(task1, task2) {
    if (task1.dueDate < task2.dueDate) {        //task1 due sooner
        return -1;                              //task1 sorted before task2
    }
    if (task1.dueDate > task2.dueDate) {        //task1 due later
        return 1;                               //task1 sorted after task2
    }   
    return 0;                                   //same due date, keep original order
}

function compareName(task1, task2) {
    if (task1.name < task2.name) {              //task1 lexicographically before task2
        return -1;                              //task1 sorted before task2
    }
    if (task1.dueDate > task2.dueDate) {        //task1 lexicographically before later
        return 1;                               //task1 sorted after task2
    }   
    return 0;                                   //same name, keep original order
}

function sortTasks(tasks_) {
    tasks_.sort(compareName);       //name is lowest level of sort order
    tasks_.sort(compareDueDate);
    tasks_.sort(comparePriority);   
    tasks_.sort(compareCompletion);   //completion is highest level of sort order
}
/**/