// Configuração da API
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  retries: 2,
};

// Endpoints
export const API_ENDPOINTS = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',

  // Books
  featured: '/books/featured',
  mostRead: '/books/most-read',
  trending: '/books/trending',
  explore: '/books/explore',
  search: '/books/search',
  bookDetail: (id) => `/books/${id}`,
  bookDetailFrontend: (id) => `/books/${id}`,

  // User Books (Reading List)
  readingList: '/user-books/reading-list',
  updateReadingStatus: (bookKey) => `/user-books/reading-list/${bookKey}`,
  removeFromReadingList: (bookKey) => `/user-books/reading-list/${bookKey}`,

  // Favorites
  favorites: '/user-books/favorites',
  removeFavorite: (bookKey) => `/user-books/favorites/${bookKey}`,
};
