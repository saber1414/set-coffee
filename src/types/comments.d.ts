export interface Comments {
  _id: string;
  name: string;
  email: string;
  body: string;
  score: number;
  product: {
    _id: string;
    title: string;
  };
  isAccept: boolean;
  isRejected: boolean;
  replyBody: string;
  replyAuthor: string;
}
