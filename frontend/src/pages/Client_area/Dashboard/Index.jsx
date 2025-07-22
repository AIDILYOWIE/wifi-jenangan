import { CloudUploadIcon, GridViewIcon } from "../../../assets/RegisterAsset";
import { api } from "../../../utils/helper/helper"
import Button from "../../../components/elements/Button";
import BaseLayout from "../../../components/layouts/BaseLayout";
import { useEffect, useState } from "react";

const Dashboard = () => {

  const [dataDashboard, setDataDashboard] = useState([])
  const [dataPelanggan, setDataPelanggan] = useState([])
  const [dataTransaksi, setDataTransaksi] = useState([])

  const start_date = new Date(2025, 8, 1)
  const end_date = new Date(2025, 8, 1)

  async function getDataDashboard () {
    try {
      const response = await api.get('/dashboard', {
        params : {
          start_date : start_date,
          end_date : end_date
        }
      })
      setDataDashboard(response.data);
      setDataPelanggan(response.data.pelanggan);
      setDataTransaksi(response.data.tagihan);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataDashboard()
  }, [])
  
  return (
    <BaseLayout>
      <div className="w-full flex flex-wrap justify-between ">
        <div className="flex items-center gap-2.5">
          <div className=" p-2.5 rounded-[10px] bg-(--background-color) w-max h-max">
            <GridViewIcon />
          </div>
          <h1 className=" text-2xl max-[576px]:text-[20px] font-semibold">
            Dashboard
          </h1>
        </div>

        <div className="max-sm:w-full flex items-center justify-end gap-2.5">
          <h2 className="">date range</h2>
          <Button className="gap-x-2 px-4 !w-fit">
            <CloudUploadIcon />
            Export
          </Button>
        </div>
      </div>
      <main className="flex flex-col gap-y-4 py-4">
        <div className="card grid grid-cols-2 max-sm:grid-cols-1 items-center w-full gap-5 max-sm:gap-2">
          <div className="overflow-hidden rounded-xl bg-gradient-to-br from-green-700 to-green-600 p-6 text-white w-full">
            <div className="text-sm opacity-80">Sudah bayar</div>
            <div className="text-3xl font-semibold">{(dataDashboard.lunas_sum)?.toLocaleString('id-ID', { style:"currency", currency:"IDR", minimumFractionDigits:0 })}</div>
          </div>
          <div className="overflow-hidden rounded-xl bg-gradient-to-br from-red-700 to-red-600 p-6 text-white w-full">
            <div className="text-sm opacity-80">Belum bayar</div>
            <div className="text-3xl font-semibold">{(dataDashboard.belum_lunas_sum)?.toLocaleString('id-ID', { style:"currency", currency:"IDR", minimumFractionDigits:0 })}</div>
          </div>
        </div>

        <div className="w-full mx-auto bg-white border-1 border-gray-400 rounded-xl shadow p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Pelanggan</h1>
            <a href="/pelanggan" className="border-1 border-gray-500 rounded-md px-2 py-1 text-gray-500 hover:bg-gray-500 hover:text-white duration-200 cursor-pointer">
              View All
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100 text-gray-500 text-sm">
                  <th className="text-center px-4 py-2 rounded-l-lg">Tanggal Masuk</th>
                  <th className="text-center px-4 py-2">Nama Pelanggan</th>
                  <th className="text-center px-4 py-2 rounded-r-lg">Kecamatan</th>
                </tr>
              </thead>
              <tbody>
                {dataPelanggan.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-50 text-gray-500 transition rounded-lg shadow-sm"
                  >
                    <td className="px-4 py-2 text-center">{item.tanggal_pemasangan}</td>
                    <td className="px-4 py-2 text-center">{item.name}</td>
                    <td className="px-4 py-2 text-center">{item.kecamatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {dataPelanggan.length === 0 && 
              <h1 className="py-3 text-center text-gray-500">Tidak ada pelanggan masuk</h1>
            }
          </div>
        </div>

        <div className="w-full mx-auto bg-white border-1 border-gray-400 rounded-xl shadow p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Transaksi</h1>
            <a href="/transaksi" className="border-1 border-gray-500 rounded-md px-2 py-1 text-gray-500 hover:bg-gray-500 hover:text-white duration-200 cursor-pointer">
              View All
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100 text-gray-500 text-sm">
                  <th className="text-center px-4 py-2 rounded-l-lg">Tanggal Masuk</th>
                  <th className="text-center px-4 py-2">Nama Pelanggan</th>
                  <th className="text-center px-4 py-2">Paket</th>
                  <th className="text-center px-4 py-2 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {dataTransaksi.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-50 text-gray-500 transition rounded-lg shadow-sm"
                  >
                    {/* <td className="px-4 py-2 text-center">{item.pelanggan?.tanggal_pemasangan}</td> */}
                    <td className="px-4 py-2 text-center">{item.pelanggan?.tanggal_pemasangan}</td>
                    <td className="px-4 py-2 text-center">{item.pelanggan?.name}</td>
                    <td className="px-4 py-2 text-center">{(item.pelanggan?.paket?.harga).toLocaleString('id-ID', { style:"currency", currency:"IDR", minimumFractionDigits:0 }) + '/Bln'}</td>
                    <td className="px-4 py-2 text-center">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {dataTransaksi.length === 0 && 
              <h1 className="py-3 text-center text-gray-500">Tidak ada transaksi masuk</h1>
            }
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};

export default Dashboard;
