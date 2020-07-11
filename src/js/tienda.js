let renderProducto = function(product) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '25%';
    card.innerHTML = `
     <img src="img/${product.image}" class="card-img-top" alt="">
        <div class="card-body">
           <h5 class="card-title">${product.name}</h5>
           <small class="price-mute">${product.price}</small>
           <button class="btn btn-primary w-100" type="button">+</button>
       </div>
    `;
    return card;
}
let renderProducts = function() {
    let productos = ProductcApi.getProducts();
    productos.forEach(element => {
        document.getElementById('products').appendChild(renderProducto(element))
    });
}




renderProducts();