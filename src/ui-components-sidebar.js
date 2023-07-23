import { myApp } from '.';
import { selectAllTasks } from './dom-handler';
import cancelIcon from  './icons/delete-icon.svg';


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
    const removeBtn = new Comp('img', {classList: ['remove-project-btn btn'], src: cancelIcon, width: 10}).render();
    element.append(removeBtn);

    removeBtn.addEventListener('click', e=>{
        e.stopPropagation();
        const parent = document.querySelector('.projects-body');

        // Delete project from my app
        const index = Array.from(parent.children).indexOf(element);
        myApp.deleteProject(index);

        selectAllTasks(myApp);

        // Remove project item
        element.remove();
        if(document.querySelector('.projects-body').childElementCount === 0) document.querySelector('.projects-body').append(getProjectsInfo());
    });

    return element;
}

export function getProjectsInfo(){
    return new Comp('div', {classList: ['projects-info'], textContent: 'No projects to display'}).render();
};

