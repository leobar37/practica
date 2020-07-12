 let carrito = [];
 let renderProducto = function(product) {
     let card = document.createElement('div');
     card.classList.add('card');
     card.style.width = '30%';
     card.innerHTML = `
     <img src="img/${product.image}" class="card-img-top" alt="">
        <div class="card-body">
           <h5 class="card-title">${product.name}</h5>
           <small class="price-mute">${product.price}</small>
           <button class="btn btn-primary w-100 addButton" data-id="${product.id}"  type="button">+</button>
       </div>
    `;
     return card;
 }
 let renderProducts = function() {
     let productos = ProductcApi.getProducts();
     productos.forEach(element => {
         document.getElementById('products').appendChild(renderProducto(element))
     });
     document.querySelectorAll('.card .addButton').forEach(but => {
         but.addEventListener('click', (e) => {
             let id = e.currentTarget.getAttribute('data-id');
             let product = ProductcApi.searchForId(id);
             if (carrito.length == 0) {
                 carrito.push({
                     name: product.name,
                     id: product.id,
                     cantidad: 1,
                     total: product.price
                 })
             } else {
                 let exist = carrito.filter(pro => pro.id == product.id);

                 if (exist.length > 0) {
                     carrito.map(prod => {
                         if (prod.id == id) {
                             prod.cantidad = prod.cantidad + 1;
                             prod.total = Number(prod.total) + Number(product.price);
                         }
                         return prod;
                     })
                 } else {
                     carrito.push({
                         name: product.name,
                         id: product.id,
                         cantidad: 1,
                         total: product.price
                     })
                 }
             }
             addItemsTable(carrito);
             //  if (carrito) {
             //      addItem(product);
             //      // id precio cantidad total
             //  }
             //adItemTable
         })
     })

 }

 /* table control */
 let addItemsTable = (items) => {
     let $carritoTable = document.getElementById('carrito');
     $carritoTable.innerHTML = "";
     items.forEach(product => {
         let $row = document.createElement('tr');
         $row.dataset.id = product.id;
         let $content = `
         <td>${product.name}</td>
         <td>${product.cantidad}</td>
         <td>${product.total}</td>
         <td>
             <button class="badge badge-danger deleteItem" data-id =${product.id}>
                             x
            </button>
         </td>
         `;
         $row.innerHTML = $content;
         $carritoTable.appendChild($row);
     })

     document.querySelectorAll('td .deleteItem').forEach(butt => {
         butt.addEventListener('click', (e) => {
             let id = e.currentTarget.getAttribute('data-id');
             carrito = carrito.map(prod => {
                 if (prod.id == null) {
                     return null;
                 }
                 if (prod.id == id) {
                     if (prod.cantidad == 1) {
                         return null;
                     } else {
                         let price = prod.total / (prod.cantidad == 0 ? 1 : prod.cantidad);
                         prod.cantidad = prod.cantidad - 1;
                         prod.total = Number(prod.total) - Number(price);
                     }


                 }
                 return prod;
             })
             carrito = carrito.filter(pro => pro != null);
             console.log(carrito);
             if (carrito.length == 0)
                 $carritoTable.innerHTML = "";
             else
                 addItemsTable(carrito);


         })
     })

 }
 const buttons = () => {
     document.getElementById('enviar_compra').addEventListener('click', () => {
         let email = document.getElementById('com_email').value;
         let names = document.getElementById('com_names').value;
         if (valideCamps([email, names]) && carrito.length > 0) {
             let compra = new Compra(names, email, carrito);
             Compra.addCompra(compra);
         } else {
             console.log('campos vacios');
         }

     });
 }

 renderProducts();
 buttons();