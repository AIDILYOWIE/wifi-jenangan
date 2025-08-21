import BaseLayout from "../../../components/layouts/BaseLayout";
import {
  AddOutlinedIcon,
  PeopleAltOutlinedIcon,
  Person4Icon,
  PrintIcon,
} from "../../../assets/RegisterAsset";
import Table from "./Datagrid/Table";
import { useEffect, useState } from "react";
import HeaderPage from "../../../components/fragments/Header";
import { api, updateToastToError, updateToastToSuccess } from "../../../utils/helper/helper";
import { useDataContext } from "../../../../context/SendDataContext";
import PopupDelete from "./Action/PopUp";
import { ImgNull } from "../../../assets/RegisterAsset";
import Pagination from "../../../components/fragments/Pagination";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddCollector from "./Action/AddCollector";

const Kolektor = () => {
  const [open, setOpen] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [selectedId, setSelectedId] = useState(null)

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";

  const [newCode, setNewCode] = useState("");
  const { type, setType, setData, data } = useDataContext();
  const [paginateData, setPaginateData] = useState();
  const [title, setTitle] = useState('')
  const [dataKolektor, setDataKolektor] = useState([])

  const getDataKolektor = async () => {
    try {
      const response = await api.get("/kolektor?page=" + page);
      setDataKolektor(response?.data?.data?.data);
      setPaginateData(response?.data?.data);
      setData((prev) => ({
        ...prev,
        dataKolektor: response?.data?.data?.data
      }))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataKolektor();
  }, [page]);

  function toggleModalCreate() {
    setType("add-pelanggan");
  }

  useEffect(() => {
    if (type === "edit-pelanggan" && data?.id) {
      setOpen(true);
      setTitle('Edit Pelanggan')
    } else if (type == "add-pelanggan") {
      setOpen(true);
      setTitle('Buat Pelanggan')
    } else if (type == 'detail-pelanggan') {
      setOpen(true)
      setTitle('Detail Pelanggan')
    }
  }, [data, type]);

  const getNewCodePelanggan = async () => {
    try {
      const response = await api.get("/new-kode-pelanggan");
      setNewCode(response?.data?.new_kode_pelanggan);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewCodePelanggan();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    const toastId = toast.loading("Delete Kolektor");
    try {
      const response = await api.delete(`/kolektor/${selectedId}`);
      updateToastToSuccess(toastId, response.data.message);
      setTimeout(() => {
        getDataKolektor()
      }, 500);
    } catch (error) {
      updateToastToError(toastId, error.response.data.message);
    }
  };

  return (
    <BaseLayout text={"Kolektor"}>
      <HeaderPage
        onClick={() => toggleModalCreate()}
        icon={
          <Person4Icon
            sx={{
              fontSize: {
                sm: "28px",
                md: "38px",
              },
              color: "#19297C",
            }}
          />
        }
        text={"Kolektor"}
        buttonIcon={
          <AddOutlinedIcon
            sx={{
              fontSize: {
                sm: "14px",
                md: "18px",
              },
            }}
          />
        }
      />
      {dataKolektor?.length === 0 || paginateData?.length === 0 || !paginateData ? (
        <div className={"w-full flex justify-center"}>
          <img src={ImgNull} className={'w-[300px] max-[576px]:w-[200px]'} alt={"null data"} />
        </div>
      ) : (
        <div className="w-full p-5 bg-white border-[1px] border-(--border-color) rounded-[10px] ">
          <div className="w-full overflow-x-auto flex flex-col">
            <Table setOpenModalDelete={setOpenModalDelete} setSelectedId={setSelectedId} getDataKolektor={() => { getDataKolektor() }} />
          </div>
          <div className={"flex flex-col justify-start"}>
            <Pagination data={paginateData} />
          </div>
        </div>
      )}

      {/* Modal */}
      <AddCollector
        open={open}
        setOpen={() => {
          setOpen(false);
          setType('add-pelanggan');
        }}
        onClose={() => {
          setOpen(false);
          setTimeout(function () {
            setType(null);
          }, 400); // time disesuakian dengan duration AddPelanggan:142 * 2 
        }}
        getDataPelanggan={() => { getDataPelanggan() }}
        newCode={newCode}
        title={title}
      />

      {openModalDelete &&
        <PopupDelete open={openModalDelete} onClose={setOpenModalDelete} id={selectedId} onDelete={handleDelete} />
      }

    </BaseLayout>


  );
};

export default Kolektor;
