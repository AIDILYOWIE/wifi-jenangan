import BaseLayout from "../../../components/layouts/BaseLayout";
import { PeopleAltOutlinedIcon } from "../../../assets/RegisterAsset";
import Table from "../../../components/fragments/Table";
import { useState } from "react";
import HeaderPage from "../../../components/fragments/Header";
import AddPelanggan from "./Action/AddPelanggan";

const Pelanggan = () => {
  const [open, setOpen] = useState(true);
  return (
    <BaseLayout text={"Pelanggan"}>
      <HeaderPage
        onClick={() => setOpen(!open)}
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
      <AddPelanggan open={open} setOpen={() => setOpen(!open)}/>
    </BaseLayout>
  );
};

export default Pelanggan;
