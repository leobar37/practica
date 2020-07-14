let message = document.createElement('div');
let img = document.createElement('img');
// img.width = '500px';
img.src = './img/readme.png';
img.classList.add('img-fluid', 'w-100');
let paragrph = document.createElement('p');
paragrph.textContent = 'hola';
let button = document.createElement('btn');

let Ico = document.createElement('i');
Ico.classList.add('fas', 'fa-forward');
// button.textContent = 'hola';
button.style.marginTop = '2rem';
button.classList.add('btn', 'btn-success');
button.id = 'close_modal';
button.appendChild(Ico);
message.appendChild(img);
message.appendChild(button);

let btn = message.outerHTML;

modalRender(INFO_ICON, btn, 'modalGuia');

document.getElementById('close_modal').addEventListener('click', () => {
    // console.log('my click');
    $('#modalGuia').modal('hide');
})