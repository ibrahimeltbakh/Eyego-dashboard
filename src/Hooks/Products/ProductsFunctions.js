import api from "@/lib/axios";

const getToken = () => {
    const user = localStorage.getItem("user");
    if (!user) return null;

    const parsedUser = JSON.parse(user);
    const token = parsedUser?.token;


    return token;
};

export const addProduct = async ({ title, description, price, category, brand, imageCover, images, stock }) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("stock", stock);
    if (imageCover) formData.append("imageCover", imageCover);
    if (images && images.length > 0) {
        images.forEach((img) => formData.append("images", img));
    }

    const response = await api.post("/products", formData, {
        headers: {
            token: getToken(),
            "Content-Type": "multipart/form-data"
        },
    });
    return response.data;
};

export const updateProduct = async ({ productId, title, description, price, category, brand, imageCover, images, stock }) => {
    const formData = new FormData();

    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (price) formData.append("price", price);
    if (category) formData.append("category", category);
    if (brand) formData.append("brand", brand);
    if (stock) formData.append("stock", stock);
    if (imageCover) formData.append("imageCover", imageCover);
    if (images && images.length > 0) {
        images.forEach((img) => formData.append("images", img));
    }

    const response = await api.put(`/products/${productId}`, formData, {
        headers: {
            token: getToken(),
            "Content-Type": "multipart/form-data"
        },
    });
    return response.data;
};

export const removeProduct = async (productId) => {
    const response = await api.delete(`/products/${productId}`, {
        headers: { token: getToken() },
    });
    return response.data;
};


export const GetSpacificProduct = async (productId) => {
    const response = await api.get(`/products/${productId}`, {
        headers: { token: getToken() },
    });

    return response.data;
};
