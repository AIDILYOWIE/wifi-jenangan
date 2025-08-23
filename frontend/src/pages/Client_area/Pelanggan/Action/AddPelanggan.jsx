import React from "react";
import {
  Dialog,
  DialogBackdrop,
} from "@headlessui/react";
import Button from "../../../../components/elements/Button";
import {
  ArrowBackIosNewOutlinedIcon,
  CheckOutlinedIcon,
} from "../../../../assets/RegisterAsset";
import Input from "../../../../components/elements/Input";
import SelectPaket from "../../../../components/elements/Select";
import {
  api,
  throttle,
  updateToastToError,
  updateToastToSuccess,
} from "../../../../utils/helper/helper";
import { useDataContext } from "../../../../../context/SendDataContext";
import { useEffect, useState } from "react";
import { DatePicker } from "../../../../components/elements/DatePicker";
import { toast, ToastContainer } from "react-toastify";

const AddPelanggan = React.memo(
  ({ open, setOpen, onClose, newCode, title, getDataPelanggan, collectorId, setCollectorId }) => {
    const { data, type } = useDataContext();
    const [namaPelangan, setNamaPelanggan] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [desa, setDesa] = useState("");
    const [dusunJalan, setDusunJalan] = useState("");
    const [kodePelanggan, setKodePelanggan] = useState("");
    const [tanggalMasuk, setTanggalMasuk] = useState(null);
    const [paket, setPaket] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [haveTagihan, setHaveTagihan] = useState(false);

    const [collector, setCollector] = useState([])


    // handle kondisi
    const handleSubmit = () => {
      throttle(async () => {
        if (type == "add-pelanggan") {
          handleAddPelanggan();
        } else if (type == "edit-pelanggan") {
          handleEditPelanggan();
        } else {
          setDisabled(false)
        }
      }, 3000)
    }

    // handle Add Pelanggan
    const handleAddPelanggan = async () => {
      const toastId = toast.loading("Menambahkan Pelanggan");
      try {
        const response = await api.post("/pelanggan", {
          tanggal_pemasangan: data?.tanggal_masuk,
          name: namaPelangan,
          kecamatan: kecamatan,
          desa: desa,
          dusun: dusunJalan,
          id_paket: data?.paket_id,
          assign_to: collectorId === 0 ? null : collectorId,
        });

        updateToastToSuccess(toastId, response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        updateToastToError(toastId, error.response.data.message);
      }
    };

    // handle Edit Pelanggan
    const handleEditPelanggan = async () => {
      const toastId = toast.loading("Edit Pelanggan");
      try {
        const response = await api.put(`/pelanggan/${data.id}`, {
          tanggal_pemasangan: data?.tanggal_masuk || tanggalMasuk,
          name: namaPelangan,
          kecamatan: kecamatan,
          desa: dusunJalan,
          dusun: dusunJalan,
          id_paket: data?.paket_id || paket,
          assign_to: collectorId === 0 ? null : collectorId,
        });
        updateToastToSuccess(toastId, response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        updateToastToError(toastId, error.response.data.message);
      }
    };

    // fetch data pelanggan
    const fetchDataPelanggan = async () => {
      try {
        const response = await api.get(`/pelanggan/${data.id}`);
        const res = response.data.data;
        setHaveTagihan(res.have_tagihan_lunas);
        setKodePelanggan(res.kode_pelanggan);
        setTanggalMasuk(res.tanggal_pemasangan);
        setNamaPelanggan(res.name);
        setKecamatan(res.kecamatan);
        setDesa(res.desa);
        setDusunJalan(res.dusun);
        setPaket(res.paket.id || paket);
        setCollectorId(res.collector?.id || 0);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (
        data?.id &&
        (type == "edit-pelanggan" || type == "detail-pelanggan")
      ) {
        fetchDataPelanggan();
      }

      if (type == "add-pelanggan") {
        setTanggalMasuk("");
        setNamaPelanggan("");
        setKecamatan("");
        setDesa("");
        setDusunJalan("");
        setPaket("");
        setDisabled(false)
      } else if (type == "detail-pelanggan") {
        setDisabled(true);
      } else if (type == "edit-pelanggan") {
        setDisabled(false)
      }

      if (type == "edit-pelanggan") setDisabled(false)
    }, [data?.id, type]);

    function getCollector() {
      api.get('/kolektor?take=9999')
        .then(res => {
          setCollector(res.data?.data.data || []);
        })
        .catch(err => {
          console.log(err.response)
        })
    }
    useEffect(() => {
      getCollector()
    
    }, [])

    return (
      <Dialog open={open} onClose={setOpen} className="relative z-90">
        <ToastContainer position="top-center" />
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 w-screen h-screen overflow-y-auto flex justify-center items-center ">
          <div className="flex flex-col max-[576px]:w-[350px] w-[800px] h-max bg-white rounded-[10px] max-[576px]:px-4 px-8 py-5 gap-[38px] max-[576px]:gap-[20px]">
            <header className="w-full flex justify-between">
              <div className="w-full">
                <h1 className="text-[length:20px] max-[576px]:text-[length:16px] font-[600]">{title}</h1>
              </div>
              <div className="w-full flex justify-end gap-2">
                <Button
                  className="w-max no-hover border-[1px] border-(--primary-color) rounded-[5px] max-[576px]:text-[12px] text-(--primary-color) px-3 !py-1.5 gap-1.5 hover:bg-red-700"
                  variant="secondary"
                  onClick={onClose}
                >
                  <ArrowBackIosNewOutlinedIcon
                    sx={{
                      fontSize: "14px",
                      color: " #19297c",
                    }}
                  />
                  Back
                </Button>
              </div>
            </header>
            <div className="w-full flex flex-col max-[576px]:gap-[10px] gap-[20px]">
              <div className="grid grid-cols-2 max-[576px]:grid-cols-1 w-full gap-[20px] max-[576px]:gap-[10px]">
                <div className="">
                  <Input
                    name="kode_pelanggan"
                    label="Kode Pelanggan"
                    value={newCode}
                    onChange={(e) => setKodePelanggan(e.target.value)}
                    disabled={true}
                    variant={`text-[12px] max-[576px]:text-[10px] max-[576px]:rounded-[5px] !text-(--border-color)  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1`}
                  />
                </div>
                <div className="">
                  <DatePicker
                    value={tanggalMasuk}
                    disabled={disabled}
                    haveTagihan={haveTagihan}
                    type={type}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 max-[576px]:grid-cols-1 w-full gap-[20px] max-[576px]:gap-[10px]">
                <div className="">
                  <Input
                    name="nama_pelanggan"
                    label="Nama Pelanggan"
                    placeholder="Masukan Nama Pelanggan"
                    value={namaPelangan}
                    disabled={disabled}
                    onChange={(e) => setNamaPelanggan(e.target.value)}
                    variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
                      ? "!text-(--text-color) "
                      : "!text-(--border-color) "
                      }  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                  />
                </div>
                <div className="">
                  <Input
                    name="kecamatan"
                    label="Kecamatan"
                    placeholder="Masukan Kecamatan"
                    value={kecamatan}
                    disabled={disabled}
                    onChange={(e) => setKecamatan(e.target.value)}
                    variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
                      ? "!text-(--text-color) "
                      : "!text-(--border-color) "
                      }  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 max-[576px]:grid-cols-1 w-full gap-[20px] max-[576px]:gap-[10px]">
                <div className="">
                  <Input
                    name="desa"
                    label="Desa"
                    placeholder="Masukan Desa"
                    value={desa}
                    disabled={disabled}
                    onChange={(e) => setDesa(e.target.value)}
                    variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
                      ? "!text-(--text-color) "
                      : "!text-(--border-color) "
                      } border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                  />
                </div>
                <div className="">
                  <Input
                    name="dusun"
                    label="Dusun / Jalan"
                    placeholder="Masukan Dusun / Jalan"
                    value={dusunJalan}
                    disabled={disabled}
                    onChange={(e) => setDusunJalan(e.target.value)}
                    variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
                      ? "!text-(--text-color) "
                      : "!text-(--border-color) "
                      } border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 max-[576px]:grid-cols-1 w-full gap-[20px] max-[576px]:gap-[10px]">
                <div className="">
                  <SelectPaket
                    name="paket"
                    value={paket}
                    disabled={disabled}
                    variant={`${type == "edit-pelanggan" || type == "add-pelanggan"
                      ? "!text-(--text-color) "
                      : "!text-(--border-color) "
                      } max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                  />
                </div>
                <div className="w-full flex flex-col gap-[7px]">
                  <p className="text-[14px] max-[576px]:text-[12px] font-normal">
                    Penarik
                  </p>
                  <select
                    name="collector"
                    id="collector"
                    value={collectorId}
                    disabled={disabled}
                    onChange={(e) => setCollectorId(Number(e.target.value))}
                    className={`w-full border border-gray-400 text-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${type == "edit-pelanggan" || type == "add-pelanggan"
                      ? "!text-(--text-color) "
                      : "!text-(--border-color) "
                      } max-[576px]:text-[1px] max-[576px]:rounded-[5px]`}
                  >
                    <option value={0}>-- Pilih --</option>
                    {collector.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full flex justify-end">
                <Button
                  className={` ${disabled ? 'hidden' : ''} w-max rounded-[5px] max-[576px]:text-[12px] text-(--background-color) px-3 !py-1.5 gap-1.5`}
                  variant="primary"
                  disabled={disabled}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <CheckOutlinedIcon
                    sx={{
                      fontSize: "14px",
                      color: " #ffff",
                    }}
                  />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
);
export default AddPelanggan;
