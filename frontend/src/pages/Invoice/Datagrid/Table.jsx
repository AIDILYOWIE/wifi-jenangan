import { useEffect, useState, useRef, useCallback } from "react";
import {
  TableBody,
  TableHead,
} from "../../../components/elements/TableStructure";
import { ButtonAction } from "../../../components/elements/Button";
import { api, getRole, throttle, updateToastToError, updateToastToSuccess } from "../../../utils/helper/helper";
import { CheckIcon, PrintIcon } from "../../../assets/RegisterAsset";
import { toast, ToastContainer } from "react-toastify";
import PrintPage from "../Action/PrintPage";
import { useReactToPrint } from "react-to-print";

const Table = ({ dataInvoice }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [triggerPrint, setTriggerPrint] = useState(false);
  const printComponentRef = useRef(null);
  const [isPrintReady, setIsPrintReady] = useState(false);

  // Callback untuk onReady dari PrintPage
  const handlePrintReady = useCallback(() => {
    setIsPrintReady(true);
  }, []);

  // Konfigurasi react-to-print v3.x
  const reactToPrintFn = useReactToPrint({
    contentRef: printComponentRef,
    documentTitle: `Invoice-${selectedId}`,
    onBeforeGetContent: () => {
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setTriggerPrint(false);
      setSelectedId(null);
      setIsPrintReady(false);
    },
    onPrintError: (errorLocation, error) => {
      console.error("Print error at:", errorLocation, error);
      toast.error("Gagal mencetak invoice");
      setTriggerPrint(false);
      setIsPrintReady(false);
    },
    removeAfterPrint: false,
  });

  const handlePrint = (id) => {
    setSelectedId(id);
    setTriggerPrint(true);
    setIsPrintReady(false);
  };

  // Effect untuk memulai print ketika data sudah siap
  useEffect(() => {
    if (isPrintReady && printComponentRef.current && triggerPrint && selectedId) {
      // Delay untuk memastikan component sudah ter-render sempurna
      const timer = setTimeout(() => {
        if (printComponentRef.current) {
          reactToPrintFn();
        } else {
          toast.error("Komponen print tidak siap");
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isPrintReady, triggerPrint, selectedId, reactToPrintFn]);

  const confirmTagihan = (id) => {
    throttle(() => {
      const toastId = toast.loading("Mengkonfirmasi...");
      api
        .put(`/tagihan/${id}`)
        .then(() => {
          updateToastToSuccess(toastId, "Tagihan berhasil dikonfirmasi!");
          setTimeout(() => window.location.reload(), 1000);
        })
        .catch((err) => updateToastToError(toastId, err.response.data.message));

    }, 3000)
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="min-[1000px]:w-full max-[1000px]:w-[1000px] flex">
        {getRole.get() == 'admin' &&
          <div className="w-full">
            <TableHead value="Kode Pelanggan" style="rounded-l-[10px]" />
            {dataInvoice?.map((item, i) => (
              <TableBody value={item.pelanggan.kode_pelanggan} key={i} />
            ))}
          </div>
        }
        <div className="w-full">
          <TableHead value="Nama Pelanggan" />
          {dataInvoice?.map((item, i) => (
            <TableBody value={item.pelanggan.name} key={i} />
          ))}
        </div>
        <div className="w-full">
          <TableHead value="Tanggal Tagihan" />
          {dataInvoice?.map((item, i) => (
            <TableBody value={item.tanggal} key={i} />
          ))}
        </div>
        {getRole.get() == 'collector' &&
          <>
            <div className="w-full">
              <TableHead value="Desa" style="rounded-l-[10px]" />
              {dataInvoice?.map((item, i) => (
                <TableBody value={item.pelanggan.desa} key={i} />
              ))}
            </div>
            <div className="w-full">
              <TableHead value="Kecamatan" style="rounded-l-[10px]" />
              {dataInvoice?.map((item, i) => (
                <TableBody value={item.pelanggan.kecamatan} key={i} />
              ))}
            </div>
          </>
        }
        <div className="w-full">
          <TableHead value="Paket" />
          {dataInvoice?.map((item, i) => (
            <TableBody value={item.pelanggan.paket.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) + "/Bln"} key={i} />
          ))}
        </div>
        <div className="w-full">
          <TableHead value="Action" style="rounded-r-[10px]" />
          {dataInvoice?.map((item, i) => (
            <TableBody type="action" key={i}>
              <ButtonAction
                onClick={() => confirmTagihan(item.id)}
                style={"bg-green-200 text-green-700"}
              >
                <CheckIcon sx={{ fontSize: "20px" }} />
              </ButtonAction>
              {getRole.get() == 'admin' &&
                <ButtonAction
                  onClick={() => handlePrint(item.id)}
                  style={"bg-(--bg-detail)"}
                  disabled={triggerPrint} // Disable saat sedang print
                >
                  <PrintIcon sx={{ color: "#5FC7FF", fontSize: "20px" }} />
                </ButtonAction>
              }
            </TableBody>
          ))}
        </div>
      </div>

      {/* Komponen PrintPage - harus tetap ada di DOM saat printing */}
      <div style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        visibility: triggerPrint ? 'visible' : 'hidden'
      }}>
        {triggerPrint && selectedId && (
          <PrintPage
            id={selectedId}
            ref={printComponentRef}
            onReady={handlePrintReady}
          />
        )}
      </div>

    </>
  );
};

export default Table;