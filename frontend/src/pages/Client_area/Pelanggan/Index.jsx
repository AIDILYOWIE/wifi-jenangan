import BaseLayout from "../../../components/layouts/BaseLayout";
import {
  AddOutlinedIcon,
  PeopleAltOutlinedIcon,
  PrintIcon,
} from "../../../assets/RegisterAsset";
import Table from "./Datagrid/Table";
import { useEffect, useState } from "react";
import HeaderPage from "../../../components/fragments/Header";
import AddPelanggan from "./Action/AddPelanggan";
import { api } from "../../../utils/helper/helper";
import { useDataContext } from "../../../../context/SendDataContext";
import PopupDelete from "./Action/PopUp";

const Pelanggan = () => {
  const [open, setOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const { type, data, setType } = useDataContext();
  const [title, setTitle] = useState('')

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
      setNewCode(response.data.new_kode_pelanggan);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewCodePelanggan();
  }, []);
  return (
    <BaseLayout text={"Pelanggan"}>
      <HeaderPage
        onClick={() => toggleModalCreate()}
        icon={
          <PeopleAltOutlinedIcon
            sx={{
              fontSize: {
                sm: "28px",
                md: "38px",
              },
              color: "#19297C",
            }}
          />
        }
        text={"Pelanggan"}
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
      <div className="w-ful p-5 bg-white border-[1px] border-(--border-color) rounded-[10px]">
        <div className="w-full overflow-x-auto">
          <Table />
        </div>
      </div>

      {/* Modal */}
      <AddPelanggan
        open={open}
        setOpen={() => {
          setOpen(false);
          setType('add-pelanggan');
        }}
        onClose={() => {
          setOpen(false);
          setType(null);
        }}
        newCode={newCode}
        title={title}
      />

      <PopupDelete/>

    </BaseLayout>

    
  );
};

export default Pelanggan;
