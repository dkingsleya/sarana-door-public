"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchJenis from "./SearchJenis";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses} bg-[url('/search.gif')]`}>
    <Image
      src="/search.gif"
      alt="search"
      width={20}
      height={20}
      className="object-contain"
    />
  </button>
);

function SearchBar() {
  const [jenis, setJenis] = useState("");
  const [tipe, setTipe] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (jenis === "" && tipe === "") {
      updateSearchParams('featured', '');
    }

    updateSearchParams(jenis.toLowerCase(), tipe.toLowerCase());
  };

  const updateSearchParams = (jenis: string, tipe: string) => {
    const searchParamas = new URLSearchParams(window.location.search);
    if (jenis) {
      searchParamas.set("jenis", jenis.toLowerCase());
    } else {
      searchParamas.delete("jenis");
    }

    if (tipe) {
      searchParamas.set("tipe", tipe.toLowerCase());
    } else {
      searchParamas.delete("tipe");
    }

    const newPathName = `${window.location.pathname
      }?${searchParamas.toString()}`;

    router.push(newPathName, { scroll: false });
  };

  return (
    <form className="searchbar" onSubmit={handleSearch} id="searchBar">
      <div className="searchbar__item">
        <SearchJenis jenis={jenis} setJenis={setJenis} />
      </div>
      <div className="mx-5">
        <button type="submit" className={`ml-1 z-10 max:hidden bg-[url('/search.gif')] center mt-3`}>
          <Image
            src="/search.gif"
            alt="search"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
