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

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

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

    const userInput = new Comp('input', {classList: ['username-input'], value: document.querySelector('.username').textContent}).render();
    userInput.setAttribute('maxlength', 15);
    usernameContainer.append(userInput);

    avatarContainer.append(
        getAvatar(avatar1, 'avatar1'),
        getAvatar(avatar2, 'avatar2'),
        getAvatar(avatar3, 'avatar3'),
        getAvatar(avatar4, 'avatar4'),
        getAvatar(avatar5, 'avatar5'),
        getAvatar(avatar6, 'avatar6'),
    );
    
    accentContainer.append(
        getAccent('green'),
        getAccent('cyan'),
        getAccent('blue'),
        getAccent('purple'),
        getAccent('pink'),
        getAccent('red'),
    );

    const avatarName = document.querySelector('.profile-picture').querySelector('img').classList[0];
    avatarContainer.querySelector(`.${avatarName}`).click();

    const accent = document.body.getAttribute('accent');
    accentContainer.querySelector(`.accent-${accent}`).click();
    
    const toggleBtn = new Comp('div', {classList: ['theme-toggle']}).render();
    const circle = new Comp('div', {classList: ['toggle-circle']}).render();
    toggleBtn.append(circle);
    toggleBtn.addEventListener('click', e => {
        toggleBtn.classList.toggle('dark-on');
        toggleTheme();  
    });
    if(document.body.classList.contains('dark')) toggleBtn.classList.toggle('dark-on');
    
    const save = new Comp('button', {classList: ['settings-save-btn settings-btn'], textContent: 'Save'}).render();
    const def = new Comp('button', {classList: ['settings-default-btn settings-btn'], textContent: 'Default'}).render();
    buttonsContainer.append(
        toggleBtn,
        def,
        save,
    );

    save.addEventListener('click', e=>{
        document.querySelector('.username').textContent = document.querySelector('.username-input').value || 'Username';
        document.querySelector('.overlay').remove();
        saveThemeToLocal();
    });

    def.addEventListener('click', e=>{
        avatarContainer.querySelector('.avatar2').click();
        accentContainer.querySelector('.accent-blue').click();
        if(document.body.classList.contains('dark')) toggleBtn.click();
    });

    return card;
}

function getAvatar(src, name){
    const avatar = new Comp('div', {classList: ['avatar']}).render(); 
    avatar.append(
        new Comp('img', {classList: [`avatar-image ${name}`], src: src, width: 50, draggable: false}).render()
    );
    avatar.addEventListener('click', e=>{
        // Remove selection from all others
        document.querySelectorAll('.avatar').forEach(av => av.classList.remove('avatar-chosen'));
        const img = document.querySelector('.profile-picture').querySelector('img');
        img.src = src;
        img.classList.remove(img.className);
        img.classList.add(name);

        // Add chosen class
        avatar.classList.add('avatar-chosen');
    });
    return avatar;
}

function getAccent(name){
    const accent = new Comp('div', {classList: [`accent-${name} accent`]}).render(); 
    accent.addEventListener('click', e=>{
        // Remove selection from all others
        document.querySelectorAll('.accent').forEach(acc => acc.classList.remove('chosen'));
        document.body.setAttribute('accent', name);
        // Add chosen class
        accent.classList.add('chosen');
    });
    return accent;
}

export function saveThemeToLocal(){
    const themeData = {
        username: document.querySelector('.username').textContent,
        profile: document.querySelector('.profile-picture').querySelector('img').className,
        accent: document.body.getAttribute('accent'),
        isDark: document.body.classList.contains('dark') ? true : false,
    }
    localStorage.setItem('themeData', JSON.stringify(themeData));
    console.log('theme written to local storage');
};

export function readThemeFromLocal(){
    if(localStorage.getItem('themeData')){
        const data = localStorage.getItem('themeData');
        const themeData =  JSON.parse(data);
        // Apply read theme
        document.body.setAttribute('accent', themeData.accent);
        if(themeData.isDark) document.body.classList.add('dark');
        document.querySelector('.username').textContent = themeData.username;

        // Find the correct profile picture based on the data stored in local storage
        avatars.forEach((avatar, index) => {
            if(themeData.profile === `avatar${index+1}`){
                document.querySelector('.profile-picture').querySelector('img').src = avatar;
                document.querySelector('.profile-picture').querySelector('img').className = themeData.profile;
                return;
            }
        });
    }
    else{
        document.querySelector('.settings-icon').click();
    }
}

// export {avatars as avatarsData};