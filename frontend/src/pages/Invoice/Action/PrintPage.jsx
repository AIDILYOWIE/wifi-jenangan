import { useParams } from "react-router-dom"
import { api } from "../../../utils/helper/helper"
import { useEffect, useState } from "react"

const PrintPage = () => {
    const [dataTagihan, setDataTagihan] = useState({})
    const [now, setNow] = useState(new Date().toLocaleDateString())
    const { id } = useParams()

    const getDetailTagihan = async () => {
        try {
            const response = await api.get(`/tagihan/${id}`)
            setDataTagihan(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setNow(new Date().toLocaleDateString())
        getDetailTagihan()

    }, [])

    useEffect(() => {
        if (dataTagihan) {
            // Tambahkan delay dikit biar render stabil
            const timeout = setTimeout(() => {
                window.print();
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [dataTagihan]);
    
  return (
    <section className="w-[420px] max-h-full bg-white">
        <header className="py-4 bg-sky-200 text-white">
            <div className="content bg-sky-900 flex items-start justify-between p-3" >
                <div className="w-full max-w-fit">
                    <h1 className="text-sm font font-semibold mb-2">PT. ARSYA BINTANG NUSANTARA</h1>
                    <p className="text-[11px] max-w-46">Dusun / Jalan {dataTagihan?.pelanggan?.dusun} Desa {dataTagihan?.pelanggan?.desa} Kecamatan {dataTagihan?.pelanggan?.kecamatan}</p>
                </div>
                <div className="flex flex-col items-end">
                    <h1 className="text-[22px] font-semibold">INVOICE</h1>
                    <div className="detail flex gap-x-2">
                        <div className="field text-end">
                            <h2 className="text-[11px]">No :</h2>
                            <h2 className="text-[11px]">Tanggal :</h2>
                            <h2 className="text-[11px]">Tgl. Jatuh Tempo :</h2>
                        </div>
                        <div className="value w-full max-w-fit">
                            <h2 className="text-[11px]">{dataTagihan?.pelanggan?.kode_pelanggan}</h2>
                            <h2 className="text-[11px]">{now}</h2>
                            <h2 className="text-[11px]">{new Date(dataTagihan?.tanggal).toLocaleDateString()}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div className="p-4">
                <h1 className="text-sm">Kepada YTH.</h1>
                <h1 className="text-sm font-semibold mb-3">{dataTagihan?.pelanggan?.name}</h1>
                <div className="grid grid-cols-[1fr_min-content_1fr] gap-1 items-center">
                    <h1 className="text-sm">No Pelanggan</h1>
                    <p>:</p>
                    <p className="text-sm">{dataTagihan?.pelanggan?.kode_pelanggan}</p>
                </div>
                <div className="grid grid-cols-[1fr_min-content_1fr] gap-1 items-center">
                    <h1 className="text-sm">Kecamatan</h1>
                    <p>:</p>
                    <p className="text-sm">{dataTagihan?.pelanggan?.kecamatan}</p>
                </div>
                <div className="grid grid-cols-[1fr_min-content_1fr] gap-1 items-center">
                    <h1 className="text-sm">Desa</h1>
                    <p>:</p>
                    <p className="text-sm">{dataTagihan?.pelanggan?.desa}</p>
                </div>
                <div className="grid grid-cols-[1fr_min-content_1fr] gap-1 items-center">
                    <h1 className="text-sm">Dusun/jalan</h1>
                    <p>:</p>
                    <p className="text-sm">{dataTagihan?.pelanggan?.dusun}</p>
                </div>
                <div className="grid grid-cols-[1fr_min-content_1fr] gap-1 items-center">
                    <h1 className="text-sm">Biaya Perbulan</h1>
                    <p>:</p>
                    <p className="text-sm">{dataTagihan?.pelanggan?.paket?.harga?.toLocaleString("id-ID", { style:"currency", currency:"IDR", minimumFractionDigits: 0})}</p>
                </div>
            </div>
            <div className="bg-sky-200">
                <h1 className="text-md py-1 px-4 font-bold">RINCIAN PEMBAYARAN</h1>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-[1fr_auto] gap-1 items-center">
                    <h1 className="text-sm">{dataTagihan?.name}</h1>
                    <p className="text-sm">{(dataTagihan?.pelanggan?.paket?.harga + 15000)?.toLocaleString('id-ID', { style:"currency", currency:"IDR", minimumFractionDigits : 0 })}</p>
                </div>
            </div>
            <div className="bg-sky-200">
                <h1 className="text-md py-1 px-4 font-bold">POTONGAN PEMBAYARAN</h1>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-[1fr_auto] gap-1 items-center">
                    <h1 className="text-sm">Promo Loyality Program</h1>
                    <p className="text-sm">{(5000)?.toLocaleString('id-ID', { style:"currency", currency:"IDR", minimumFractionDigits : 0 })}</p>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-1 items-center">
                    <h1 className="text-sm">Leave Payment</h1>
                    <p className="text-sm">-</p>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-1 items-center">
                    <h1 className="text-sm">Const Reduction</h1>
                    <p className="text-sm">{(10000)?.toLocaleString('id-ID', { style:"currency", currency:"IDR", minimumFractionDigits : 0 })}</p>
                </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-1 items-center border-t-[1px] border-gray-800 px-4 py-2">
                <h1 className="text-sm font-semibold">TOTAL PEMBAYARAN</h1>
                <p className="text-sm">{(dataTagihan?.pelanggan?.paket?.harga)?.toLocaleString('id-ID', { style:"currency", currency:"IDR", minimumFractionDigits : 0 })}</p>
            </div>
        </main>
        <footer className="p-4 text-xs">
            <p>Catatan</p>
            <ol className="list-decimal list-inside">
                <li>Pembayaran bisa dilakukan melalui transfer ke nomor rekening : <span className="font-semibold">171-00-1162504-6 MANDIRI An. PT. ARSYA BINTANG NUSANTARA</span></li>
                <li>Setelah melakukan transaksi silahkan konfirmasi pembayaran dengan menghubungi nomor 085xxxxxxxx </li>
            </ol>
        </footer>
    </section>
  )
}

export default PrintPage