// import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import {
  DeleteIcon,
  SearchIcon,
  EditIcon,
} from "../../../../assets/RegisterAsset";
import { ButtonAction } from "../../../../components/elements/Button";
import {
  TableBody,
  TableHead,
} from "../../../../components/elements/TableStructure";
import {
  api,
  updateToastToSuccess,
  updateToastToError,
} from "../../../../utils/helper/helper";
import { useDataContext } from "../../../../../context/SendDataContext";
import { toast, ToastContainer } from "react-toastify";

const Table = React.memo(() => {
  const { setData, setType, data } = useDataContext();
  const dataPelanggan = data?.dataPelanggan


  const handleEdit = (id) => {
    setData((prev) => ({
      ...prev,
      id: id,
    }));
    setType("edit-pelanggan");
  };

  useEffect(() => {
    const handleDelete = async () => {
      if (data?.isDelete && data?.id) {
        const toastId = toast.loading("Delete Pelanggan");
        try {
          const response = await api.delete(`/pelanggan/${data?.id}`);
          updateToastToSuccess(toastId, response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          updateToastToError(toastId, error.response.data.message);
        }
      }
    };
    handleDelete();
  }, [data?.isDelete]);

  const handleDetail = (id) => {
    setData((prev) => ({
      ...prev,
      id: id,
    }));
    setType("detail-pelanggan");
  };

  return (
    <div className=" min-[1000px]:w-full max-[1000px]:w-[1000px] flex">
      <ToastContainer position="top-center" />
      <div className="w-full">
        <TableHead value="Tanggal Masuk" style="rounded-l-[10px]" />
        {dataPelanggan &&
          dataPelanggan.map((item, i) => (
            <TableBody value={item.tanggal_pemasangan} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Nama Pelanggan" />
        {dataPelanggan &&
          dataPelanggan.map((item, i) => (
            <TableBody value={item.name} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Kecamatan" />
        {dataPelanggan &&
          dataPelanggan.map((item, i) => (
            <TableBody value={item.kecamatan} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Action" style="rounded-r-[10px]" />
        {dataPelanggan &&
          dataPelanggan.map((item, i) => {
            return (
              <TableBody type="action" key={i}>
                <ButtonAction
                  style={"bg-(--bg-edit)"}
                  onClick={() => {
                    handleEdit(item.id);
                  }}
                >
                  <EditIcon
                    sx={{
                      color: "#FFDC00",
                      fontSize: "20px",
                    }}
                  />
                </ButtonAction>
                <ButtonAction style={"bg-(--bg-delete)"}>
                  <DeleteIcon
                    onClick={() => {
                      setData((prev) => ({
                        ...prev,
                        id: item.id,
                        popupDelete: true,
                      }));
                    }}
                    sx={{
                      color: "#FF0004",
                      fontSize: "20px",
                    }}
                  />
                </ButtonAction>
                <ButtonAction
                  style={"bg-(--bg-detail)"}
                  onClick={() => handleDetail(item.id)}
                >
                  <SearchIcon
                    sx={{
                      color: "#5FC7FF",
                      fontSize: "20px",
                    }}
                  />
                </ButtonAction>
              </TableBody>
            );
          })}
      </div>
    </div>
  );
});

export default Table;
