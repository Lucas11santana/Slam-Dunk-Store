document.addEventListener('DOMContentLoaded', () => {
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const imageIndex = button.getAttribute('data-image');
            const card = button.closest('.card');
            const images = card.querySelectorAll('.product-image');
            images.forEach((img, index) => {
                if (index == imageIndex) {
                    img.setAttribute('data-active', 'true');
                } else {
                    img.removeAttribute('data-active');
                }
            });
        });
    });
});
