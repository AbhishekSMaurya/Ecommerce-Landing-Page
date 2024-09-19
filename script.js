
// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Image Slider
const slide = document.querySelector(".hero");
let count = 0;

const images = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.pexels.com/photos/416515/pexels-photo-416515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://media.istockphoto.com/id/498301640/vector/big-sale-banner.jpg?s=612x612&w=0&k=20&c=fppPOZ3LZCyvtDUiy6tR52xDWofX52Fdu3a7Ltc_fVY=',
    'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMzItMzkxLXBsb3ktMTAuanBn.jpg',
    'https://img.freepik.com/free-vector/super-sale-phone-banner-mobile-clearance-sale-discount-poster-smartphone-sale-marketing-special-offer-promotion_433751-53.jpg'
];

function showSlide(index) {
    slide.style.background = `url('${images[index]}') no-repeat center center/cover`;
}

// Next Button
function Next() {
    count = (count + 1) % images.length; 
    showSlide(count);
}

// Prev Button
function Prev() {
    count = (count - 1 + images.length) % images.length; 
    showSlide(count);
}

// Initialize the first slide
showSlide(count);

// Cart function
 let cart = [];

function addToCart(product) {
    const productInCart = cart.find(item => item.name === product.name);
    
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    const cartContainer = document.querySelector('#cart .box');
    cartContainer.innerHTML = '';  
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <p>${item.name} Quantity-(${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    const removeButtons = document.querySelectorAll('.remove-item');

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            
            updateCart();
        });
    });
    
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: this.parentElement.querySelector('h3').textContent,
            price: parseFloat(this.parentElement.querySelector('p').textContent.replace('$', ''))
        };
        addToCart(product);
    });
});

function erase() {
    const inputs = document.querySelectorAll('#sec-2 .input2');
    inputs.forEach(input => {
        input.value = '';
    });
}

function submitForm() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Submitted Successfully!';
    messageElement.style.color = 'green'; 
    erase();
}
