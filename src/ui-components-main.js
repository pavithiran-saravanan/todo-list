import Comp from './ui-components-sidebar';
import editIcon from './icons/edit-icon-round.svg';
import removIcon from './icons/remove-icon-solid.svg';
import tickIcon from './icons/tick-icon.svg';
import format from 'date-fns/format';
import { myApp } from '.';
import { addEventListernersToMenuItems, addEventListernersToProjectItems } from './dom-handler';

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

    // Add click event handler
    element.addEventListener('click', e=>{
        if(!element.classList.contains('view')){
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
    return new Comp(
        'img',
        {
            classList: ['edit-button'],
            src: editIcon,
            width: 20
        }
    ).render()
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

    // Delete the todo item from the data structure
    myApp.projects[parentIndex].deleteTodo(taskIndex);
    // Delete the todo item on display
    e.target.parentElement.parentElement.parentElement.remove();
};