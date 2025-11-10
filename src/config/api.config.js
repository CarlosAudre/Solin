// Configuração da API
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  retries: 2,
};

// Endpoints
export const API_ENDPOINTS = {
  // Endpoints do frontend
  featured: '/books/featured',
  mostRead: '/books/most-read',
  trending: '/books/trending',
  explore: '/books/explore',
  searchFrontend: '/books/frontend/search',
  bookDetailFrontend: (id) => `/books/frontend/${id}`,

  // Endpoints originais (para compatibilidade)
  search: '/books/search',
  bookDetail: (id) => `/books/${id}`,

  // Favoritos e histórico
  favorites: '/books/favorites',
  favoritesList: '/books/favorites/list',
  removeFavorite: (id) => `/books/favorites/${id}`,
  readingProgress: '/books/reading-progress',
  readingHistory: '/books/reading-history/list',
};
