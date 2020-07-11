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
    let button = `<button class ="btn btn-success" id="confirmButtom"> confirm </button>`;
    let content = `
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="productos_modal">
            <div class="card border-info">
               <h1 class="card-title text-center"> <i class=" ${icon_name} error_icon"></i></h1>
                   <div class="card-body text-center">
                       <p class="card-text text-center"> ${message}.</p>
                        ${ option != 0 ?  button : "" }
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
    let images = [
        "reloj.jpg",
        "zapatilla2.jpg",
        "zapatillas.jpg"
    ]
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

let formAudit = function() {
    /* galery */
    let galery = document.querySelectorAll('#galery .card button');
    let image;
    let name = "";
    let price;
    galery.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            image = e.currentTarget.getAttribute('data-image');
            document.getElementById('pr_image').src = 'img/' + image;
        });
    }) /* nombre */
    document.getElementById('nom').addEventListener('keyup', (e) => {
        name = e.currentTarget.value;
        document.getElementById('pr_name').innerHTML = name;

    });
    document.getElementById('price').addEventListener('keyup', (e) => {
        price = e.currentTarget.value;
        document.getElementById('pr_price').innerHTML = price + '$';
    });

    document.getElementById('confirm').addEventListener('click', () => {
        if (valideCamps([name, price, image])) {
            let pro = new Product(name, price, image);
            ProductcApi.AddProduct(pro);
            resetPrevieww();
            modalRender(SUCCESS_ICON, 'se ha agregado un producto', 'modalGeneral', 0);

        } else {
            modalRender(ERROR_ICON, 'se debe llenar todos lo campis', 'modalGeneral', 0);
        }
    })
}

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
           <button class="btn btn-primary" type="button">
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
}

renderimages();
formAudit();
tabs();
// renderProducts();

// ar myNewModalInstance = new BSN.Modal('#modalGeneral', { backdrop: false }).show();