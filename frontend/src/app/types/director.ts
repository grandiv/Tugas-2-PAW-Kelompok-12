export interface Director {
  _id: string;
  name: string;
  desc: string;
  birth: {
    date: string;
    country: string;
  };
  images: string[];
  movies: string[];
}

export interface DirectorFormData {
  name: string;
  desc: string;
  birthDate: string;
  country: string;
  images: string[];
}

export interface ApiResponseDirector<T> {
  message: string;
  data: T;
}
