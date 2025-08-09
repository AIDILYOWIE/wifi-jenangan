import { PrintIcon } from "../../assets/RegisterAsset"
import HeaderPage from "../../components/fragments/Header"
import BaseLayout from "../../components/layouts/BaseLayout"
import Table from "./Datagrid/Table"
import { ImgNull } from "../../assets/RegisterAsset";
import { api } from "../../utils/helper/helper.js";
import { useEffect, useState } from "react";
import Pagination from "../../components/fragments/Pagination.jsx";
const now = new Date().toLocaleDateString("en-CA");

const Invoice = () => {
  const [dataInvoice, setDataInvoice] = useState([]);
  const [paginateData, setPaginateData] = useState([]);
  const [desa, setDesa] = useState("");

  const getDataInvoice = async () => {
    try {
      const response = await api.get("/tagihan", {
        params: { now },
      });
      setDataInvoice(response.data?.data.data)
      setPaginateData(response.data?.data)

    } catch (error) {
      console.log(error);
    }
  };

  const [filteredInvoice, setFilteredInvoice] = useState([]);

  // handle input change
  const handleChangeDesa = (e) => {
    const value = e.target.value;
    setDesa(value);

    if (!value.trim()) {
      setFilteredInvoice([]);
    } else {
      const filtered = dataInvoice.filter((item) => {
        const desaLower = item.pelanggan.desa?.toLowerCase() || "";
        const kecamatanLower = item.pelanggan.kecamatan?.toLowerCase() || "";
        const searchLower = value.toLowerCase();
        return desaLower.includes(searchLower) || kecamatanLower.includes(searchLower);
      });
      setFilteredInvoice(filtered);
    }
  };



  useEffect(() => {
    getDataInvoice();
  }, [now]);
  const filterType = desa == "" || !desa ? "all" : desa
  return (
    <BaseLayout text={"Pelanggan"}>
      <HeaderPage
        onClick={() => { window.location.href = "/invoice/print-all/" + filterType }}
        textButton="Print All"
        buttonIcon={<PrintIcon />}
        icon={
          <PrintIcon
            sx={{
              fontSize: {
                sm: "28px",
                md: "38px",
              },
              color: "#19297C",
            }}
          />
        }
        text={"Invoice"}
      />
      {dataInvoice?.length === 0 || paginateData?.length === 0 || !paginateData ? (
        <div className={"w-full flex justify-center"}>
          <img src={ImgNull} className={'w-[300px] max-[576px]:w-[200px]'} alt={"null data"} />
        </div>
      ) : (
        <div className="w-full p-5 bg-white border-[1px] border-(--border-color) rounded-[10px] flex flex-col items-end">
          <input
            type="text"
            placeholder="Masukkan desa/kecamatan"
            value={desa}
            onChange={(e) => handleChangeDesa(e)}
            className="border w-full max-w-56 px-3 text-sm py-1 rounded-md mb-3 ml-auto"
          />
          <div className="w-full overflow-x-auto">
            <Table dataInvoice={filteredInvoice.length ? filteredInvoice : dataInvoice} />
          </div>
          <div className={"flex flex-col justify-start"}>
            <Pagination data={paginateData} />
          </div>
        </div>
      )}



    </BaseLayout>
  )
}

export default Invoice