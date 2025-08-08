import {ImgNull, ReceiptOutlinedIcon} from "../../../assets/RegisterAsset"
import HeaderPage from "../../../components/fragments/Header"
import BaseLayout from "../../../components/layouts/BaseLayout"
import Table from "./Datagrid/Table"
import {useEffect, useState} from "react";
import {useDateRange} from "../../../../context/DateRangeContext.jsx";
import {api} from "../../../utils/helper/helper.js";
import Pagination from "../../../components/fragments/Pagination.jsx";
import { useSearchParams } from "react-router-dom";

const Transaksi = () => {
    const [dataTransaksi, setDataTransaksi] = useState([]);
    const { dateRange } = useDateRange();

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || "1";

    const [paginateData, setPaginateData] = useState();


    const getDataTransaksi = async (payload) => {
        try {
            const response = await api.get(`/transaksi?page=${page}`, {
                params: {
                    start_date: payload?.start_date,
                    end_date: payload?.end_date,
                },
            });
            setDataTransaksi(response.data?.data?.data);
            setPaginateData(response.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {

        const startDate = dateRange.start ? dateRange.start : null;
        const endDate = dateRange.end ? dateRange.end : null;

        const formatDate = (dateObj) => {
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // bulan dimulai dari 0
            const day = String(dateObj.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const payload = {
            start_date: startDate ? formatDate(startDate) : null,
            end_date: endDate ? formatDate(endDate) : null,
        };

        getDataTransaksi(payload);
        console.log("run");
    }, [dateRange.start, dateRange.end, page]);
  return (
    <BaseLayout >
      <HeaderPage
        text={"Transaksi"}
        canCreate = {false}
        isHidden={false}
        icon={
          <ReceiptOutlinedIcon
            sx={{
              fontSize: {
                sm: "28px",
                md: "38px",
              },
              color: "#19297C",
            }}
          />
        }
        type='date-range'
      />
        {dataTransaksi?.length === 0 ? (
            <div className={"w-full flex justify-center"}>
                <img src={ImgNull} className={'w-[300px] max-[576px]:w-[200px]'} alt={"null data"}/>
            </div>
        ) : (
            <div className="w-full p-5 bg-white border-[1px] border-(--border-color) rounded-[10px]">
                <div className="w-full overflow-x-auto flex flex-col">
                    <Table dataTransaksi={dataTransaksi} />
                    <Pagination data={paginateData}/>
                </div>
            </div>
        )}

    </BaseLayout>
  )
}

export default Transaksi