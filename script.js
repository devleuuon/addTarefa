//seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

let oldInputValue;

//Funções
const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo"); //add class do botão.

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text; //text é o value do evento abaixo.
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    todoInput.value = "" //Apaga o teto do input quando envia.
    todoInput.focus(); //deixa cursor posicionado para digitar.

};

const toggleForms = () => {
    // editForm.classList.toggle("hide") //ao clique esconde formulario de edição.
    todoForm.classList.toggle("hide") //esconde input do value.
    todoList.classList.toggle("hide") //esconde lista de tarefa.
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3")

    console.log(todoTitle, text)

    if(todoTitle.innerText === oldInputValue) {
        todoTitle.innerText = text;
    }
    })
}
//Eventos

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue); //chamando uma função acima.
    }
});

document.addEventListener("click", (e) => {
    const targetElement = e.target; //target detecta o botão que foi clicado.
    const parentElement = targetElement.closest("div") //closest retorna o valor mais próximo em relação ao elemento atual.
    let todoTitle; //escopo da função.

    if (parentElement && parentElement.querySelector("h3")) {
        todoTitle = parentElement.querySelector("h3").innerText;
    }
    if (targetElement.classList.contains("finish-todo")){ //contains===contém.
        parentElement.classList.toggle("done"); //toggle altera o visual do botão "selecionado/não selecionado"
    }

    if (targetElement.classList.contains("remove-todo")){
        parentElement.remove()
    }

    if (targetElement.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle
    oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
})
