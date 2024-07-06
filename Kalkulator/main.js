function a_plus_b(form) {
    let a = parseFloat(form.a.value); 
    let b = parseFloat(form.b.value);
    let c = a + b; 

    form.rezultat.value = c; 
}


function a_minus_b(form) {
    
    let a = form.a.value
    let b = form.b.value
    let c = a - b
    form.rezultat.value = c
}

function a_puta_b(form) {
    
    let a = form.a.value
    let b = form.b.value
    let c = a * b
    form.rezultat.value = c
}

function a_podeljeno_b(form) {
    
    let a = form.a.value
    let b = form.b.value
    let c = a / b
    form.rezultat.value = c
}

function a_kvadriranje_b(form) {
    
    let a = form.a.value
    let b = form.b.value
    let c = Math.pow(a,b)
    form.rezultat.value = c
}
