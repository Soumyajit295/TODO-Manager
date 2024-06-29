const todoBtn = document.querySelector('#todoBtn');
const completedBtn = document.querySelector('#completedBtn');
const addTodoBtn = document.querySelector('#add');
const todoContainer = document.querySelector('.todoBucket');

let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let completedTodoList = JSON.parse(localStorage.getItem('completedTodo')) || [];

todoBtn.addEventListener('click', () => {
    todoBtn.style.backgroundColor = '#0BDA51';
    completedBtn.style.backgroundColor = 'rgb(15 23 42)';
    renderTodoList();
});

completedBtn.addEventListener('click', () => {
    todoBtn.style.backgroundColor = 'rgb(15 23 42)';
    completedBtn.style.backgroundColor = '#0BDA51';
    renderCompletedList();
});

addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let title = document.querySelector('#todoTitle');
    let description = document.querySelector('#todoDescription');
    let uniqueID = Date.now().toString(36) + Math.random().toString(36).substring(2);

    if(title.value == '' || description.value == ''){
        alert('Enter your task !')
    }

    else{
        let newTaskObject = {
            title: title.value,
            description: description.value,
            id: uniqueID
        };
    
        todoList.push(newTaskObject);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        title.value = '';
        description.value = '';
    
        renderTodoList();
    }
});

function deleteTodoItem(id){
    const filteredTodoList = todoList.filter((todo) => todo.id !== id);
    todoList = filteredTodoList;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodoList();
}

function editTodoItem(id){
    const particularTodo = todoList.filter((todo) => todo.id === id);
    let titleInput = document.querySelector('#todoTitle');
    let descriptionInput = document.querySelector('#todoDescription');

    titleInput.value = particularTodo[0].title;
    descriptionInput.value = particularTodo[0].description;

    let updateChanges = document.querySelector('#updateChanges');

    updateChanges.addEventListener('click', (e) => {
        e.preventDefault();
        let todoIndex = todoList.findIndex((todo) => todo.id === id);
        if (todoIndex == -1) {
            alert('Add the todo');
        } else {
            let newTitle = titleInput.value;
            let newDescription = descriptionInput.value;

            let editedObj = {
                title: newTitle,
                description: newDescription,
                id: id
            };

            todoList[todoIndex] = editedObj;
            localStorage.setItem('todoList', JSON.stringify(todoList));
            titleInput.value = '';
            descriptionInput.value = '';
        }
        renderTodoList();
    });
}

function completeTodoItem(id){
    let index = todoList.findIndex((todo) => todo.id === id);
    completedTodoList.push(todoList[index]);
    deleteTodoItem(id);
    localStorage.setItem('completedTodo', JSON.stringify(completedTodoList));
}

function deleteCompletedTodo(id){
    let filteredTodo = completedTodoList.filter((todo)=>{
        return todo.id !== id
    })
    completedTodoList = filteredTodo
    localStorage.setItem('completedTodo',JSON.stringify(completedTodoList))
    renderCompletedList()
}

function renderCompletedList(){
    todoContainer.innerHTML = '';
    
    completedTodoList.forEach((todo) => {
        const listArea = document.createElement('div');
        listArea.classList.add('listArea');
        listArea.dataset.id = todo.id;

        const todoDetails = document.createElement('div');
        todoDetails.classList.add('todoDetails');

        const p1 = document.createElement('p');
        p1.classList.add('title');
        const p2 = document.createElement('p');
        p2.classList.add('description');

        p1.innerText = todo.title;
        p2.innerText = todo.description;

        todoDetails.appendChild(p1);
        todoDetails.appendChild(p2);

        const todoButtons = document.createElement('div');
        todoButtons.classList.add('todoButtons');

        const b1 = document.createElement('i');
        b1.classList.add('fa-solid', 'fa-trash', 'trash');
        todoButtons.appendChild(b1);

        b1.addEventListener('click',(e)=>{
            let mainParentId = e.target.parentNode.parentNode.dataset.id;
            deleteCompletedTodo(mainParentId)
        })
        listArea.appendChild(todoDetails);
        listArea.appendChild(todoButtons)

        todoContainer.appendChild(listArea); 
    });
}

function renderTodoList(){
    todoContainer.innerHTML = '';

    todoList.forEach((todo) => {
        const listArea = document.createElement('div');
        listArea.classList.add('listArea');
        listArea.dataset.id = todo.id;

        const todoDetails = document.createElement('div');
        todoDetails.classList.add('todoDetails');

        const p1 = document.createElement('p');
        p1.classList.add('title');
        const p2 = document.createElement('p');
        p2.classList.add('description');

        p1.innerText = todo.title;
        p2.innerText = todo.description;

        todoDetails.appendChild(p1);
        todoDetails.appendChild(p2);

        listArea.appendChild(todoDetails);

        const todoButtons = document.createElement('div');
        todoButtons.classList.add('todoButtons');
        const b1 = document.createElement('i');
        const b2 = document.createElement('i');
        const b3 = document.createElement('i');
        b1.classList.add('fa-solid', 'fa-trash', 'trash');
        b2.classList.add('fa-solid', 'fa-pen-to-square', 'edit');
        b3.classList.add('fa-solid', 'fa-check', 'complete');
        todoButtons.appendChild(b1);
        todoButtons.appendChild(b2);
        todoButtons.appendChild(b3);

        b1.addEventListener('click', (e) => {
            let mainParentId = e.target.parentNode.parentNode.dataset.id;
            deleteTodoItem(mainParentId);
        });
        b2.addEventListener('click', (e) => {
            let mainParentId = e.target.parentNode.parentNode.dataset.id;
            editTodoItem(mainParentId);
        });
        b3.addEventListener('click', (e) => {
            let mainParentId = e.target.parentNode.parentNode.dataset.id;
            completeTodoItem(mainParentId);
        });

        listArea.appendChild(todoButtons);
        todoContainer.appendChild(listArea); 
    });
}

renderTodoList();
