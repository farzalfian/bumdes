export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailURL: string;
  imageURL: string[];
  stockStatus: boolean;
  stockAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageGallery {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}