let tasks = [{
        "title": "قراءة كتاب",
        "date": "15/2/2022",
        "isDone": true
    },
    {
        "title": "انهاء المشروع النهائي ",
        "date": "12/3/2022",
        "isDone": false
    },
    {
        "title": "كورس الجافاسكربت",
        "date": "11/5/2022",
        "isDone": false
    }
]

function getTasksFromStorage(){
    let retrieveTasks = JSON.parse(localStorage.getItem("tasksK"))
    
    tasks = retrieveTasks ?? []

    // retrieveTasks == null ? tasks = [] :  tasks = retrieveTasks
}
getTasksFromStorage()

function fillTasks() {
    document.querySelector('.task-box').innerHTML = ''
    let index = 0
    for (let task of tasks) {
        document.querySelector('.task-box').innerHTML += `
                <div class="task ${task.isDone ? 'done' : ''}">
                    <div class="info">
                        <h3>${task.title}</h3>
                        <div class="date">
                            <i class='bx bx-calendar'></i>
                            <span>${task.date}</span>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="circular del" onclick="deleteTask(${index})"><i class='bx bxs-trash-alt'></i></button>
                        <button class="circular check ${task.isDone ? 'cancel' : ''}"  onclick = "toggleTaskDone(${index})">

                        ${task.isDone ? "<i class='bx bx-x'></i>" : "<i class='bx bx-check'></i>" }
                        
                        </button>
                        <button class="circular edit" onclick="editTask(${index})"><i class='bx bxs-edit-alt'></i></button>
                    </div>
                </div>
        `
        index++
    }
}
fillTasks()

// ====----------  Create Task ----------======
document.getElementById('add-task').addEventListener('click', () => {
    let taskName = prompt('الرجاء ادخال المهمة')
    let now = new Date()
    let date = now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear() + " | " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    let taskObj = {
        "title": taskName,
        "date": date,
        "isDone": false
    }

    // taskName = !taskName ??  tasks.push(taskObj)
    !taskName ? "" : tasks.push(taskObj)
    
    storeTask()
    fillTasks()
})

// ====----------  Delete Task ----------======
function deleteTask(index) {
    let taskT = tasks[index]
    let isConfirmed = confirm("هل انت متكد من حذف  : " + taskT.title)
    if (isConfirmed) {
        tasks.splice(index, 1)
        storeTask()
        fillTasks()
    }
}

// ====----------  Edit/Update Task ----------======
function editTask(index) {
    let task = tasks[index]
    let newTaskTitle = prompt("الرجاء تعيين اسم جديد للمهمة", task.title)
    if (newTaskTitle) {
        task.title = newTaskTitle
        storeTask()
        fillTasks()
    }
}

// ====----------  Done Task ----------======
function toggleTaskDone(index) {
    let task = tasks[index]
    task.isDone = !task.isDone
    // task.isDone ? task.isDone = false : task.isDone = true
    storeTask()
    fillTasks()
}

// ====----------  Storage Function ----------======

function storeTask(){
    let taskStr = JSON.stringify(tasks)
    localStorage.setItem("tasksK",taskStr)
}