export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  category: string;
  release_date: string;
  actors: string[];
  images: string[];
  reviews: string[];
  awards: {
    win: string[];
    nomination: string[];
  };
  directors: string[];
}

export interface MovieFormData {
  title: string;
  description: string;
  genre: string[];
  category: string;
  release_date: string;
  actors: string[];
  images: string[];
  awards: {
    win: string[];
    nomination: string[];
  };
  directors: string[];
}

export interface ApiResponseMovie<T> {
  message: string;
  data: T;
}
