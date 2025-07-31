import { CloudUploadIcon, GridViewIcon } from "../../../assets/RegisterAsset";
import { api } from "../../../utils/helper/helper";
import BaseLayout from "../../../components/layouts/BaseLayout";
import { useEffect, useState } from "react";
import HeaderPage from "../../../components/fragments/Header";
import { TableTransaksi } from "./Datagrid/Datagrid";
import { Link } from "react-router-dom";
import { useDateRange } from "../../../../context/DateRangeContext";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import DashboardPrintPage from "./DashboardPrintPage";

const Dashboard = () => {
  const [dataDashboard, setDataDashboard] = useState([]);
  const [printPage, setPrintPage] = useState()
  const { dateRange } = useDateRange();

  const start_date = new Date(dateRange?.start);
  const end_date = new Date(dateRange?.end);

  const contentRef = useRef(null);
  const reactToPrintFn =  useReactToPrint({ contentRef });
  
  const handlePrint = async () => {
    setPrintPage(true);

    setTimeout(() => {
      reactToPrintFn();
      setPrintPage(false);
    }, 100);
  };

  const getDataDashboard = async () => {
    try {
      const response = await api.get("/dashboard", {
        params: {
          start_date: start_date,
          end_date: end_date,
        },
      });
      setDataDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataDashboard();
  }, [dateRange]);

  return (
    <BaseLayout>
      <div className="w-full flex flex-wrap justify-between ">
        <HeaderPage
          icon={
            <GridViewIcon
              sx={{
                fontSize: {
                  sm: "28px",
                  md: "38px",
                },
                color: "#19297C",
              }}
            />
          }
          text={"Dashboard"}
          textButton={"Export"}
          type={"date-range"}
          onClick={() => {handlePrint()}}
          buttonIcon={
            <CloudUploadIcon
              sx={{
                fontSize: {
                  xs: "20px",
                  md: "24px",
                },
              }}
            />
          }
        />
      </div>
      {/* <DashboardPrintPage ref={contentRef}></DashboardPrintPage> */}
      {printPage && (
        <div className="invisible absolute">
          <DashboardPrintPage ref={contentRef} />
        </div>
      )}
      <main className="flex flex-col gap-y-[20px]" >
        <div className="card grid grid-cols-2 max-sm:grid-cols-1 items-center w-full gap-5 max-sm:gap-2">
          <div
            className="rounded-xl flex flex-col items-start justify-center px-5 py-2.5 text-white shadow-lg w-full h-[97px] d-sudah-bayar"
            id="d-sudah-bayar"
          >
            <h3 className=" opacity-80 text-[length:14px] font-light">
              Sudah bayar
            </h3>
            <h1 className="text-[length:24px] font-semibold">
              {'Rp 0' || dataDashboard.lunas_sum?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </h1>
          </div>
          <div
            className="overflow-hidden rounded-xl bg-gradient-to-br from-red-700 to-red-600 flex flex-col items-start justify-center px-5 py-2.5 text-white w-full h-[97px] "
            id="d-belum-bayar"
          >
            <h3 className="text-[length:14px] font-light opacity-80">
              Belum bayar
            </h3>
            <h1 className="text-[length:24px] font-semibold">
              {'Rp 0' || dataDashboard.belum_lunas_sum?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </h1>
          </div>
        </div>

        <div className="w-ful p-5 bg-white border-[1px] border-(--border-color) rounded-[10px] flex flex-col gap-[18px]">
          <div className="w-full flex justify-between">
            <h1 className=" font-semibold text-[length:20px] text-(--text-color)">
              Pelanggan
            </h1>
            <Link
              className="px-[10px] py-[5px] !rounded-[5px] !border-[1px] !border-(--border-color) text-[length:14px] text-(--border-color)"
              to={"/pelanggan"}
            >
              View All
            </Link>
          </div>
          <div className="w-full overflow-x-auto">
            {/* <TablePelanggan /> */}
          </div>
        </div>
        <div className="w-ful p-5 bg-white border-[1px] border-(--border-color) rounded-[10px] flex flex-col gap-[18px]">
          <div className="w-full flex justify-between">
            <h1 className=" font-semibold text-[length:20px] text-(--text-color)">
              Transaksi
            </h1>
            <button className="px-[10px] py-[5px] !rounded-[5px] !border-[1px] !border-(--border-color) text-[length:14px] text-(--border-color)">
              View All
            </button>
          </div>
          <div className="w-full overflow-x-auto">
            <TableTransaksi />
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};

export default Dashboard;
