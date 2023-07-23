export function applyDark(){
    document.body.setAttribute('accent', 'purple-dark');
    document.body.classList.add('dark');
}

export function applyLight(){
    document.body.setAttribute('accent', 'purple');
    document.body.classList.remove('dark');
}

export function toggleTheme(){
    if(document.body.classList.contains('dark')) applyLight();
    else applyDark();
}