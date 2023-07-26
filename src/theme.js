export function applyDark(){
    document.body.classList.add('dark');
}

export function applyLight(){
    document.body.classList.remove('dark');
}

export function setAccent(accent = 'purple'){
    document.body.setAttribute('accent', accent);
}

export function toggleTheme(){
    if(document.body.classList.contains('dark')) applyLight();
    else applyDark();
}