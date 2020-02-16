if (document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)

} else {
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    //console.log(removeCartItemButtons);
    
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener("click", removeCartitem )
      
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)

    }

    var addToCartButtons = document.getElementsByClassName('shop-item-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    function purchaseClicked(){
        alert('Thank you for your purchase.')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        while (cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    }

    function addToCartClicked(e){
        var button = e.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

        //console.log(title, price, imgSrc)

        additemToCart(title, price, imgSrc)
        updateCartTotal()
    }

    function  additemToCart(title, price, imgSrc){
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = document.getElementsByClassName('cart-item-title')
        for (var i =0; i < cartItemNames.length; i++){
            if (cartItemNames[i].innerText === title){
                alert('This item has already been added to cart')
                return
            }

        }
        var cartRowContents = `
        <div class="cart-item cart-column">
        <img  class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>

        <span class="cart-price cart-column">${price}</span>

       <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger " role="button">REMOVE ITEM</button>
    </div>
        `;
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartitem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }


    function quantityChanged(e){
        var input = e.target
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1;
        }
        updateCartTotal()
    }

    function removeCartitem (e){

        var buttonClicked = e.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()

    }
    
    function updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            
            var price = '';
            if (priceElement){
                price = parseFloat(priceElement.innerText.replace('£', ''))

            }
            //Use if statements to make ensure that btn, or any object you use, is not null before you use it.
            var quantity = '';

            if (quantityElement){
                quantity = quantityElement.value;
            }
            //console.log(price * quantity)
            total = total + (price * quantity)
        }
        //Ensure total rounded to two decimal places
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
    
    }

}


