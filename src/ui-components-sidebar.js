import { myApp } from '.';
import { selectAllTasks } from './dom-handler';
import cancelIcon from  './icons/delete-icon.svg';

import avatar1 from './avatars/avatar-1.png';
import avatar2 from './avatars/avatar-2.png';
import avatar3 from './avatars/avatar-3.png';
import avatar4 from './avatars/avatar-4.png';
import avatar5 from './avatars/avatar-5.png';
import avatar6 from './avatars/avatar-6.png';
import { toggleTheme } from './theme';

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
    element.append(new Comp('img', {classList: ['menu-item-icon svg'], src: imgSrc, width: 25}).render());
    element.append(new Comp('div', {classList: ['menu-item-text'], textContent: title}).render());
    return element;
}

export function getProjectItem(title){
    const element = new Comp('div', {classList: [`${title.toLowerCase().split(' ').join('-')}-container project-item`]}).render();
    element.append(new Comp('div', {classList: [`${title.toLowerCase().split(' ').join('-')}-title project-item-text`], textContent: title}).render());
    const removeBtn = new Comp('img', {classList: ['remove-project-btn btn svg'], src: cancelIcon, width: 10}).render();
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

export function getSettinsCard(){
    const card = new Comp('div', {classList: ['settings-card']}).render();
    const usernameContainer = new Comp('div', {classList: ['username-container']}).render();
    const avatarContainer = new Comp('div', {classList: ['avatar-container']}).render();
    const accentContainer = new Comp('div', {classList: ['accent-container']}).render();
    const buttonsContainer = new Comp('div', {classList: ['settings-buttons-container']}).render();
    card.append(usernameContainer, avatarContainer, accentContainer, buttonsContainer);

    usernameContainer.append(
        new Comp('input', {classList: ['username-input'], value: 'Username'}).render()
    );        
    
    avatarContainer.append(
        getAvatar(avatar1),
        getAvatar(avatar2),
        getAvatar(avatar3),
        getAvatar(avatar4),
        getAvatar(avatar5),
        getAvatar(avatar6),
    );

    accentContainer.append(
        getAccent('purple'),
        getAccent('cyan'),
        getAccent('blue'),
        getAccent('purple'),
        getAccent('pink'),
        getAccent('red'),
    );

    const toggleBtn = new Comp('div', {classList: ['theme-toggle']}).render();
    const circle = new Comp('div', {classList: ['toggle-circle']}).render();
    toggleBtn.append(circle);
    toggleBtn.addEventListener('click', e => {
        toggleBtn.classList.toggle('dark-on');
        toggleTheme();
    });

    buttonsContainer.append(
        toggleBtn,
        new Comp('btn', {classList: ['settings-default-btn settings-btn'], textContent: 'Default'}).render(),
        new Comp('btn', {classList: ['settings-save-btn settings-btn'], textContent: 'Save'}).render(),
    );

    return card;
}

function getAvatar(name){
    const avatar = new Comp('div', {classList: ['avatar']}).render(); 
    avatar.append(
        new Comp('img', {classList: ['avatar-image'], src: name, width: 50}).render()
    );
    avatar.addEventListener('click', e=>{
        // Remove selection from all others
        document.querySelectorAll('.avatar').forEach(av => av.classList.remove('avatar-chosen'));
        // Add chosen class
        avatar.classList.add('avatar-chosen');
    });
    return avatar;
}

function getAccent(name, color){
    const accent = new Comp('div', {classList: [`accent-${name} accent`]}).render(); 
    accent.addEventListener('click', e=>{
        // Remove selection from all others
        document.querySelectorAll('.accent').forEach(acc => acc.classList.remove('chosen'));
        // Add chosen class
        accent.classList.add('chosen');
    });
    return accent;
}