/*=============================================
=            admin functions            =
=============================================*/

/* CONSTANTS */
const SUCCESS_ICON = "fas fa-thumbs-up";
const ERROR_ICON = "fas fa-times";
const WRNING_ICON = "fas fa-exclamation-triangle";
const DELETE = 1;

/* ************modal controls */

let modalRender = function(icon_name, message, idModal, option) {
    let content = `
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="productos_modal">
            <div class="card border-info">
               <h1 class="card-title text-center"> <i class=" ${icon_name} error_icon"></i></h1>
                   <div class="card-body text-center">
                       <p class="card-text text-center"> ${message}.</p>
                        
                 </div>
            </div>
        </div>
    </div>
    `;
    let modal = $(`#${idModal}`);
    document.getElementById(idModal).innerHTML = content;
    setTimeout(() => {
        modal.modal('show');
    }, 100)
}

let renderimages = function() {
    let images = ProductcApi.getImages();
    images.forEach(img => {

        let image;
        image = `
         <div class="card m-2" style="max-width: 10rem;">
            <img src="img/${img}" class="card-img-top" alt="">
            <button class="btn btn-primary" type="button" data-image="${img}" >add image</button>
        </div>
         `
        document.getElementById('galery').innerHTML += image;
    })
}

const modalGaleryRender = function(idModal) {
    let images = ProductcApi.getImages();
    let container = document.createElement('div');
    container.classList.add(['row', 'd-flex flex-wrap', 'justify-content-center', 'flex-row']);
    images.forEach(img => {
        let image;
        image = `
     <div class="card m-2" style="max-width: 15rem;">
        <img src="img/${img}" class="card-img-top" alt="">
        <button class="btn btn-primary" type="button" data-image="${img}" >add image</button>
    </div>
     `;
        container.innerHTML += image;
    })
    console.log(container);
    let modal = $(`#${idModal}`);
    document.getElementById(idModal).appendChild(container);
    setTimeout(() => {
        modal.modal('show');
    }, 100)
}

modalGaleryRender('modalGeneral');
let tabsFunction = function(callback) {
    let elements = document.querySelectorAll('#nav-tabs li  a');
    elements.forEach(el => {
        callback(el);
    })
}

let tabs = function() {
        tabsFunction((el) => {
            el.addEventListener('click', (e) => {
                let id = e.currentTarget.getAttribute('data-tab');
                let tab = document.getElementById(id);
                tabsFunction(el => {
                    let id = el.getAttribute('data-tab');
                    let tab = document.getElementById(id);
                    tab.classList.toggle('show');
                    tab.style.display = 'none';
                })
                if (id == 'products') {
                    renderProducts();
                    //render  edit preview
                    renderEditPreview({
                        name: '',
                        image: 'no-image.png',
                        price: 0
                    });
                }
                if (id == 'addProduct') {
                    //render preview
                    console.log('render');
                    renderPreview();
                }
                tab.style.display = 'initial';
                tab.classList.add('show');
            });
        })

    }
    //render products for edits
let renderProducto = function(product) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '45%';
    card.style.margin = '10px';
    card.innerHTML = `
     <img src="img/${product.image}" class="card-img-top" alt="">
        <div class="card-body">
           <h5 class="card-title">${product.name}</h5>
           <small class="price-mute">${product.price}</small>
           <button class="btn btn-danger delete" data-delete= "${product.id}" type="button">
              <i class="fas fa-trash"></i>
           </button>
           <button class="btn btn-primary edit"  data-edit="${product.id}" type="button">
               <i class="fas fa-edit"></i>
           </button>
       </div>
    `;
    return card;
}

let renderProducts = function() {
    document.getElementById('products').innerHTML = "";
    let productos = ProductcApi.getProducts();
    productos.forEach(element => {
        document.getElementById('products').appendChild(renderProducto(element));
    });
    document.querySelectorAll('#products .delete').forEach(butt => {

        butt.addEventListener('click', (e) => {
            let id = e.currentTarget.getAttribute('data-delete');
            ProductcApi.deleteProduct(id);
            modalRender(SUCCESS_ICON, 'se ha eliminado un elemento', "modalGeneral", DELETE);
            renderProducts();
        });
    })
    document.querySelectorAll('#products .edit').forEach(butt => {

        butt.addEventListener('click', (e) => {
            let id = e.currentTarget.getAttribute('data-edit');
            // ProductcApi.deleteProduct(id);
            let product = ProductcApi.searchForId(id);
            renderEditPreview(product);
            // modalRender(SUCCESS_ICON, 'se ha  un elemento', "modalGeneral", DELETE);
            renderProducts();
        });
    })

}

renderimages();
// formAudit();
tabs();
// renderProducts();

// ar myNewModalInstance = new BSN.Modal('#modalGeneral', { backdrop: false }).show();