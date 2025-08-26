export type ProductComments = {
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
};

export type ProductDetails = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  price: number;
  rating: number;
  description: string;
  stock: number;
  category: string;
  tags: string[];
  images: string[];
  comments: ProductComments[]
  createdAt: string;
  updatedAt: string;
};




export type ProductImage = string;