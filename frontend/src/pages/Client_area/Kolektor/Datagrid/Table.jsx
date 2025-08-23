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
import PopupDelete from "../Action/PopUp";

const Table = React.memo(({ getDataKolektor, setOpenModalDelete, setSelectedId }) => {
  const { setData, setType, data } = useDataContext();
  const dataKolektor = data?.dataKolektor

  const handleEdit = (id) => {
    setData((prev) => ({
      ...prev,
      id: id,
    }));
    setType("edit-pelanggan");
  };

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
        <TableHead value="Nama Pelanggan" />
        {dataKolektor &&
          dataKolektor.map((item, i) => (
            <TableBody value={item.name} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Email" style="rounded-l-[10px]" />
        {dataKolektor &&
          dataKolektor.map((item, i) => (
            <TableBody value={item.email} key={i} />
          ))}
      </div>
      <div className="w-full">
        <TableHead value="Action" style="rounded-r-[10px]" />
        {dataKolektor &&
          dataKolektor.map((item, i) => {
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
                <ButtonAction style={"bg-(--bg-delete)"}
                  onClick={() => {
                    setOpenModalDelete(true)
                    setSelectedId(item.id)
                  }}>
                  <DeleteIcon
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
