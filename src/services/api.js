import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';

// Criar instância do Axios
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// SERVIÇOS DA API - BOOKS
// ============================================

/**
 * Busca o livro em destaque
 */
export const getFeaturedBook = async () => {
  const response = await api.get(API_ENDPOINTS.featured);
  return response.data;
};

/**
 * Busca os livros mais lidos
 */
export const getMostReadBooks = async () => {
  const response = await api.get(API_ENDPOINTS.mostRead);
  return response.data;
};

/**
 * Busca livros em tendência
 */
export const getTrendingBooks = async () => {
  const response = await api.get(API_ENDPOINTS.trending);
  return response.data;
};

/**
 * Busca livros para explorar
 */
export const getExploreBooks = async () => {
  const response = await api.get(API_ENDPOINTS.explore);
  return response.data;
};

/**
 * Busca livros por query
 * @param {string} query - Termo de busca
 * @param {number} limit - Limite de resultados
 * @param {number} offset - Offset para paginação
 */
export const searchBooks = async (query, limit = 20, offset = 0) => {
  const response = await api.get(API_ENDPOINTS.searchFrontend, {
    params: { q: query, limit, offset },
  });
  return response.data;
};

/**
 * Busca detalhes de um livro por ID
 * @param {string} bookId - ID do livro
 */
export const getBookById = async (bookId) => {
  const response = await api.get(API_ENDPOINTS.bookDetailFrontend(bookId));
  return response.data;
};

// ============================================
// SERVIÇOS DA API - FAVORITES
// ============================================

/**
 * Adiciona um livro aos favoritos
 * @param {Object} bookData - { book_id, book_title, book_cover }
 */
export const addFavorite = async (bookData) => {
  const response = await api.post(API_ENDPOINTS.favorites, bookData);
  return response.data;
};

/**
 * Lista todos os favoritos do usuário
 */
export const getFavorites = async () => {
  const response = await api.get(API_ENDPOINTS.favoritesList);
  return response.data;
};

/**
 * Remove um livro dos favoritos
 * @param {string} bookId - ID do livro
 */
export const removeFavorite = async (bookId) => {
  const response = await api.delete(API_ENDPOINTS.removeFavorite(bookId));
  return response.data;
};

// ============================================
// SERVIÇOS DA API - READING PROGRESS
// ============================================

/**
 * Atualiza o progresso de leitura
 * @param {Object} progressData - { book_id, book_title, last_page, status }
 */
export const updateReadingProgress = async (progressData) => {
  const response = await api.post(API_ENDPOINTS.readingProgress, progressData);
  return response.data;
};

/**
 * Lista o histórico de leitura do usuário
 */
export const getReadingHistory = async () => {
  const response = await api.get(API_ENDPOINTS.readingHistory);
  return response.data;
};

export default api;
