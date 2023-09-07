export type ProductType = ProductProps[];

export interface ProductProps {
  id: number;

  name: string;

  latinName: string;

  slug: string;

  mainCategory: string;

  category: string;

  subCategory: string;

  brand: string;

  price: string;

  stock: string;

  sellCount: string;

  description: string;

  thumbnail: string;

  offer: string;

  createdAt: string;

  updatedAt: string;

  productsValues: ProductValue[];

  timeStartOffer: string;

  timeEndOffer: number;

  productImage: ProductImage[];

  productVideo: ProductVideo[];

  sellerView: SellerView[];

  isSuggest: boolean;

  mainCategorySlug: string;

  categorySlug: string;

  subCategorySlug: string;
}

interface ProductValue {
  id: number;

  filter: string;

  value: string;

  isSpecifications: boolean;
}


interface ProductImage {
  image: string;
}

interface ProductVideo {
  video: string;
}

interface SellerView {
  property: string;

  rate: string;
}