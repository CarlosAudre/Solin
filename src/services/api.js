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
  return response.data.books || [];
};

/**
 * Busca livros em tendência
 */
export const getTrendingBooks = async () => {
  const response = await api.get(API_ENDPOINTS.trending);
  return response.data.books || [];
};

/**
 * Busca livros para explorar
 */
export const getExploreBooks = async () => {
  const response = await api.get(API_ENDPOINTS.explore);
  return response.data.books || [];
};

/**
 * Busca livros por query
 * @param {string} query - Termo de busca
 * @param {number} limit - Limite de resultados
 * @param {number} offset - Offset para paginação
 */
export const searchBooks = async (query, limit = 20, offset = 0) => {
  const response = await api.get(API_ENDPOINTS.search, {
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
// SERVIÇOS DA API - AUTH
// ============================================

/**
 * Login do usuário
 * @param {Object} credentials - { email, password }
 */
export const login = async (credentials) => {
  const response = await api.post(API_ENDPOINTS.login, credentials);
  return response.data;
};

/**
 * Registro de novo usuário
 * @param {Object} userData - { email, username, password }
 */
export const register = async (userData) => {
  const response = await api.post(API_ENDPOINTS.register, userData);
  return response.data;
};

/**
 * Busca informações do usuário atual
 */
export const getCurrentUser = async () => {
  const response = await api.get(API_ENDPOINTS.me);
  return response.data;
};

// ============================================
// SERVIÇOS DA API - USER BOOKS (READING LIST)
// ============================================

/**
 * Adiciona um livro à lista de leitura
 * @param {Object} bookData - { book_key, status }
 * status pode ser: "want_to_read", "reading", "read"
 */
export const addToReadingList = async (bookData) => {
  const response = await api.post(API_ENDPOINTS.readingList, bookData);
  return response.data;
};

/**
 * Busca a lista de leitura do usuário
 * @param {string} status - Filtro opcional por status
 */
export const getReadingList = async (status = null) => {
  const params = status ? { status } : {};
  const response = await api.get(API_ENDPOINTS.readingList, { params });
  return response.data;
};

/**
 * Atualiza o status de um livro na lista de leitura
 * @param {string} bookKey - Key do livro
 * @param {string} status - Novo status
 */
export const updateReadingStatus = async (bookKey, status) => {
  const response = await api.put(API_ENDPOINTS.updateReadingStatus(bookKey), { status });
  return response.data;
};

/**
 * Remove um livro da lista de leitura
 * @param {string} bookKey - Key do livro
 */
export const removeFromReadingList = async (bookKey) => {
  const response = await api.delete(API_ENDPOINTS.removeFromReadingList(bookKey));
  return response.data;
};

// ============================================
// SERVIÇOS DA API - FAVORITES
// ============================================

/**
 * Adiciona um livro aos favoritos
 * @param {Object} favoriteData - { book_key }
 */
export const addToFavorites = async (favoriteData) => {
  const response = await api.post(API_ENDPOINTS.favorites, favoriteData);
  return response.data;
};

/**
 * Lista todos os favoritos do usuário
 */
export const getFavorites = async () => {
  const response = await api.get(API_ENDPOINTS.favorites);
  return response.data;
};

/**
 * Remove um livro dos favoritos
 * @param {string} bookKey - Key do livro
 */
export const removeFromFavorites = async (bookKey) => {
  const response = await api.delete(API_ENDPOINTS.removeFavorite(bookKey));
  return response.data;
};

// ============================================
// SERVIÇOS DA API - COMMENTS
// ============================================

/**
 * Busca comentários de um livro
 * @param {string} bookKey - Key do livro
 * @param {number} limit - Limite de comentários
 * @param {number} offset - Offset para paginação
 */
export const getBookComments = async (bookKey, limit = 10, offset = 0) => {
  const response = await api.get(`/comments/book/${encodeURIComponent(bookKey)}`, {
    params: { limit, offset }
  });
  return response.data;
};

/**
 * Cria um novo comentário
 * @param {Object} commentData - { book_key, content }
 */
export const createComment = async (commentData) => {
  const response = await api.post('/comments', commentData);
  return response.data;
};

/**
 * Atualiza um comentário
 * @param {number} commentId - ID do comentário
 * @param {Object} commentData - { content }
 */
export const updateComment = async (commentId, commentData) => {
  const response = await api.put(`/comments/${commentId}`, commentData);
  return response.data;
};

/**
 * Deleta um comentário
 * @param {number} commentId - ID do comentário
 */
export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};

export default api;
