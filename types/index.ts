import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  handleclick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit" | "reset";
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface ImageFallbackProps {
  keyVal: string;
  src: string;
  alt: any;
  styles?: any;
  detail: boolean;
}

export interface SearchJenisProps {
  jenis: string;
  setJenis: (tipe: string) => void;
}

export interface SearchTipePintuProps {
  tipePintu: string;
  setTipePintu: (tipe: string) => void;
}

export interface ItemDetailProps {
  size1?: string[];
  size2?: number;
  key_type?: string;
  variant?: string;
  superiority?: string[];
  usecase?: string[];
  note?: string;
  type?: string[];
}

export interface ItemProps {
  id: number;
  produkId: number;
  prdcd: string;
  prd_name: string;
  prd_category: string;
  prd_type: string;
  prd_bestseller: boolean;
  prd_desc: ItemDetailProps[];
  prd_asset?: Array<string>;
  prd_thumbnail?: Array<string>;
}