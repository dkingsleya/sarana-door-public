"use client";

import React, { FormEvent, useEffect } from "react";
import {
  Badge,
  Button,
  FileInput,
  Label,
  Modal,
  Radio,
  Select,
  Spinner,
  Table,
  Tabs,
  TabsComponent,
  TabsRef,
  TextInput,
  Toast,
} from "flowbite-react";
import { useRef, useState } from "react";
import { BsCheck, BsDoorClosed, BsExclamationCircle, BsFileDiff, BsFileMinus, BsFilePlus, BsSearch } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { TbWindow } from "react-icons/tb";

const ModifyItem = ({
  jenis1,
  jenis2,
  jenis3,
}: {
  jenis1: string;
  jenis2: string;
  jenis3: string;
}) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tabPintu, setTabPintu] = useState([]);
  const [tabJendela, setTabJendela] = useState([]);
  const [tabAksesoris, setTabAksesoris] = useState([]);
  const [transactionDone, setTransactionDone] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openAlertMessage, setOpenAlertMessage] = useState('');
  const [currentModal, setCurrentModal] = useState("");
  const [dataModal, setDataModal] = useState([]);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const axios = require("axios");

  const fetchData = async (jenis: string) => {
    axios
      .get("/api/dataProduk", {
        params: {
          type: jenis,
        },
      })
      .then((response: any) => {
        console.log(response.data.data.items);
        setDataModal(response.data.data.items);
      })
      .catch((error: any) => {
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
            break;
        }
        console.log(error, "error fetch");
      });
  };

  useEffect(() => {
    fetchTab(jenis1);
    fetchTab(jenis2);
    fetchTab(jenis3);
  }, [jenis1, jenis2, jenis3]);

  const insertItem = async (event: any) => {
    event.preventDefault();
    let asset_files = event.target.elements[5].files;
    let assets: {
      prd_asset: string[];
    } = {
      prd_asset: [],
    };

    for (const file of asset_files) {
      assets.prd_asset.push(file.name);
    }

    setLoading(true);
    await axios
      .post(
        "/api/transaction/insertItem",
        {
          prdcd: event.target.elements[0].value,
          prd_name: event.target.elements[1].value,
          prd_category: event.target.elements[2].value,
          prd_type: event.target.elements[3].value,
          prd_thumbnail_img: event.target.elements[4].files.length > 0 ? event.target.elements[4].files : null,
          prd_thumbnail: event.target.elements[4].files.length > 0 ? event.target.elements[4].files[0].name : null,
          prd_asset_img: event.target.elements[5].files.length > 0 ? event.target.elements[5].files : null,
          prd_asset: assets.prd_asset,
          prd_best: event.target.elements[7].checked,
          size_1: event.target.elements[9].value,
          size_2: event.target.elements[10].value,
          key_type: event.target.elements[11].value,
          variant: event.target.elements[12].value,
          superiority: event.target.elements[13].value,
          usecase: event.target.elements[14].value,
          note: event.target.elements[15].value,
          type: event.target.elements[16].value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((data: any) => {
        setLoading(false);
        setTransactionDone('INSERT');
        setOpenAlertMessage(data.data.data.prd_name + ' Added.');
        setOpenAlertModal(true);
        setFormData([]);
        setDataModal([]);
        console.log(transactionDone, data, data.data.data.prd_name);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
        setTransactionDone('ERROR');
        setOpenAlertMessage(e.message);
        setOpenAlertModal(true);
      });
  };

  const updateItem = async (event: any) => {
    event.preventDefault();
    let asset_files = event.target.elements[6].files ? event.target.elements[6].files : [];
    let assets: {
      prd_asset: string[];
    } = {
      prd_asset: [],
    };

    for (const file of asset_files) {
      assets.prd_asset.push(file.name);
    }

    setLoading(true);
    await axios
      .post(
        "/api/transaction/updateItem",
        {
          prdcd: event.target.elements[0].value,
          prd_name: event.target.elements[2].value,
          prd_category: event.target.elements[3].value,
          prd_type: event.target.elements[4].value,
          prd_thumbnail_img: event.target.elements[5].files.length > 0 ? event.target.elements[5].files : null,
          prd_thumbnail: event.target.elements[5].files.length > 0
            ? event.target.elements[5].files[0].name
            : null,
          prd_asset_img: event.target.elements[6].files.length > 0 ? event.target.elements[6].files : null,
          prd_asset: assets.prd_asset,
          prd_best: event.target.elements[8].checked,
          size_1: event.target.elements[10].value,
          size_2: event.target.elements[11].value,
          key_type: event.target.elements[12].value,
          variant: event.target.elements[13].value,
          superiority: event.target.elements[14].value,
          usecase: event.target.elements[15].value,
          note: event.target.elements[16].value,
          type: event.target.elements[17].value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((data: any) => {
        setLoading(false);
        setTransactionDone('UPDATE');
        setOpenAlertMessage(data.data.data.prd_name + ' Updated.');
        setOpenAlertModal(true);
        console.log(transactionDone, data);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
        setTransactionDone('ERROR');
        setOpenAlertMessage(e.message);
        setOpenAlertModal(true);
      });
  };

  const deleteItem = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    await axios
      .post(
        "/api/transaction/deleteItem",
        {
          prdcd: event.target.elements[0].value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((data: any) => {
        setLoading(false);
        setTransactionDone('DELETE');
        setOpenAlertMessage(data.data.data.prd_name + ' Deleted.');
        setOpenAlertModal(true);
        console.log(transactionDone, data);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
        setTransactionDone('ERROR');
        setOpenAlertMessage(e.message);
        setOpenAlertModal(true);
      });
  };

  function tableContent(idx: number, val: any): React.JSX.Element {
    return (
      <Table.Body className="divide-y cursor-pointer" key={idx + 'body'}>
        <Table.Row
          key={idx + 'row'}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
          onClick={() => {
            setFormData(val);
            setOpenModal(false);
            setDataModal([]);
          }}
        >
          <Table.Cell
            className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
            key={idx + val.id}
          >
            {val.id}
          </Table.Cell>
          <Table.Cell key={idx + val.prd_category}>{val.prd_category}</Table.Cell>
          <Table.Cell key={idx + val.prd_type}>{val.prd_type}</Table.Cell>
          <Table.Cell key={idx + val.prd_name}>{val.prd_name}</Table.Cell>
          <Table.Cell key={idx + val.prdcd}>{val.prdcd}</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }

  function tabItems(idx: number, val: any, jenis: string): React.JSX.Element {
    return (
      <Tabs.Item
        key={idx}
        title={val.title}
        icon={
          jenis.toUpperCase() == "PINTU"
            ? BsDoorClosed
            : jenis.toUpperCase() == "JENDELA"
              ? TbWindow
              : FaGear
        }
      >
        <Modal
          show={openModal}
          onClose={() => {
            setOpenModal(false);
            setCurrentModal("");
            setDataModal([]);
          }}
          size="3xl"
        >
          <Modal.Header>List Item {currentModal}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell key={'id'}>ID</Table.HeadCell>
                  <Table.HeadCell key={'category'}>Category</Table.HeadCell>
                  <Table.HeadCell key={'name'}>Name</Table.HeadCell>
                  <Table.HeadCell key={'type'}>Type</Table.HeadCell>
                  <Table.HeadCell key={'prdcd'}>Product Code</Table.HeadCell>
                </Table.Head>
                {dataModal && dataModal.length > 0 ? (
                  dataModal.map((val: any, idx: number) => tableContent(idx, val))
                ) : (
                  <>
                    <Table.Cell
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                    </Table.Cell>
                    <Table.Cell
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                    </Table.Cell>
                    <Table.Cell
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                      {"Loading Data..."}
                    </Table.Cell>
                  </>
                )}
              </Table>
            </div>
          </Modal.Body>
        </Modal>
        <TabsComponent
          aria-label="Default tabs"
          style="default"
          ref={tabsRef}
          onActiveTabChange={(tab) => {
            setActiveTab(tab);
            setDataModal([]);
          }}
        >
          <Tabs.Item key={idx} title={"Insert"} icon={BsFilePlus}>
            <Badge color="success" size="sm" className="max-w-md">
              Insert {val.title}
            </Badge>
            {insertProduct(val, jenis)}
          </Tabs.Item>
          <Tabs.Item key={idx} title={"Update"} icon={BsFileDiff}>
            <Badge color="info" size="sm" className="max-w-md">
              Update {val.title}
            </Badge>
            {updateProduct(val, jenis)}
          </Tabs.Item>
          <Tabs.Item key={idx} title={"Delete"} icon={BsFileMinus}>
            <Badge color="failure" size="sm">
              Delete {val.title}
            </Badge>
            {deleteProduct(val, jenis)}
          </Tabs.Item>
        </TabsComponent>
      </Tabs.Item>
    );
  }

  function insertProduct(val: any, jenis: string): React.JSX.Element {
    return (
      <section className="mt-4">
        <form onSubmit={insertItem} encType="multipart/form-data">
          <section className="grid grid-cols-2">
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prdcd_" + val.title} value="Product Code" />
              </div>
              <TextInput
                id={"prdcd_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prd_name_" + val.title} value="Product Name" />
              </div>
              <TextInput
                id={"prd_name_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prd_category_" + val.title} value="Product Category" />
              </div>
              <TextInput
                id={"prd_category_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                value={jenis}
                disabled
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prd_type_" + val.title} value="Product Type" />
              </div>
              <TextInput
                id={"prd_type_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                value={val.title}
                disabled
              />
            </div>
            <div id="fileUploadThumb" className="max-w-md mb-4">
              <div className="mb-2 block">
                <Label htmlFor={"prd_thumbnail_" + val.title} value="Upload Thumbnail" />
              </div>
              <FileInput
                id={"prd_thumbnail_" + val.title}
                accept="image/png"
                helperText="Upload Gambar Utama Produk (.png only)"
              />
            </div>
            <div id="fileUploadAsset" className="max-w-md mb-4">
              <div className="mb-2 block">
                <Label htmlFor={"prd_asset_" + val.title} value="Upload Assets" />
              </div>
              <FileInput
                id={"prd_asset_" + val.title}
                helperText="Upload Aset Produk, anda dapat memilih lebih dari 1 file (.png & .mp4 only)"
                multiple
              />
            </div>
            <fieldset className="flex max-w-md flex-col gap-4 mb-4">
              <legend className="mb-4">Best Seller Product</legend>
              <div className="flex items-center gap-2">
                <Radio id={"best_" + val.title} name="best-seller" value="best" defaultChecked />
                <Label htmlFor={"best_" + val.title}>Best Seller</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id={"non-best_" + val.title} name="best-seller" value="non-best" />
                <Label htmlFor={"non-best_" + val.title}>Non Best Seller</Label>
              </div>
            </fieldset>
            <div>
              <span>
                *Note: Pastikan nama <span className="font-bold">File Thumbnail</span> sama dengan{" "}
                <span className="font-bold">Product Code</span>
                <br />
                <span className="italic">Contoh: Product Code: AA123, Nama file: AA123.png</span>
                <br />
                <br />
                <p>
                  *Note: Format penamaan file bila file lebih dari satu: AA123.png, AA123_1.png,
                  AA123_2.png
                </p>
              </span>
            </div>
          </section>
          <section className="grid grid-cols-2 mt-4 border-t-4 pt-4">
            <legend className="mb-4">
              <span>
                Note: Pastikan untuk{" "}
                <span className="text-blue-800 font-bold">kotak input warna biru</span>, apabila ada
                lebih dari satu item,{" "}
                <span className="text-red-600 font-bold">tiap item pisahkan dengan ',' (koma)</span>
                <br />
                Contoh: Warna Putih, Warna Hitam
              </span>
            </legend>
            <div></div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"size_1_" + val.title} value="Size 1" />
              </div>
              <TextInput
                id={"size_1_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Untuk Produk Pintu: Ukuran Kusen, Untuk Produk Jendela: Ukuran Luar"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"size_2_" + val.title} value="Size 2" />
              </div>
              <TextInput
                id={"size_2_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Untuk Produk Pintu: Ukuran Daun, Untuk Produk Jendela: Ukuran Dalam"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"key_type_" + val.title} value="Key Type" />
              </div>
              <TextInput
                id={"key_type_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                helperText="Untuk Produk Pintu: Jenis Kunci, Untuk Produk Jendela: Ukuran Dalam"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"variant_" + val.title} value="Variant" />
              </div>
              <TextInput
                id={"variant_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                helperText="Contoh: Warna Merah, Warna Biru ..."
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"superiority_" + val.title} value="Superiority" />
              </div>
              <TextInput
                id={"superiority_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Contoh: Anti Karat, Anti Jamur ..."
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"usecase_" + val.title} value="Use Case" />
              </div>
              <TextInput
                id={"usecase_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Contoh: Pintu Kamar, Jendela Dapur, Aksesoris Pintu ..."
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"note_" + val.title} value="Note" />
              </div>
              <TextInput
                id={"note_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                helperText="Catatan tambahan mengenai produk"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"type_" + val.title} value="Type" />
              </div>
              <TextInput
                id={"type_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Contoh: Tipe Muriko, Tipe Fuso ..."
                autoComplete="off"
              />
            </div>
          </section>
          <section>
            <div>
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Insert Product
              </button>
            </div>
          </section>
        </form>
      </section>
    );
  }

  function updateProduct(val: any, jenis: string): React.JSX.Element {
    return (
      <section className="mt-4">
        <form onSubmit={updateItem} encType="multipart/form-data">
          <section className="grid grid-cols-2">
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prdcd_" + val.title} value="Product Code" />
              </div>
              <div className="inline-flex">
                <TextInput
                  id={"prdcd_" + val.title}
                  value={Object.keys(formData).length ? (formData as any).prdcd : ""}
                  type="text"
                  sizing="md"
                  className="w-full"
                  required
                  autoComplete="off"
                  disabled
                  readOnly
                />
                <Button
                  className="bg-slate-800"
                  onClick={() => {
                    setOpenModal(true);
                    setCurrentModal(val.title);
                    fetchData(val.title);
                  }}
                >
                  <BsSearch />
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prd_name_" + val.title} value="Product Name" />
              </div>
              <TextInput
                id={"prd_name_" + val.title}
                defaultValue={Object.keys(formData).length ? (formData as any).prd_name : ""}
                type="text"
                sizing="md"
                className="max-w-md"
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prd_category_" + val.title} value="Product Category" />
              </div>
              <TextInput
                id={"prd_category_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                defaultValue={jenis}
                disabled
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prd_type_" + val.title} value="Product Type" />
              </div>
              <TextInput
                id={"prd_type_" + val.title}
                type="text"
                sizing="md"
                className="max-w-md"
                defaultValue={val.title}
                disabled
              />
            </div>
            <div id="fileUploadThumb" className="max-w-md mb-4">
              <div className="mb-2 block">
                <Label htmlFor={"prd_thumbnail_" + val.title} value="Upload Thumbnail" />
              </div>
              <FileInput
                id={"prd_thumbnail_" + val.title}
                accept="image/png"
                helperText="Upload Gambar Utama Produk (.png only)"
              />
            </div>
            <div id="fileUploadAsset" className="max-w-md mb-4">
              <div className="mb-2 block">
                <Label htmlFor={"prd_asset_" + val.title} value="Upload Assets" />
              </div>
              <FileInput
                id={"prd_asset_" + val.title}
                helperText="Upload Aset Produk, anda dapat memilih lebih dari 1 file (.png & .mp4 only)"
                multiple
              />
            </div>
            <fieldset className="flex max-w-md flex-col gap-4 mb-4">
              <legend className="mb-4">Best Seller Product</legend>
              <div className="flex items-center gap-2">
                <Radio
                  id={"best_" + val.title}
                  name="best-seller"
                  value="best"
                  checked={formData ? ((formData as any).prd_bestseller ? true : false) : false}
                />
                <Label htmlFor={"best_" + val.title}>Best Seller</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id={"non-best_" + val.title}
                  name="best-seller"
                  value="non-best"
                  checked={formData ? ((formData as any).prd_bestseller ? false : true) : false}
                />
                <Label htmlFor={"non-best_" + val.title}>Non Best Seller</Label>
              </div>
            </fieldset>
            <div>
              <span>
                *Note: Pastikan nama <span className="font-bold">File Thumbnail</span> sama dengan{" "}
                <span className="font-bold">Product Code</span>
                <br />
                <span className="italic">Contoh: Product Code: AA123, Nama file: AA123.png</span>
                <br />
                <br />
                <p>
                  *Note: Format penamaan file bila file lebih dari satu: AA123.png, AA123_1.png,
                  AA123_2.png
                </p>
              </span>
            </div>
          </section>
          <section className="grid grid-cols-2 mt-4 border-t-4 pt-4">
            <legend className="mb-4">
              <span>
                Note: Pastikan untuk{" "}
                <span className="text-blue-800 font-bold">kotak input warna biru</span>, apabila ada
                lebih dari satu item,{" "}
                <span className="text-red-600 font-bold">tiap item pisahkan dengan ',' (koma)</span>
                <br />
                Contoh: Warna Putih, Warna Hitam
              </span>
            </legend>
            <div></div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"size_1_" + val.title} value="Size 1" />
              </div>
              <TextInput
                id={"size_1_" + val.title}
                defaultValue={
                  Object.keys(formData).length
                    ? (formData as any).prd_desc.map((val: any) => val.size1.toString())
                    : ""
                }
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Untuk Produk Pintu: Ukuran Kusen, Untuk Produk Jendela: Ukuran Luar"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"size_2_" + val.title} value="Size 2" />
              </div>
              <TextInput
                id={"size_2_" + val.title}
                defaultValue={
                  Object.keys(formData).length
                    ? (formData as any).prd_desc.map((val: any) => val.size2.toString())
                    : ""
                }
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Untuk Produk Pintu: Ukuran Daun, Untuk Produk Jendela: Ukuran Dalam"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"key_type_" + val.title} value="Key Type" />
              </div>
              <TextInput
                id={"key_type_" + val.title}
                defaultValue={
                  Object.keys(formData).length
                    ? (formData as any).prd_desc.map((val: any) => val.key_type.toString())
                    : ""
                }
                type="text"
                sizing="md"
                className="max-w-md"
                helperText="Untuk Produk Pintu: Jenis Kunci, Untuk Produk Jendela: Ukuran Dalam"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"variant_" + val.title} value="Variant" />
              </div>
              <TextInput
                id={"variant_" + val.title}
                defaultValue={
                  Object.keys(formData).length
                    ? (formData as any).prd_desc.map((val: any) => val.variant.toString())
                    : ""
                }
                type="text"
                sizing="md"
                className="max-w-md"
                helperText="Contoh: Warna Merah, Warna Biru ..."
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"superiority_" + val.title} value="Superiority" />
              </div>
              <TextInput
                id={"superiority_" + val.title}
                defaultValue={
                  Object.keys(formData).length
                    ? (formData as any).prd_desc.map((val: any) => val.superiority.toString())
                    : ""
                }
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Contoh: Anti Karat, Anti Jamur ..."
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"usecase_" + val.title} value="Use Case" />
              </div>
              <TextInput
                id={"usecase_" + val.title}
                defaultValue={
                  Object.keys(formData).length
                    ? (formData as any).prd_desc.map((val: any) => val.usecase.toString())
                    : ""
                }
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Contoh: Pintu Kamar, Jendela Dapur, Aksesoris Pintu ..."
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"note_" + val.title} value="Note" />
              </div>
              <TextInput
                id={"note_" + val.title}
                defaultValue={
                  Object.keys(formData).length
                    ? (formData as any).prd_desc.map((val: any) => val.note.toString())
                    : ""
                }
                type="text"
                sizing="md"
                className="max-w-md"
                helperText="Catatan tambahan mengenai produk"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"type_" + val.title} value="Type" />
              </div>
              <TextInput
                id={"type_" + val.title}
                defaultValue={
                  Object.keys(formData).length
                    ? (formData as any).prd_desc.map((val: any) => val.type.toString())
                    : ""
                }
                type="text"
                sizing="md"
                className="max-w-md"
                color="info"
                helperText="Contoh: Tipe Muriko, Tipe Fuso ..."
                autoComplete="off"
              />
            </div>
          </section>
          <section>
            <div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Product
              </button>
            </div>
          </section>
        </form>
      </section>
    );
  }

  function deleteProduct(val: any, jenis: string): React.JSX.Element {
    return (
      <section className="mt-4">
        <form onSubmit={deleteItem} encType="multipart/form-data">
          <section className="grid grid-cols-2">
            <div className="mb-4">
              <div className="mb-2 block max-w-md">
                <Label htmlFor={"prdcd_" + val.title} value="Product Code" />
              </div>
              <div className="inline-flex">
                <TextInput
                  id={"prdcd_" + val.title}
                  defaultValue={Object.keys(formData).length ? (formData as any).prdcd : ""}
                  type="text"
                  sizing="md"
                  className="w-full"
                  required
                  autoComplete="off"
                />
                <Button
                  className="bg-slate-800"
                  onClick={() => {
                    setOpenModal(true);
                    setCurrentModal(val.title);
                    fetchData(val.title);
                  }}
                >
                  <BsSearch />
                </Button>
              </div>
            </div>
          </section>
          <section>
            <div>
              <button
                type="submit"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete Product
              </button>
            </div>
          </section>
        </form>
      </section>
    );
  }

  return (
    <>
      <section>
        <div className="flex flex-col gap-3">
          <TabsComponent
            aria-label="Default tabs"
            style="default"
            ref={tabsRef}
            onActiveTabChange={(tab) => {
              setActiveTab(tab);
              setDataModal([]);
              setFormData([]);
            }}
          >
            {tabPintu &&
              tabPintu &&
              tabPintu.map((val: any, idx: number) => tabItems(idx, val, "Pintu"))}
          </TabsComponent>
        </div>
      </section>
      <section className="mt-40">
        <div className="flex flex-col gap-3">
          <TabsComponent
            aria-label="Default tabs"
            style="default"
            ref={tabsRef}
            onActiveTabChange={(tab) => {
              setActiveTab(tab);
              setDataModal([]);
              setFormData([]);
            }}
          >
            {tabJendela &&
              tabJendela &&
              tabJendela.map((val: any, idx: number) => tabItems(idx, val, "Jendela"))}
          </TabsComponent>
        </div>
      </section>
      <section className="mt-40">
        <div className="flex flex-col gap-3">
          <TabsComponent
            aria-label="Default tabs"
            style="default"
            ref={tabsRef}
            onActiveTabChange={(tab) => {
              setActiveTab(tab);
              setDataModal([]);
              setFormData([]);
            }}
          >
            {tabAksesoris &&
              tabAksesoris &&
              tabAksesoris.map((val: any, idx: number) => tabItems(idx, val, "Aksesoris"))}
          </TabsComponent>
        </div>
      </section>
      <Modal show={openAlertModal} size="md" onClose={() => setOpenAlertModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {openAlertMessage}
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setOpenAlertModal(false)}>
                {"OK"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={loading} size={'sm'}>
        <Modal.Body>
          <div className="space-y-6 text-center">
            <Badge color="info" className="justify-center">Loading</Badge>
            <div className="mt-6">
              <Spinner aria-label="Center-aligned spinner example" size="xl" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModifyItem;
