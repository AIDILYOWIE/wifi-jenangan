import { useParams } from "react-router-dom";
import { api } from "../../../utils/helper/helper";
import { useEffect, useState, forwardRef } from "react";

const PrintPage = forwardRef(({ id, onReady }, ref) => {
  const [dataTagihan, setDataTagihan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const now = new Date().toLocaleDateString("en-CA");

  const getDetailTagihan = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/tagihan/${id}`);
      setDataTagihan(response.data.data);
    } catch (error) {
      console.log("Error fetching tagihan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailTagihan();
    }
  }, [id]);

  // Effect untuk memberitahu parent bahwa component sudah siap untuk di-print
  useEffect(() => {
    if (!isLoading && dataTagihan?.id && onReady) {
      // Delay sedikit untuk memastikan DOM sudah ter-render sempurna
      const timer = setTimeout(() => {
        console.log("PrintPage calling onReady with data:", dataTagihan?.pelanggan?.name);
        onReady();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, dataTagihan, onReady]);

  // Jika masih loading atau data belum ada, render loading state
  if (isLoading || !dataTagihan) {
    return (
      <section ref={ref} style={{ width: "80mm", padding: "20px" }}>
        <div>Loading invoice data...</div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ width: "100%", height: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <header className="py-4 bg-sky-200 text-white print-bg">
        <div className="content bg-sky-900 flex items-start justify-between p-3 print-bg">
          <div className="w-full max-w-fit">
            <h1 className="text-sm font font-semibold mb-2">
              PT. ARSYA BINTANG NUSANTARA
            </h1>
            <p className="text-[11px] max-w-46">
              Dusun / Jalan {dataTagihan?.pelanggan?.dusun} Desa{" "}
              {dataTagihan?.pelanggan?.desa} Kecamatan{" "}
              {dataTagihan?.pelanggan?.kecamatan}
            </p>
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
                <h2 className="text-[11px]">
                  {dataTagihan?.pelanggan?.kode_pelanggan}
                </h2>
                <h2 className="text-[11px]">{now}</h2>
                <h2 className="text-[11px]">
                  {dataTagihan?.tanggal ? new Date(dataTagihan.tanggal).toLocaleDateString() : '-'}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <div className="p-4">
          <h1 className="text-sm">Kepada YTH.</h1>
          <h1 className="text-sm font-semibold mb-3">
            {dataTagihan?.pelanggan?.name}
          </h1>

          <div className="flex w-full justify-between mb-1">
            <div className="w-full flex justify-start">
              <h1 className="text-sm">No Pelanggan</h1>
            </div>
            <div className="w-full flex justify-end gap-1.5 items-center">
              <p>:</p>
              <p className="text-sm">
                {dataTagihan?.pelanggan?.kode_pelanggan}
              </p>
            </div>
          </div>

          <div className="flex w-full justify-between mb-1">
            <div className="w-full flex justify-start">
              <h1 className="text-sm">Kecamatan</h1>
            </div>
            <div className="w-full flex justify-end gap-1.5 items-center">
              <p>:</p>
              <p className="text-sm">{dataTagihan?.pelanggan?.kecamatan}</p>
            </div>
          </div>

          <div className="flex w-full justify-between mb-1">
            <div className="w-full flex justify-start">
              <h1 className="text-sm">Desa</h1>
            </div>
            <div className="w-full flex justify-end gap-1.5 items-center">
              <p>:</p>
              <p className="text-sm">{dataTagihan?.pelanggan?.desa}</p>
            </div>
          </div>

          <div className="flex w-full justify-between mb-1">
            <div className="w-full flex justify-start">
              <h1 className="text-sm">Dusun / Jalan</h1>
            </div>
            <div className="w-full flex justify-end gap-1.5 items-center">
              <p>:</p>
              <p className="text-sm">{dataTagihan?.pelanggan?.dusun}</p>
            </div>
          </div>

          <div className="flex w-full justify-between mb-3">
            <div className="w-full flex justify-start">
              <h1 className="text-sm">Biaya Perbulan</h1>
            </div>
            <div className="w-full flex justify-end gap-1.5 items-center">
              <p>:</p>
              <p className="text-sm">
                {dataTagihan?.pelanggan?.paket?.harga?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }) || 'Rp 0'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-sky-200">
          <h1 className="text-md py-1 px-4 font-bold">RINCIAN PEMBAYARAN</h1>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-[1fr_auto] gap-1 items-center">
            <h1 className="text-sm">{dataTagihan?.name || 'Pembayaran Bulanan'}</h1>
            <p className="text-sm">
              {((dataTagihan?.pelanggan?.paket?.harga || 0) + 15000)?.toLocaleString(
                "id-ID",
                { style: "currency", currency: "IDR", minimumFractionDigits: 0 }
              )}
            </p>
          </div>
        </div>

        <div className="bg-sky-200">
          <h1 className="text-md py-1 px-4 font-bold">POTONGAN PEMBAYARAN</h1>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-[1fr_auto] gap-1 items-center">
            <h1 className="text-sm">Promo Loyality Program</h1>
            <p className="text-sm">
              {(5000)?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-1 items-center">
            <h1 className="text-sm">Leave Payment</h1>
            <p className="text-sm">-</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-1 items-center">
            <h1 className="text-sm">Const Reduction</h1>
            <p className="text-sm">
              {(10000)?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-1 items-center border-t-[1px] border-gray-800 px-4 py-2">
          <h1 className="text-sm font-semibold">TOTAL PEMBAYARAN</h1>
          <p className="text-sm">
            {dataTagihan?.pelanggan?.paket?.harga?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }) || 'Rp 0'}
          </p>
        </div>
      </main>

      <footer className="p-4 text-xs">
        <p>Catatan</p>
        <ol className="list-decimal list-inside">
          <li>
            Pembayaran bisa dilakukan melalui transfer ke nomor rekening :{" "}
            <span className="font-semibold">
              171-00-1162504-6 MANDIRI An. PT. ARSYA BINTANG NUSANTARA
            </span>
          </li>
          <li>
            Setelah melakukan transaksi silahkan konfirmasi pembayaran dengan
            menghubungi nomor 085xxxxxxxx{" "}
          </li>
        </ol>
      </footer>

      {/* CSS khusus untuk print */}
      <style jsx>{`
        @media print {
          .print-bg {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </section>
  );
});

PrintPage.displayName = 'PrintPage';

export default PrintPage;