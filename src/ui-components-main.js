import Comp from './ui-components-sidebar';
import editIcon from './icons/edit-icon-round.svg';
import removIcon from './icons/remove-icon-solid.svg';
import tickIcon from './icons/tick-icon.svg';
import format from 'date-fns/format';

export default function getTodoItem(todo, id=0){
    const element = new Comp('div', {classList: ['todo-item']}).render();

    element.append(new Comp('img', {classList: ['tick'], src: tickIcon, width: 20}).render());
    element.append(new Comp('div', {classList: ['todo-title'], textContent: todo.title}).render());
    const dataContainer = new Comp('div', {classList: ['data-container']}).render();
    const buttonsContainer = new Comp('div', {classList: ['buttons-container']}).render();
    dataContainer.append(getPriorityElement(todo.priority), getDateElement(todo.dueDate));
    buttonsContainer.append(getEditButton(), getRemoveButton());
    element.append(dataContainer, buttonsContainer);

    return element;
}

function getDateElement(dueDate){
    // console.log();
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
    console.log(e.target.parentElement.parentElement);
};