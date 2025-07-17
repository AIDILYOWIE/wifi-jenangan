"use client";

import { useContext, useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ArrowBackIosNewOutlinedIcon } from "../../assets/RegisterAsset";
import { api } from "../../utils/helper/helper";
import SendData, { useDataContext } from "../../../context/SendDataContext";

const SelectPaket = () => {
  const [paketList, setPaketList] = useState([]);
  const [selected, setSelected] = useState(null);
  const { setData } = useDataContext()

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await api.get("/paket");
        const data = response.data.data;

        // Jika data array, ubah ke format label/value
        const mapped = data.map((item, index) => ({
          id: item.id,
          label: item.id || `Paket ${index + 1}`,
          name: item.name,
          value: item.harga
            ? `Rp ${item.harga.toLocaleString()}`
            : item.value || `Rp 0`,
        }));

        setPaketList(mapped);
      } catch (error) {
        console.error("Gagal memuat paket:", error);
      }
    };

    fetchPaket();
  }, []);

  return (
    <div className="w-full flex flex-col gap-[7px]">
      <label htmlFor="" className="text-[14px] text-(--text-color)">
        Paket
      </label>

      <Listbox value={selected} onChange={(item) => {
        setSelected(item)
        setData((prev) => ({...prev, paket_id: item.id}))
      }}>
        <div className="relative">
          <ListboxButton className="flex justify-between items-center w-full text-[12px] text-(--text-color) border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-2 gap-1 focus:outline-none">
            {selected?.value || "Pilih Paket"}
            <ArrowBackIosNewOutlinedIcon
              className="rotate-270"
              sx={{ fontSize: "12px" }}
            />
          </ListboxButton>

          <ListboxOptions className="absolute mt-1 w-full overflow-auto bg-white text-[12px] text-(--text-color) border-[1px] rounded-(--border-radius) border-(--border-color) focus:outline-none">
            {paketList.map((item) => {

              return (
              <ListboxOption
                key={item.label}
                value={item}
                className={({ active, selected }) =>
                  `cursor-pointer select-none relative px-4 py-2 ${
                    active
                      ? "bg-blue-100 text-(--primary-color)"
                      : "text-(--text-color)"
                  } ${selected ? "font-semibold" : "font-normal"}`
                }
              >
                <div className="flex items-center justify-around">
                  <p>{item.name}</p>
                  <p>-</p>
                  <p>{item.value}</p>
                </div>
              </ListboxOption>
            )})}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectPaket;
