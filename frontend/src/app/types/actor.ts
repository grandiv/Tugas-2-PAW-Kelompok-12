export interface Actor {
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

export interface ActorFormData {
  name: string;
  desc: string;
  birthDate: string;
  country: string;
  images: string[];
}

export interface ApiResponse {
  message: string;
}
