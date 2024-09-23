export interface SearchResult {
  id: string;
  malId: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  status: string;
  image: string;
  imageHash: string;
  cover: string;
  coverHash: string;
  popularity: number;
  description: string;
  rating: number;
  genres: string[];
  color: string;
  totalEpisodes: number;
  currentEpisodeCount: number;
  type: string;
  releaseDate: number;
}

export interface Search {
  currentPage: number;
  hasNextPage: boolean;
  results: SearchResult[];
}
