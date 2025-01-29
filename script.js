document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from local storage
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Function to update the cart display
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button class="decrease-btn" data-index="${index}">-</button>
                <button class="increase-btn" data-index="${index}">+</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(listItem);
        });

        cartTotal.textContent = total;
        localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to local storage
    }

    // Function to add item to cart
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    }

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const item = event.target.closest(".menu-item");
            const name = item.dataset.name;
            const price = parseFloat(item.dataset.price);
            addToCart(name, price);
        });
    });

    // Event listener for modifying cart quantities
    cartItemsContainer.addEventListener("click", (event) => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("remove-btn")) {
            cart.splice(index, 1);
        } else if (event.target.classList.contains("increase-btn")) {
            cart[index].quantity++;
        } else if (event.target.classList.contains("decrease-btn")) {
            cart[index].quantity--;
            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }
        }

        updateCart();
    });

    // Checkout button functionality
    document.getElementById("checkout-btn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Thank you for your order!");
            cart = []; // Clear cart
            localStorage.removeItem("cart"); // Remove from local storage
            updateCart();
        }
    });

    // Load cart on page load
    updateCart();
});
