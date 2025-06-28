import axios from 'axios';

const API_BASE = 'https://dsagredo-ms-server.onrender.com';
import { Post } from '../types';

export async function getAllPortfolio() {
    try {
        const res = await axios.get(`${API_BASE}/portfolio-ms`);
        return res.data;
    } catch (error) {
        console.error('Error al obtener portafolios:', error);
        throw error;
    }
}

export async function createPost(body: Post) {
    try {
        const res = await axios.post(`${API_BASE}/portfolio-add-ms`, body, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error) {
        console.error('Error al crear portafolio:', error);
        throw error;
    }
}

export async function deletePost(id: string) {
    try {
        const res = await axios.delete(
            `${API_BASE}/portfolio-delete-ms/${id}`,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return res.data;
    } catch (error) {
        console.error('Error al eliminar portafolio:', error);
        throw error;
    }
}
