"use client";

import { Header, Projects, SearchBar, ItemCard } from "@/components";
import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import NextNProgress from "nextjs-progressbar";
import { useSession } from "next-auth/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function isEmpty(arr: any) {
  return !Array.isArray(arr) || arr.length < 1 || !arr;
}

const MainPage = ({ searchParams }: { searchParams: any }) => {
  const jenis = searchParams.jenis || "";
  const axios = require("axios");
  const [jenisPintu, setJenisPintu] = useState([]);
  const [jenisJendela, setJenisJendela] = useState([]);
  const [jenisAksesoris, setJenisAksesoris] = useState([]);
  const [jenisFeatured, setJenisFeatured] = useState([]);

  const [show, setShow] = useState(true);

  const [tabPintu, setTabPintu] = useState([]);
  const [tabJendela, setTabJendela] = useState([]);
  const [tabAksesoris, setTabAksesoris] = useState([]);
  const [tabFeatured, setTabFeatured] = useState([]);

  const handleShow = () => setShow(false);

  const fetch = (jenis: string) => {
    axios
      .get("/api/produkItem", {
        params: {
          category: jenis,
        },
      })
      .then((response: any) => {
        switch (jenis.toLowerCase()) {
          case "pintu":
            setJenisPintu(response.data.products);
            break;
          case "jendela":
            setJenisJendela(response.data.products);
            break;
          case "aksesoris":
            setJenisAksesoris(response.data.products);
            break;
          default:
            setJenisFeatured(response.data.products);
            break;
        }
      })
      .catch((error: any) => {
        switch (jenis.toLowerCase()) {
          case "pintu":
            setJenisPintu([]);
            break;
          case "jendela":
            setJenisJendela([]);
            break;
          case "aksesoris":
            setJenisAksesoris([]);
            break;
          default:
            setJenisFeatured([]);
            break;
        }
        console.log(error, "error fetch");
      });
  };

  const fetchTab = (jenis: string) => {
    axios
      .get("/api/tabProdukItem", {
        params: {
          category: jenis,
        },
      })
      .then((response: any) => {
        switch (jenis.toLowerCase()) {
          case "pintu":
            setTabPintu(response.data.products);
            break;
          case "jendela":
            setTabJendela(response.data.products);
            break;
          case "aksesoris":
            setTabAksesoris(response.data.products);
            break;
          default:
            setTabFeatured(response.data.products);
            break;
        }
      })
      .catch((error: any) => {
        switch (jenis.toLowerCase()) {
          case "pintu":
            setTabPintu([]);
            break;
          case "jendela":
            setTabJendela([]);
            break;
          case "aksesoris":
            setTabAksesoris([]);
            break;
          default:
            setTabFeatured([]);
            break;
        }
        console.log(error, "error fetch");
      });
  };

  useEffect(() => {
    fetchTab(jenis);
    fetch(jenis);
  }, [jenis]);

  const { data: session, status } = useSession();
  // console.log(session?.user, status, "main page");

  return (
    <main className="overflow-hidden">
      {status === "authenticated" && show && (
        <div
          id="toast-notification"
          className="w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow 
          dark:bg-gray-800 dark:text-gray-300 fixed right-0 bottom-0 z-20 mb-4 ml-4"
          role="alert"
        >
          <div className="flex items-center mb-3">
            <span
              className="bg-green-100 text-green-800 text-xs font-medium 
            mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
            >
              Welcome, Admin {session.user?.name ? session.user?.name : "Admin"}
            </span>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white justify-center items-center 
              flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 
              focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 
              dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={handleShow}
              data-dismiss-target="#toast-notification"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <div className="relative inline-block shrink-0">
              <img
                className="w-12 h-12 rounded-full"
                src={session.user?.image ? session.user?.image : ""}
                alt={session.user?.name ? session.user?.name : "Admin"}
              />
            </div>
            <div className="ml-3 text-sm font-normal">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                Logged in as {session.user?.name ? session.user?.name : "Admin"}
              </div>
            </div>
          </div>
        </div>
      )}
      <Header />
      <div className="mt-12 padding-x padding-y width-full" id="produk">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Cari Produk</h1>
          <p>Cari Pintu/Jendela/Aksesoris</p>
        </div>
        <div className="home__filters">
          <SearchBar />
        </div>
        {jenis === "pintu" ? (
          <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className=" w-full flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {tabPintu ? (
                  tabPintu.length > 0 &&
                  tabPintu.map((val: any) => (
                    <Tab
                      key={val.title}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {val.title}
                    </Tab>
                  ))
                ) : (
                  <Tab
                    key={`${jenis}-none`}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {"Produk belum ada!"}
                  </Tab>
                )}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {jenisPintu ? (
                  jenisPintu.length > 0 &&
                  jenisPintu.map((val: any, idx: number) => (
                    <Tab.Panel
                      key={idx}
                      className={classNames(
                        "rounded-xl bg-white p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2"
                      )}
                    >
                      <section>
                        {isEmpty(val.items) ? (
                          <div className="text-center mt-10">
                            <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                          </div>
                        ) : (
                          <div className="home__cars-wrapper">
                            {val.items?.map((item: any, i: number) => (
                              <ItemCard key={i} item={item} />
                            ))}
                          </div>
                        )}
                      </section>
                    </Tab.Panel>
                  ))
                ) : (
                  <section>
                    <div className="text-center mt-10">
                      <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                    </div>
                  </section>
                )}
              </Tab.Panels>
            </Tab.Group>
          </div>
        ) : jenis === "jendela" ? (
          <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className=" w-full flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {tabJendela ? (
                  tabJendela.length > 0 &&
                  tabJendela.map((val: any) => (
                    <Tab
                      key={val.title}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {val.title}
                    </Tab>
                  ))
                ) : (
                  <Tab
                    key={`${jenis}-none`}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {"Produk belum ada!"}
                  </Tab>
                )}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {jenisJendela ? (
                  jenisJendela.length > 0 &&
                  jenisJendela.map((val: any, idx: number) => (
                    <Tab.Panel
                      key={idx}
                      className={classNames(
                        "rounded-xl bg-white p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      <section>
                        {isEmpty(val.items) ? (
                          <div className="text-center mt-10">
                            <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                          </div>
                        ) : (
                          <div className="home__cars-wrapper">
                            {val.items?.map((item: any, i: number) => (
                              <ItemCard key={i} item={item} />
                            ))}
                          </div>
                        )}
                      </section>
                    </Tab.Panel>
                  ))
                ) : (
                  <section>
                    <div className="text-center mt-10">
                      <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                    </div>
                  </section>
                )}
              </Tab.Panels>
            </Tab.Group>
          </div>
        ) : jenis === "aksesoris" ? (
          <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className=" w-full flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {tabAksesoris ? (
                  tabAksesoris.length > 0 &&
                  tabAksesoris.map((val: any) => (
                    <Tab
                      key={val.title}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {val.title}
                    </Tab>
                  ))
                ) : (
                  <Tab
                    key={`${jenis}-none`}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {"Produk belum ada!"}
                  </Tab>
                )}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {jenisAksesoris ? (
                  jenisAksesoris.length > 0 &&
                  jenisAksesoris.map((val: any, idx: number) => (
                    <Tab.Panel
                      key={idx}
                      className={classNames(
                        "rounded-xl bg-white p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      <section>
                        {isEmpty(val.items) ? (
                          <div className="text-center mt-10">
                            <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                          </div>
                        ) : (
                          <div className="home__cars-wrapper">
                            {val.items?.map((item: any, i: number) => (
                              <ItemCard key={i} item={item} />
                            ))}
                          </div>
                        )}
                      </section>
                    </Tab.Panel>
                  ))
                ) : (
                  <section>
                    <div className="text-center mt-10">
                      <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                    </div>
                  </section>
                )}
              </Tab.Panels>
            </Tab.Group>
          </div>
        ) : jenis === "featured" ? (
          <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className=" w-full flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {tabFeatured ? (
                  tabFeatured.length > 0 &&
                  tabFeatured.map((val: any) => (
                    <Tab
                      key={val.title}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {val.title}
                    </Tab>
                  ))
                ) : (
                  <Tab
                    key={`${jenis}-none`}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {"Produk belum ada!"}
                  </Tab>
                )}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {jenisFeatured ? (
                  jenisFeatured.length > 0 &&
                  jenisFeatured.map((val: any, idx: number) => (
                    <Tab.Panel
                      key={idx}
                      className={classNames(
                        "rounded-xl bg-white p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      <section>
                        {isEmpty(val.items) ? (
                          <div className="text-center mt-10">
                            <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                          </div>
                        ) : (
                          <div className="home__cars-wrapper">
                            {val.items?.map((item: any, i: number) => (
                              <ItemCard key={i} item={item} />
                            ))}
                          </div>
                        )}
                      </section>
                    </Tab.Panel>
                  ))
                ) : (
                  <section>
                    <div className="text-center mt-10">
                      <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                    </div>
                  </section>
                )}
              </Tab.Panels>
            </Tab.Group>
          </div>
        ) : (
          <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className=" w-full flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {tabFeatured ? (
                  tabFeatured.length > 0 &&
                  tabFeatured.map((val: any) => (
                    <Tab
                      key={val.title}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                          selected
                            ? "bg-white shadow"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {val.title}
                    </Tab>
                  ))
                ) : (
                  <Tab
                    key={`${jenis}-none`}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm leading-5 text-slate-950 font-bold",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {"Produk belum ada!"}
                  </Tab>
                )}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {jenisFeatured ? (
                  jenisFeatured.length > 0 &&
                  jenisFeatured.map((val: any, idx: number) => (
                    <Tab.Panel
                      key={idx}
                      className={classNames(
                        "rounded-xl bg-white p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      <section>
                        {isEmpty(val.items) ? (
                          <div className="text-center mt-10">
                            <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                          </div>
                        ) : (
                          <div className="home__cars-wrapper">
                            {val.items?.map((item: any, i: number) => (
                              <ItemCard key={i} item={item} />
                            ))}
                          </div>
                        )}
                      </section>
                    </Tab.Panel>
                  ))
                ) : (
                  <section>
                    <div className="text-center mt-10">
                      <h2 className="text-black text-xl font-bold">Produk belum ada!</h2>
                    </div>
                  </section>
                )}
              </Tab.Panels>
            </Tab.Group>
          </div>
        )}
      </div>
      <Projects />
    </main>
  );
};

export default MainPage;
