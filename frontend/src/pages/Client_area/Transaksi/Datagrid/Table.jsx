import { toast, ToastContainer } from "react-toastify";
import {
  TableBody,
  TableHead,
} from "../../../../components/elements/TableStructure";
import Status from "../../../../components/elements/Status";

const Table = ({dataTransaksi}) => {
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
