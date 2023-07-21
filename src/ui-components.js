import cancelIcon from  './icons/close-icon.svg';
import editIcon from './icons/edit-icon-round.svg';
import removIcon from './icons/remove-icon-solid.svg';
import tickIcon from './icons/tick-icon.svg';
import format from 'date-fns/format';

// Generate simple dom elements with required properties while invoking constructor
export default class Comp {
    constructor(type, properties){
        this.element = document.createElement(type);
        if(properties === undefined) return;
        for(const prop in properties){
            this.element[prop] = properties[prop];
        }
    }
    render = ()=>{return this.element};
}

export function getMenuItem(title, imgSrc){
    const element = new Comp('div', {classList: [`${title.toLowerCase().split(' ').join('-')}-container menu-item`]}).render();
    element.append(new Comp('img', {classList: ['menu-item-icon'], src: imgSrc, width: 25}).render());
    element.append(new Comp('div', {classList: ['menu-item-text'], textContent: title}).render());
    return element;
}

export function getProjectItem(title){
    const element = new Comp('div', {classList: [`${title.toLowerCase().split(' ').join('-')}-container project-item`]}).render();
    element.append(new Comp('div', {classList: [`${title.toLowerCase().split(' ').join('-')}-title project-item-text`], textContent: title}).render());
    element.append(new Comp('img', {classList: ['remove-project-btn btn'], src: cancelIcon, width: 10}).render());
    return element;
}

export function getSvgObject(src, className){
    return new Comp('object', {classList: [`${className}`], type : 'image/svg+xml', data: src, width: 40}).render();
}

export function getTodoItem(todo, mode='default'){
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
    return new Comp(
        'img',
        {
            classList: ['remove-button'],
            src: removIcon,
            width: 20
        }
    ).render()
}

