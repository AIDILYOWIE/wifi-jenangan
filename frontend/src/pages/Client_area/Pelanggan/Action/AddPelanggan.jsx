import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "../../../../components/elements/Button";
import {
  AddOutlinedIcon,
  arrow_down,
  ArrowBackIosNewOutlinedIcon,
  CheckOutlinedIcon,
} from "../../../../assets/RegisterAsset";
import Input from "../../../../components/elements/Input";
import SelectPaket from "../../../../components/elements/Select";
import DateRangePicker from "../../../../components/elements/DateRangePicker";
import { api } from "../../../../utils/helper/helper";
import SendData, { SendDataProvider, useDataContext } from "../../../../../context/SendDataContext";
import { data } from "react-router-dom";
import { useContext, useState } from "react";
import { DatePicker } from "../../../../components/elements/DatePicker";


const AddPelanggan = ({ open, setOpen }) => {
  const { data } = useDataContext()
  const [nomerPelangan, setNomerPelanggan] = useState('')
  const [namaPelangan, setNamaPelanggan] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [desa, setDesa] = useState('')
  const [dusunJalan, setDusunJalan] = useState('')

  const handleSubmit = async () => {
    try {
      await api.post('/pelanggan', {
        tanggal_pemasangan: data && data.tanggal_masuk,
        name: namaPelangan,
        kecamatan: kecamatan,
        desa: desa,
        dusun: dusunJalan,
        id_paket: data && data.paket_id
      })

      console.log('success')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex justify-center items-center ">
          <div className="flex flex-col w-[800px] h-max bg-white rounded-[10px] px-8 py-5 gap-[38px]">
            <header className="w-full flex justify-between">
              <div className="w-full">
                <h1 className="text-[20px] font-[600]">Buat Pelanggan</h1>
              </div>
              <div className="w-full flex justify-end gap-2">
                <Button
                  className="w-max border-[1px] border-(--primary-color) rounded-[5px] text-(--primary-color) px-3 !py-1.5 gap-1.5"
                  variant="secondary"
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

            <div className="w-full flex flex-col gap-5">
              <div className="grid grid-cols-2 w-full gap-[20px]">
                <div className="">
                  <Input
                    label="Nomer Pelanggan"
                    placeholder="PL-001"
                    variant="text-[12px] !text-(--border-color)  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1"
                  />
                </div>
                <div className="">
                  <DatePicker/>
                </div>
              </div>
              <div className="grid grid-cols-2 w-full gap-[20px]">
                <div className="">
                  <Input
                    label="Nama Pelanggan"
                    placeholder="Masukan Nama Pelanggan"
                    onChange={(e) => setNamaPelanggan(e.target.value)}
                    variant="text-[12px] text-(--border-color)  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1"
                  />
                </div>
                <div className="">
                  <Input
                    label="Kecamatan"
                    placeholder="Masukan Kecamatan"
                    onChange={(e) => setKecamatan(e.target.value)}
                    variant="text-[12px] text-(--border-color)  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 w-full gap-[20px]">
                <div className="">
                  <Input
                    label="Desa"
                    placeholder="Masukan Desa"
                    onChange={(e) => setDesa(e.target.value)}
                    variant="text-[12px] text-(--border-color)  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1"
                  />
                </div>
                <div className="">
                  <Input
                    label="Dusun / Jalan"
                    placeholder="Masukan Dusun / Jalan"
                    onChange={(e) => setDusunJalan(e.target.value)}
                    variant="text-[12px] text-(--border-color)  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 w-full gap-[20px]">
                <div className="">
                  <SelectPaket />
                </div>
              </div>

              <div className="w-full flex justify-end">
                <Button
                  className="w-max rounded-[5px] text-(--background-color) px-3 !py-1.5 gap-1.5"
                  variant="primary"
                  onClick={() => handleSubmit()}
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
};

export default AddPelanggan;
