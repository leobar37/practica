let message = document.createElement('div');
let paragrph = document.createElement('p');
paragrph.textContent = 'hola';
let button = document.createElement('btn');
let Ico = document.createElement('i');
Ico.classList.add('fas', 'fa-forward');
// button.textContent = 'hola';
button.classList.add('btn', 'btn-success');
button.id = 'close_modal';
button.appendChild(Ico);
message.appendChild(button);
let btn = message.outerHTML;

modalRender(INFO_ICON, btn, 'modalGuia');

document.getElementById('close_modal').addEventListener('click', () => {
    console.log('my click');
    // $('#modalGuia').modal('hide');
})




// 2. ** productos **:
//     -En esta parte se puede agregar productos al carrito(Antes primero tiene que pasar por el admin para que pueda agregar productos) -
//     Tambien se puede hacer una busqueda filtrada

//     `