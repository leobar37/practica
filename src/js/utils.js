let valideCamps = function(values) {
    let value = values.filter(property => {
        return String(property).trim() == "";
    })

    return value.length > 0 ? false : true;
}

let resetPrevieww = function() {
    document.getElementById('pr_image').src = 'img/no-image.png';
    document.getElementById('pr_name').innerHTML = ".....";
    document.getElementById('pr_price').innerHTML = "...";
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

let renderPreview = function() {
    document.getElementById('editOrPreview')
        .innerHTML = `  <img src="img/no-image.png" id="pr_image" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title" id="pr_name">......</h5>
                        <small class="price-mute" id="pr_price">....</small>
                        <button class="btn btn-primary w-100" id="confirm" type="button">confirm</button>
                    </div> `;
    setTimeout(() => {
        formAudit();
    }, 100)
}


/*=============================================
=            chosse image            =
=============================================*/
const modalGaleryRender = function(idModal) {
    let titulo = document.createElement('h1');
    titulo.classList.add('text-center', 'text-white', 'w-100', 'text-capitalize', 'h3');
    titulo.textContent = 'Escoger la imagen';
    let images = ProductcApi.getImages();
    let container = document.createElement('div');
    container.style.height = '100vh';
    container.style.width = '80%'
    container.style.margin = 'auto'
    let cssClass = ['d-flex', 'justify-content-center', 'flex-row', 'flex-wrap', 'align-items-center', 'border-primary'];
    cssClass.forEach(clas => container.classList.add(clas));
    // container.classList.add();

    container.appendChild(titulo);
    images.forEach(img => {
        let image;
        image = `
     <div class="card m-2" style="max-width: 15rem;">
        <img src="img/${img}" class="card-img-top" alt="">
        <button class="btn btn-primary btn-image" type="button"  data-image="${img}" >add image</button>
    </div>
     `;
        container.innerHTML += image;
    })
    setTimeout(() => {
        modal.modal('show');
        modal.addClass('in');
        modal.show();
    }, 100)
    let modal = $(`#${idModal}`);
    modal.html('');
    modal.append(container);

    //image buttons
    document.querySelectorAll('.card .btn-image').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let image = e.currentTarget.getAttribute('data-image');
            let $elementImage = document.getElementById('edit_image');
            $elementImage.src = 'img/' + image;
            $elementImage.dataset.image = image;
            modal.removeClass("in");
            $(".modal-backdrop").remove();
            modal.hide();
            document.body.classList.remove('modal-open');
            // moda.removeAttribute('style');

        })
    })

}




let renderEditPreview = function(product) {
    document.getElementById('editOrPreview')
        .innerHTML =
        `<a class="text-none" href="#" onclick= "openModal()">
            <img src="img/${product.image}" id="edit_image" data-image=${product.image} class="card-img-top" alt="">
        </a>
       <div class="card-body" >
           <input type="text" class="form-control mb-2"  id="name_edit" placeholder="title" value="${product.name}">
           <input type="number" class="form-control mb-2"  id="price_edit" placeholder="number" value ="${product.price}">
         <button class="btn btn-primary w-100" id="confirm_edit" data-id=${product.id}  type="button">edit</button>
    </div>`;
    setTimeout(() => {
        document.getElementById('confirm_edit')
            .addEventListener('click', (e) => {
                let name = document.getElementById('name_edit').value;
                let price = document.getElementById('price_edit').value;
                let id = document.getElementById("confirm_edit").getAttribute('data-id');
                let image = document.getElementById('edit_image').getAttribute('data-image');
                console.log('mi imagen')
                console.log(image);
                let product = new Product(name, price, image);
                ProductcApi.editProduct(id, product);
                renderProducts();
            })
    }, 100)
}

const openModal = function() {
    modalGaleryRender('modalGeneral');
}