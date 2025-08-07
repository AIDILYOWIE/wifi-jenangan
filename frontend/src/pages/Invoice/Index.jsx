import { PrintIcon } from "../../assets/RegisterAsset"
import HeaderPage from "../../components/fragments/Header"
import BaseLayout from "../../components/layouts/BaseLayout"
import Table from "./Datagrid/Table"
import {ImgNull} from "../../assets/RegisterAsset";
import {api} from "../../utils/helper/helper.js";
import {useEffect, useState} from "react";
const now = new Date().toLocaleDateString("en-CA");

const Invoice = () => {
    const [dataInvoice, setDataInvoice] = useState([]);

    const getDataInvoice = async () => {
        try {
            const response = await api.get("/tagihan", {
                params: { now },
            });
            setDataInvoice(response.data?.data.data)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataInvoice();
    }, [now]);
  return (
    <BaseLayout text={"Pelanggan"}>
      <HeaderPage
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
        {dataInvoice.length == 0 ? (
            <div className={"w-full flex justify-center"}>
                <img src={ImgNull} className={'w-[300px] max-[576px]:w-[200px]'} alt={"null data"}/>
            </div>
        ) : (
            <div className="w-full p-5 bg-white border-[1px] border-(--border-color) rounded-[10px]">
                <div className="w-full overflow-x-auto">
                    <Table dataInvoice={dataInvoice} />
                </div>
            </div>
        )}



    </BaseLayout>
  )
}

export default Invoice