

  let main_product = document.querySelector('.main-product')
  let heading = document.querySelector('.heading')
  let carsoul = document.querySelector('.carsoul')
  let productgrid = document.querySelector('.products')
  let openShopping = document.querySelector('#opencart');
  let closeShopping = document.querySelector('#exit');
  let cartitems = document.querySelector('.cart-items');
  let cart_div = document.querySelector('.cart')
  let total = document.querySelector('.subtotal')
  // let totalquantity = document.querySelector('.totalquantity')

  openShopping.addEventListener('click', ()=>{
    cart_div.style.visibility = 'visible';
    heading.style.transform = 'translateX(200px)';
    productgrid.style.transform = 'translateX(200px)';
    productgrid.style.width = '65%';
    carsoul.style.transform = 'translateX(200px)';
  })
  closeShopping.addEventListener('click', ()=>{
    cart_div.style.visibility = 'hidden';
    heading.style.transform = 'translateX(0px)';
    productgrid.style.transform = 'translateX(0px)';
    productgrid.style.width = '80%';
    carsoul.style.transform = 'none';
  })

  
function renderProdcuts() {
    products.forEach((product) => {
      productgrid.innerHTML += `
              <div class="item">
                  <div class="item-container">
                      <div class="item-img">
                          <img src="${product.imgSrc}" alt="${product.name}">
                          <div class="add-to-wishlist">
                            <img src="./Img/heart.png" alt="add to wish list">
                          </div>
                          <div class="add-to-cart" onclick="addToCart(${product.id})">
                            <img src="./Img/bag-plus.png" alt="add to cart">
                          </div>
                      </div>
                      <div class="desc">
                          <h2>${product.name}</h2>
                          <h2><small>$</small>${product.price}</h2>
                          <p>
                              ${product.description}
                          </p>
                      </div> 
                  </div>
              </div>
          `;
    });
  }
  renderProdcuts();


  let cart = [];
  
function addToCart(id){
  cart[id] = JSON.parse(JSON.stringify(products[id]));
  cart[id].quantity = 1
  renderCartItems()
}

function renderCartItems() {
  cartitems.innerHTML = ""; // clear cart element
  // let count = 0;
  let totalPrice = 0;
  cart.forEach((item, key) => {
    totalPrice = totalPrice + item.price;
    // count = count + item.quantity;
    cartitems.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price.toLocaleString()}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeQuantity(${key}, ${item.quantity - 1})">-</div>
                <div class="number">${item.quantity}</div>
                <div class="btn plus" onclick="changeQuantity(${key}, ${item.quantity + 1})">+</div>           
            </div>
        </div>
      `;
  });
  total.innerText = `Total Amount:${ ' $' + totalPrice.toLocaleString()}`;
  // totalquantity.innerText = count;
}

function changeQuantity(key, quantity){
  if(quantity==0){
    delete cart[key]
  }else{
    cart[key].quantity = quantity
    cart[key].price = quantity * products[key].price
  }
  renderCartItems()
}