export interface Watch {
  headers: {
    Referer: string;
  };
  sources: {
    url: string;
    isM3U8: boolean;
    quality: string;
  }[];
  download: string;
}
