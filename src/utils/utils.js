function getHeaders() {
    const token = localStorage.getItem("token");
    const guestCartId = localStorage.getItem("guestCartId");

    const headers = {
        "Content-Type": "application/json",
        "guest-cart-id": guestCartId,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

async function addToCart(productId, quantity = 1) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/carts/add`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ productId, quantity })
    });

    return response.json();
}

export { getHeaders, addToCart };