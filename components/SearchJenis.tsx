"use client";

import { SearchJenisProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { useState, Fragment } from "react";
import { JenisProduk } from "@/constants";
import { useRouter } from "next/navigation";

const SearchJenis = ({ jenis, setJenis }: SearchJenisProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const filteredJenis =
    query === ""
      ? JenisProduk
      : JenisProduk.filter((item) =>
        item
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  const onOptionChange = (option: string) => {
    setQuery(option.toLowerCase());
    const searchParams = new URLSearchParams(window.location.search);
    if (option) {
      searchParams.set("jenis", option.toLowerCase());
    } else {
      searchParams.delete("jenis");
    }

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathName, { scroll: false });
  };

  return (
    <div className="search-manufacturer">
      <Combobox value={jenis} onChange={setJenis}>
        <div className="relative w-full">
          <Combobox.Button className={"absolute top-[14px]"}>
            <Image
              src="/question.png"
              width={20}
              height={20}
              className="ml-4"
              alt="Jenis"
            ></Image>
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Pintu/Jendela/Aksesoris"
            displayValue={(jenis: string) => jenis}
            onChange={(e) => {
              setJenis(e.target.value);
              onOptionChange(e.target.value);
            }}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filteredJenis.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {item}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox >
    </div >
  );
};

export default SearchJenis;
