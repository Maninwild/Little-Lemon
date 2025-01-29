document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");
    const checkoutTotal = document.getElementById("checkout-total");
    const checkoutForm = document.getElementById("checkout-form");

    // Display cart summary
    function loadCart() {
        cartSummary.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            total += item.price * item.quantity;
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartSummary.appendChild(listItem);
        });

        checkoutTotal.textContent = total.toFixed(2);
    }

    // Handle form submission
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const payment = document.getElementById("payment").value;

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Simulate order submission
        alert(`Thank you, ${name}! Your order has been placed.`);

        // Clear cart after order
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });

    loadCart();
});
