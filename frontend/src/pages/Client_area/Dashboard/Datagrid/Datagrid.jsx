// import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React from "react";
import {
  TableBody,
  TableHead,
} from "../../../../components/elements/TableStructure";
import { ToastContainer } from "react-toastify";
import Status from "../../../../components/elements/Status";

export const TablePelanggan = React.memo(({ data }) => {


  return (
    <div className=" min-[1000px]:w-full max-[1000px]:w-[1000px] max-[576px]:w-[700px] flex">
      <ToastContainer position="top-center" />
      <div className="w-full">
        <TableHead value="Tanggal Masuk" style="rounded-l-[10px]" />
        {data &&
          data.map((item, i) => (
            <TableBody value={item.tanggal_pemasangan} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Nama Pelanggan" />
        {data &&
          data.map((item, i) => (
            <TableBody value={item.name} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Kecamatan" style="rounded-r-[10px]" />
        {data &&
          data.map((item, i) => (
            <TableBody value={item.kecamatan} key={i} />
          ))}
      </div>
    </div>
  );
});

export const TableTransaksi = ({data}) => {
  return (
    <div className=" min-[1100px]:w-full max-[1100px]:w-[1000px] flex">
      <ToastContainer position="top-center" />
      <div className="w-full">
        <TableHead value="Tanggal Bayar" style="rounded-l-[10px]" />
        {data &&
          data.map((item, i) => (
            <TableBody value={item?.tanggal} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Nama Pelanggan" />
        {data &&
          data.map((item, i) => (
            <TableBody value={item?.pelanggan_name} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Kecamatan" />
        {data &&
          data.map((item, i) => (
            <TableBody value={item?.pelanggan_kecamatan} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Paket" />
        {data &&
          data.map((item, i) => (
            <TableBody
              value={
                item.total_tagihan.toLocaleString("id-ID", {
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
        {data &&
          data.map((item, i) => (
            <TableBody type="status" key={i}>
              <Status value={item.status} />
            </TableBody>
          ))}
      </div>
    </div>
  );
};
