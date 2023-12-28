"use client";
import { ItemProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { CustomButton, ItemDetails } from ".";
import { FallbackImage } from "./ImageFallback";

interface itemCardProps {
  item: ItemProps;
}

const ItemCard = ({ item }: itemCardProps) => {
  const { id, produkId, prdcd, prd_name, prd_category, prd_type, prd_bestseller, prd_desc, prd_asset, prd_thumbnail } = item;
  const [IsOpen, setIsOpen] = useState(false);
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {prd_name}
        </h2>
        {prd_bestseller ? <Image src="/best_seller.gif" alt="Best" width={30} height={30} /> : ''}
      </div>
      <div className="relative h-[500px] my-6 self-center">
        <FallbackImage keyVal={prdcd} detail={false} styles={{ 'borderRadius': '0.75rem', 'height': 'auto', 'width': 'auto', 'objectFit': 'cover', 'maxWidth': '300px', 'maxHeight': '300px' }} src={`/${prd_type}/${prd_thumbnail}`} alt={id} />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={`/${prd_category === 'Pintu' ? 'door' : prd_category === 'Jendela' ? 'window' : 'accessories'}.png`}
              width={20}
              height={20}
              alt="steering"
            />
            <p className="text-[14px] ">{prd_category}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/question.png"
              width={20}
              height={20}
              alt="tipe"
            />
            <p className="text-[14px] ">{prd_type}</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <CustomButton
          title="Detail Produk"
          containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
          textStyles="text-white text-[14px] leading-[17px] font-bold"
          rightIcon="right-arrow.svg"
          handleclick={() => setIsOpen(true)}
        />
      </div>
      <ItemDetails
        isOpen={IsOpen}
        closeModal={() => setIsOpen(false)}
        item={item}
        category={prd_category}
      />
    </div>
  );
};

export default ItemCard;
