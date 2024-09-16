// Atualiza a quantidade de itens e o subtotal no carrinho
function updateCartItemQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity); // Certifique-se de que newQuantity seja um número

    if (newQuantity < 1) {
        newQuantity = 1; // Garante que a quantidade nunca seja menor que 1
    }

    cartItems[index].quantity = newQuantity;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Função para remover item do carrinho
function removeCartItem(index) {
    cartItems.splice(index, 1); // Remove o item do array
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Atualiza o LocalStorage
    renderCart(); // Atualiza a exibição
}

// Função para calcular o subtotal com base na quantidade de itens e no preço
function calculateSubtotal() {
    let subtotal = 0;

    cartItems.forEach(item => {
        const quantity = item.quantity ? parseInt(item.quantity) : 1; // Garante que a quantidade seja no mínimo 1
        const price = parseFloat(item.price.replace('R$', '').replace(',', '.')) || 0; // Converte o preço para número
        subtotal += price * quantity;
    });

    // Se o subtotal for NaN ou menor que zero, exibe 0.00
    document.getElementById('cart-total').textContent = isNaN(subtotal) ? '0.00' : subtotal.toFixed(2);
}

// Renderiza os itens do carrinho
function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    cartItems.forEach((item, index) => {
        // Garante que a quantidade mínima sempre seja 1 ao renderizar
        if (item.quantity < 1) {
            item.quantity = 1;
        }

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price}</span>
                <div class="cart-item-quantity">
                    <button onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${index}, this.value)">
                    <button onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeCartItem(${index})">Remover</button>
        `;
        cartList.appendChild(cartItem);
    });

    calculateSubtotal(); // Atualiza o subtotal
}

document.addEventListener('DOMContentLoaded', renderCart);
