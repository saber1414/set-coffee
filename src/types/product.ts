export interface Comments {
  _id: string;
  name: string;
  email: string;
  body: string;
  score: number;
  product: string;
  isReplied: boolean;
  replyBody: string;
  replyAuthor: string;
  isRejected: boolean;
  isAccept: boolean;
  date: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  rating: number;
  shortDescription: string;
  description: string;
  stock: 200;
  category: string;
  comments: Comments[];
  images: string[];
  tags: string[];
  details: string;
}
