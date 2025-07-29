// import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableHead,
} from "../../../../components/elements/TableStructure";
import { api } from "../../../../utils/helper/helper";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { ButtonAction } from "../../../../components/elements/Button";
import {
  CheckIcon,
  PrintIcon,
  SearchIcon,
} from "../../../../assets/RegisterAsset";
import Status from "../../../../components/elements/Status";
import { useDateRange } from "../../../../../context/DateRangeContext";

// export const TablePelanggan = React.memo(({ onEdit }) => {
//   const [dataPelanggan, setDataPelanggan] = useState([]);

//   const getDataPelanggan = async () => {
//     try {
//       const response = await api.get("/pelanggan");
//       const allData = response.data.data.data;
//       const sorteData = allData.sort(
//         (a, b) =>
//           new Date(b.tanggal_pemasangan) - new Date(a.tanggal_pemasangan)
//       );
//       const top3data = sorteData.slice(0, 5);
//       setDataPelanggan(top3data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getDataPelanggan();
//   }, []);

//   return (
//     <div className=" min-[1000px]:w-full max-[1000px]:w-[1000px] flex">
//       <ToastContainer position="top-center" />
//       <div className="w-full">
//         <TableHead value="Tanggal Masuk" style="rounded-l-[10px]" />
//         {dataPelanggan &&
//           dataPelanggan.map((item, i) => (
//             <TableBody value={item.tanggal_pemasangan} key={i} />
//           ))}
//       </div>
//       <div className="w-full">
//         <TableHead value="Nama Pelanggan" />
//         {dataPelanggan &&
//           dataPelanggan.map((item, i) => (
//             <TableBody value={item.name} key={i} />
//           ))}
//       </div>
//       <div className="w-full">
//         <TableHead value="Kecamatan" style="rounded-r-[10px]" />
//         {dataPelanggan &&
//           dataPelanggan.map((item, i) => (
//             <TableBody value={item.kecamatan} key={i} />
//           ))}
//       </div>
//     </div>
//   );
// });

export const TableTransaksi = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);

  const { dateRange } = useDateRange();

  const getDataTransaksiWithDateRange = async (payload) => {
    try {
      const response = await api.get("/transaksi", {
        params: {
          start_date: payload?.start_date,
          end_date: payload?.end_date,
        },
      });
      const allData = response.data?.data
      return allData
      setDataTransaksi(allData)
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

    getDataTransaksiWithDateRange(payload);
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
        <TableHead value="Status" style="rounded-r-[10px]" />
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
