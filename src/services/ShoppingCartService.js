const ServerURL = 'http://localhost:3000';

function createShoppingCartService() {
    async function addToCart(productId, quantity) {
        const body = JSON.stringify({ productId, quantity });

        return authService.fetchWithAuth(`${ServerURL}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })
        .then(response => {
            if (!response.ok) throw new Error('Error adding to cart');
            return response.json();
        });
    }

    async function getCart() {
        return authService.fetchWithAuth(`${ServerURL}/api/cart`)
        .then(response => {
            if (!response.ok) throw new Error('Error fetching cart');
            return response.json();
        });
    }

    async function updateCartItem(cartItemId, quantity) {
        const body = JSON.stringify({ quantity });

        return authService.fetchWithAuth(`${ServerURL}/api/cart/${cartItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })
        .then(response => {
            if (!response.ok) throw new Error('Error updating cart item');
            return response.json();
        });
    }

    async function removeCartItem(cartItemId) {
        return authService.fetchWithAuth(`${ServerURL}/api/cart/${cartItemId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) throw new Error('Error removing cart item');
            return response.json();
        });
    }

    return {
        addToCart,
        getCart,
        updateCartItem,
        removeCartItem,
    };
}

const shoppingCartService = createShoppingCartService();

export default shoppingCartService;
