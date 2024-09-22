export interface Recent {
  id: string;
  malId: string;
  title: {
    romaji?: string;
    english?: string;
    native?: string;
  };
  image: string;
  cover: string;
  imageHash: string;
  episodeId: string;
  episodeTitle: string;
  episodeNumber: number;
  type: string;
  color?: string;
}
