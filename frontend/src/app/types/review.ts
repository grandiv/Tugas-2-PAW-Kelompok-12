export interface Review {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  score: number;
  comment: string;
}
