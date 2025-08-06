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
            <TableBody value={item?.pelanggan?.name} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Kecamatan" />
        {data &&
          data.map((item, i) => (
            <TableBody value={item?.pelanggan?.kecamatan} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Paket" />
        {data &&
          data.map((item, i) => (
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
