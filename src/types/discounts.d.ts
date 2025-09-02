export interface Discounts {
  _id: string;
  code: string;
  maxUse: number;
  uses: number;
  percent: number;
  product: {
    _id: string;
    title: string;
  };
  usedBy: string[];
  createdAt: string;
}
