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

let renderEditPreview = function(product) {

    document.getElementById('editOrPreview')
        .innerHTML =
        `<a class="text-none" href="#" onclick= "console.log('hola')">
            <img src="img/${product.image}" id="pr_image" class="card-img-top" alt="">
        </a>
       <div class="card-body" >
           <input type="text" class="form-control mb-2"  id="name_edit" placeholder="title" value="${product.name}">
           <input type="number" class="form-control mb-2"  id="price_edit" placeholder="number" value ="${product.price}">
         <button class="btn btn-primary w-100" id="confirm_edit" data-id=${product.id}  type="button">edit</button>
    </div>`;
    setTimeout(() => {
        document.getElementById('confirm_edit')
            .addEventListener('click', (e) => {
                let name = document.getElementById('name_edit');
                let price = document.getElementById('price_edit');
                let id = document.getElementById("confirm_edit").getAttribute('data-id');

            })
    }, 100)
}