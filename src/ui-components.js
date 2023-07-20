import cancelIcon from  './icons/close-icon.svg';

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