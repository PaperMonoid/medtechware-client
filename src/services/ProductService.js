const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;
import AuthService from './AuthService.js';

const productService = (() => {

    async function listProducts() {
        const response = await fetch(`${ServerURL}/product`);
        return await response.json();
    }

    async function getProduct(id) {
        const response = await fetch(`${ServerURL}/product/${id}`);
        return await response.json();
    }

    async function searchProducts(keyword) {
        const response = await fetch(`${ServerURL}/product/search?keyword=${keyword}`);
        return await response.json();
    }

    async function createProduct(product) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };
        const response = await AuthService.fetchWithAuth(`${ServerURL}/product`, options);
	if (response.ok) {
            return await response.json();
	} else {
	    const { message } = await response.json();
	    throw new Error(message);
	}
    }

    async function updateProduct(id, product) {
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };
        const response = await AuthService.fetchWithAuth(`${ServerURL}/product/${id}`, options);
	if (response.ok) {
            return await response.json();
	} else {
	    const { message } = await response.json();
	    throw new Error(message);
	}
    }

    async function deleteProduct(id) {
        const options = {
            method: 'DELETE',
        };
        const response = await AuthService.fetchWithAuth(`${ServerURL}/product/${id}`, options);
	if (response.ok) {
            return await response.json();
	} else {
	    const { message } = await response.json();
	    throw new Error(message);
	}
    }

    return {
        listProducts,
        getProduct,
        searchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };

})();

export default productService;
