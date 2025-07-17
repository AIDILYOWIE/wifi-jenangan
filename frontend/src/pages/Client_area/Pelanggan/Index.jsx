import BaseLayout from "../../../components/layouts/BaseLayout";
import { PeopleAltOutlinedIcon, PrintIcon } from "../../../assets/RegisterAsset";
import Table from "./Datagrid/Table";
import { useEffect, useState } from "react";
import HeaderPage from "../../../components/fragments/Header";
import AddPelanggan from "./Action/AddPelanggan";
import { api } from "../../../utils/helper/helper";

const Pelanggan = () => {
  const [open, setOpen] = useState(false);
  const [newCode, setNewCode] = useState('')

  function toggleModalCreate() {
    setOpen(!open)
  }

  const getNewCodePelanggan = async () => {
    try {
      const response = await api.get('/new-kode-pelanggan')
      setNewCode(response.data.new_kode_pelanggan);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNewCodePelanggan()
  }, [])
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
      />
      <div className="w-ful p-5 bg-white border-[1px] border-(--border-color) rounded-[10px]">
        <div className="w-full overflow-x-auto">
          <Table />
        </div>
      </div>

      {/* Modal */}
      <AddPelanggan open={open} setOpen={() => setOpen(!open)} onClose={() => {toggleModalCreate()}} newCode={newCode}/>
    </BaseLayout>
  );
}; 

export default Pelanggan;
