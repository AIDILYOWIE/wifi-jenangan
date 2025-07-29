// import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  TableBody,
  TableHead,
} from "../../../../components/elements/TableStructure";
import { ButtonAction } from "../../../../components/elements/Button";
import { api, updateToastToSuccess } from "../../../../utils/helper/helper";
import {
  CheckIcon,
  PrintIcon,
  SearchIcon,
} from "../../../../assets/RegisterAsset";
import Status from "../../../../components/elements/Status";
import { useDateRange } from "../../../../../context/DateRangeContext";

const Table = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);

  const { dateRange } = useDateRange();

  const getDataTransaksi = async (payload) => {
    try {
      console.log('fecth')
      const response = await api.get("/transaksi", {
        params: {
          start_date: payload?.start_date,
          end_date: payload?.end_date,
        },
      });
      setDataTransaksi(response.data.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // jangan lupa dirubah sesuai inputan

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

  }, [dateRange]);
  return (
    <div className=" min-[1100px]:w-full max-[1100px]:w-[1000px] flex">
      <ToastContainer position="top-center" />
      <div className="w-full">
        <TableHead value="Tanggal Bayar" style="rounded-l-[10px]" />
        {dataTransaksi &&
          dataTransaksi.map((item, i) => (
            <TableBody value={item?.tanggal} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Nama Pelanggan" />
        {dataTransaksi &&
          dataTransaksi.map((item, i) => (
            <TableBody value={item?.pelanggan?.name} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Kecamatan" />
        {dataTransaksi &&
          dataTransaksi.map((item, i) => (
            <TableBody value={item?.pelanggan?.kecamatan} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Paket" />
        {dataTransaksi &&
          dataTransaksi.map((item, i) => (
            <TableBody
              value={
                item.pelanggan.paket.harga.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }) + "/Bln"
              }
              key={i}
            />
          ))}
      </div>
      <div className="w-max">
        <TableHead value="Status" />
        {dataTransaksi &&
          dataTransaksi.map((item, i) => (
            <TableBody type="status" key={i}>
              <Status value={item.status} />
            </TableBody>
          ))}
      </div>
    </div>
  );
};

export default Table;
