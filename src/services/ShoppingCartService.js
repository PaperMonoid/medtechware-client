const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;
import AuthService from './AuthService.js';

function createShoppingCartService() {
    async function addToCart(productId, quantity) {
        const body = JSON.stringify({ productId, quantity });

        return AuthService.fetchWithAuth(`${ServerURL}/cart/add`, {
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
        return AuthService.fetchWithAuth(`${ServerURL}/cart`)
        .then(response => {
            if (!response.ok) throw new Error('Error fetching cart');
            return response.json();
        });
    }

    async function updateCartItem(cartItemId, quantity) {
        const body = JSON.stringify({ cartItemID, quantity });

        return AuthService.fetchWithAuth(`${ServerURL}/cart/update`, {
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
	const body = JSON.stringify({ cartItemId })
        return AuthService.fetchWithAuth(`${ServerURL}/cart/remove`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
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
