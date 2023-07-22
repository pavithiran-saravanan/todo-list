import Comp from './ui-components-sidebar';
import editIcon from './icons/edit-icon-round.svg';
import removIcon from './icons/remove-icon-solid.svg';
import tickIcon from './icons/tick-icon.svg';
import format from 'date-fns/format';
import { myApp } from '.';
import { addEventListernersToMenuItems, addEventListernersToProjectItems, displayTodos } from './dom-handler';
import { createPriority } from './priority';
import Todo from './todo';

export default function getTodoItem(todo, id, projectId){
    const element = new Comp('div', {classList: ['todo-item']}).render(); element.setAttribute('data-index', todo.id); element.setAttribute('data-project-id', projectId);
    const elementMain = new Comp('div', {classList: ['todo-item-main']}).render();
    element.append(elementMain);

    elementMain.append(new Comp('img', {classList: ['tick'], src: tickIcon, width: 20}).render());
    elementMain.append(new Comp('div', {classList: ['todo-title'], textContent: todo.title}).render());
    const dataContainer = new Comp('div', {classList: ['data-container']}).render();
    const buttonsContainer = new Comp('div', {classList: ['buttons-container']}).render();
    dataContainer.append(getPriorityElement(todo.priority), getDateElement(todo.dueDate));
    buttonsContainer.append(getEditButton(), getRemoveButton());
    elementMain.append(dataContainer, buttonsContainer);

    // Add tick handler
    const tick = element.querySelector('.tick');
    tick.addEventListener('click', e=>{
        tick.classList.toggle('checked');
        element.querySelector('.todo-title').classList.toggle('strike');
        dataContainer.classList.toggle('ghost'); element.querySelector('.edit-button').classList.toggle('ghost'); 

        const desc = element.querySelector('.description-container');
        if(desc) desc.classList.toggle('ghost');
        e.stopPropagation();

        // Toggle completion status
        const projectId = element.getAttribute('data-project-id');
        const id = element.getAttribute('data-index');
        myApp.projects[projectId].todos[id].toggleCompletion();
    });

    if(todo.completed){
        tick.classList.toggle('checked');
        element.querySelector('.todo-title').classList.toggle('strike');
        dataContainer.classList.toggle('ghost'); element.querySelector('.edit-button').classList.toggle('ghost'); 
    }

    // Add click event handler to todo item
    element.addEventListener('click', e=>{
        if(!element.classList.contains('view')){
            if(element.classList.contains('edit')) return;
            element.classList.add('view');
            // Logic to add description to todo item
            const container = new Comp('div', {classList: ['description-container']}).render();
            if(tick.classList.contains('checked')) container.classList.add('ghost');
            element.append(container);
            container.append(
                new Comp('div', {classList: ['description-title'], textContent: 'Description:'}).render(),
                new Comp('div', {classList: ['description-body'], textContent: todo.desc}).render()
            )
        }
        else{
            element.classList.remove('view');
            element.querySelector('.description-container').remove();
        }
    });

    return element;
}

function getDateElement(dueDate){
    const container = new Comp('div', {classList: ['date-container']}).render();
    container.append( new Comp('div', {classList: ['date-text'], textContent: format(dueDate, 'dd-MM-yyyy')}).render());
    return container;
}

function getPriorityElement(priority){
    const container = new Comp('div', { classList: ['priority-container']}).render();
    container.append(new Comp('div', {classList: ['priority-text'], textContent: cap(priority.text)}).render());
    container.setAttribute('priority', priority.text);
    return container;
}

// capitalize first letter of word
function cap(text){
    return text[0].toUpperCase() + text.slice(1);  
};

function getEditButton(){
    const editButton = new Comp(
        'img',
        {
            classList: ['edit-button'],
            src: editIcon,
            width: 20
        }
    ).render();
    editButton.addEventListener('click', editEventHandler);
    return editButton;
}

function editEventHandler(e){
    e.stopPropagation();
    document.querySelector('.add-todo-button').classList.add('hidden');
    const todoItem = e.target.parentElement.parentElement.parentElement; 
    if(todoItem.querySelector('.tick').classList.contains('checked')) return;
    todoItem.classList.add('edit');
    todoItem.querySelector('.todo-item-main').classList.add('hidden');
    if(todoItem.querySelector('.description-container')) todoItem.querySelector('.description-container').classList.add('hidden');
    const parentIndex = todoItem.getAttribute('data-project-id');
    const taskIndex = todoItem.getAttribute('data-index');
    const todo = myApp.projects[parentIndex].todos[taskIndex];
    todoItem.append(getEditForm(todo));
}

function getRemoveButton(){
    const removeButton = new Comp(
        'img',
        {
            classList: ['remove-button'],
            src: removIcon,
            width: 20
        }
    ).render();
    removeButton.addEventListener('click', deleteEventHandler);
    return removeButton;
}

function deleteEventHandler(e){
    
    const parentIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-project-id');
    const taskIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');

    // myApp.projects[parentIndex].deleteTodo(taskIndex);
    myApp.projects[parentIndex].todos.forEach((todo, index)=>{
        if(todo.id == taskIndex){
            console.log('found the todo object in the project');
            myApp.projects[parentIndex].deleteTodo(index);
            return;
        }
    });

    // Delete the todo item on display
    e.target.parentElement.parentElement.parentElement.remove();
    myApp.displayProjects();
};

export function getEditForm(todo){
    const form = new Comp('form', {classList: ['edit-form']}).render();
    const section1 = new Comp('div', {classList: ['edit-form-1']}).render();
    const section2 = new Comp('div', {classList: ['edit-form-2']}).render();
    const section3 = new Comp('div', {classList: ['edit-form-3']}).render();
    form.append(section1, section2, section3);

    const titleContainer = getTitleContainer(todo.title); 
    const priorityContainer = getPriorityContainer(todo.priority);
    const dueDateContainer = getDateContainer(todo.dueDate);
    section1.append(titleContainer, priorityContainer, dueDateContainer);

    const descriptionContainer = getDescriptionContainer(todo.desc);
    section2.append(descriptionContainer);

    // Event Listeners have to be added to these
    section3.append(getSaveButton(), getCancelButton());
    return form;
};

function getSaveButton(){
    // Get details from form fields and update the todo object
    const saveBtn = new Comp('button', {classList: ['todo-edit-btn btn-save'], textContent: 'Save'}).render();
    saveBtn.addEventListener('click', e=>{
        e.preventDefault();
        e.stopPropagation();
        const todo = saveBtn.parentElement.parentElement.parentElement;

        // Fetch data from form
        const form = e.target.parentElement.parentElement;
        const title = form.querySelector('.edit-title-container').querySelector('.edit-input').value;
        const priority = createPriority(form.querySelector('.edit-priority-container').querySelector('.edit-input').value);
        const date = form.querySelector('.edit-date-container').querySelector('.edit-input').value;
        const description = form.querySelector('.edit-description-container').querySelector('.edit-input').value;

        // Handle logic for new todo addition
        if(!todo.querySelector('.todo-item-main') && !todo.querySelector('.description-container')){
            const projectIndex = getIndexOfSelectedProject();
            // Create new todo object with fetched data
            const obj = new Todo(title, description, new Date(date), priority);

            // Add the todo to project.
            myApp.projects[projectIndex].addTodo(obj);

            //  Trigger local save
            // myApp.writeToLocal();

            // Rerender the todo elements
            displayTodos(myApp.projects[projectIndex].title, myApp.projects[projectIndex].todos, projectIndex);

            todo.remove();
            document.querySelector('.add-todo-button').classList.remove('hidden');
            myApp.displayProjects();
            return;
        }

        // Save data to todo object
        const parentIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-project-id');
        const taskIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
        const obj = myApp.projects[parentIndex].todos[taskIndex];
        obj.title = title; obj.priority = priority; obj.dueDate = new Date(date); obj.desc = description;

        // Trigger save to local
        myApp.writeToLocal();

        // Remove the form and make prevously hidden sections appear
        saveBtn.parentElement.parentElement.remove();
        todo.querySelector('.todo-item-main').classList.remove('hidden');
        if(todo.querySelector('.description-container')) todo.querySelector('.description-container').classList.remove('hidden');

        // Refresh todoitems - we'll create a new todo item and append it before the current todo item and delete the current todo item
        const mainBody = document.querySelector('.main-body');
        const updatedTodo = getTodoItem(obj, taskIndex, parentIndex);
        mainBody.insertBefore(updatedTodo, todo);
        todo.remove();
        document.querySelector('.add-todo-button').classList.remove('hidden');
        myApp.displayProjects();
    });
    return saveBtn;
};

function getCancelButton(){
    const cancel = new Comp('button', {classList: ['todo-edit-btn btn-cancel'], textContent: 'Cancel'}).render();
    cancel.addEventListener('click', e=>{
        e.stopPropagation();
        const todo = cancel.parentElement.parentElement.parentElement;
        todo.classList.remove('edit');
        // Remove form from todo item.
        cancel.parentElement.parentElement.remove();
        // Get back previously hidden divs
        if(todo.querySelector('.todo-item-main')) todo.querySelector('.todo-item-main').classList.remove('hidden');
        if(todo.querySelector('.description-container')) todo.querySelector('.description-container').classList.remove('hidden');
        if(!todo.querySelector('.todo-item-main') && !todo.querySelector('.description-container')){
            todo.remove();
            document.querySelector('.add-todo-button').classList.remove('hidden');
        }
        document.querySelector('.add-todo-button').classList.remove('hidden');
    });
    return cancel;
};

function getTitleContainer(title){
    const container = new Comp('div', {classList: ['edit-title-container edit-container']}).render();
    const label = new Comp('label', {classList: ['edit-label'], textContent: 'Title'}).render();
    const input = new Comp('input', {classList: ['edit-input'], type: 'text', textContent: title, value: title}).render();
    container.append(label, input);
    return container;
};

function getPriorityContainer(priority){
    const container = new Comp('div', {classList: ['edit-priority-container edit-container']}).render();
    const label = new Comp('label', {classList: ['edit-label'],  textContent: 'Priority'}).render();
    const select = new Comp('select', {classList: ['edit-input edit-dropdown']}).render();

    const items = ['Low', 'Medium', 'High'];
    items.forEach((item, index) => {
        const option = new Comp('option', {classList: ['priority-option'], value: item, textContent: item}).render();
        if(priority.text === item.toLowerCase()){
            option.selected = true;
        }
        select.append(option);
    })

    container.append(label, select);
    return container;
};

function getDateContainer(dueDate){
    const container = new Comp('div', {classList: ['edit-date-container edit-container']}).render();
    const label = new Comp('label', {classList: ['edit-label'], textContent: 'Due Date'}).render();
    const input = new Comp('input', {classList: ['edit-input edit-date'], type: 'date', value: format(dueDate, 'yyyy-MM-dd')}).render();
    container.append(label, input);
    return container;
};

function getDescriptionContainer(desc){
    const container = new Comp('div', {classList: ['edit-description-container edit-container']}).render();
    const label = new Comp('label', {classList: ['edit-label'], textContent: 'Description'}).render();
    const input = new Comp('textarea', {classList: ['edit-input text-area'], textContent: desc, value: desc}).render();
    container.append(label, input);
    return container;
};

function getIndexOfSelectedProject(){
    // Finding which dom element is currently selected
    const projectItems = document.querySelectorAll('.project-item');
    let index = 0;
    projectItems.forEach((item, i) => {
        if(item.classList.contains('selected')){
            index = i;
            return;
        }
    });
    return index;
}