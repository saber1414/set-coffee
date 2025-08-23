import { ProductDetails } from "@/types/product";
import React from "react";

type DescriptionProps = {
  product: ProductDetails;
};

const Description = ({ product }: DescriptionProps) => {
  return (
    <>
      <p>توضیحات :</p>
      <hr />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </>
  );
};

export default Description;
