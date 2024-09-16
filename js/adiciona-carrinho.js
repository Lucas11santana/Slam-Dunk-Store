// Seleciona os elementos necessários
const cartIcon = document.getElementById('cart-icon');
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Inicializa o array de produtos no carrinho
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Função para atualizar a bolinha do carrinho
function updateCartCount() {
    // Calcula o número total de itens no carrinho
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Atualiza a visibilidade da bolinha
    if (totalItems > 0) {
        cartCountElement.classList.add('active');
    } else {
        cartCountElement.classList.remove('active');
    }
}

// Atualiza o contador do carrinho ao carregar a página
updateCartCount();

// Função para adicionar ao carrinho
function addToCart(event) {
    // Obtém os detalhes do produto
    const productCard = event.target.closest('.card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    const productImage = productCard.querySelector('.product-image[data-active="true"]').src;

    // Cria um objeto representando o produto com quantidade inicial de 1
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1 // Garante que o produto seja adicionado com quantidade 1
    };

    // Verifica se o produto já está no carrinho
    const existingProductIndex = cartItems.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        // Se o produto já estiver no carrinho, apenas incrementa a quantidade
        cartItems[existingProductIndex].quantity += 1;
    } else {
        // Caso contrário, adiciona o novo produto ao carrinho
        cartItems.push(product);
    }

    // Armazena os itens do carrinho no localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Atualiza o contador do carrinho
    updateCartCount();
}

// Adiciona o evento de clique para cada botão de "Adicionar ao Carrinho"
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});
