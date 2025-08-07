import React from "react";
import logo from "../../../assets/icon/logo.png"

const DashboardPrintPage = (props) => {
  const data = props.data;
  return (
    <div
      className="w-full min-h-svh items-start text-center p-6 grid-rows-3 grid"
      ref={props.ref}
    >
      <div className={'grid  row grid-cols-2 border-b-[1px] border-(--text-color) pb-[70px]'}>
        <div className={'col '}>
          <img alt={"logo"} src={logo} width={'160px'}/>
          <div className='w-full'>
            <h3 className="text-start text-[length:14px] font-normal mt-[20px]">{data.date?.start} - {data.date?.end}</h3>
          </div>
        </div>
        <div className={'col min-h-full flex flex-col gap-[20px]'}>
          <div className='w-full'>
            <h1 className="text-end text-[length:24px] font-bold leading-[26px]">LAPORAN</h1>
          </div>
          <div className='w-full'>
            <h3 className="text-start text-[length:14px] font-normal">PT. ARSYA BINTANG NUSANTARA</h3>
            <h3 className="text-start text-[length:14px] font-normal">JENANGAN, PONOROGO</h3>
          </div>
        </div>
      </div>

      <div className={'grid  row grid-cols-2 justify-start '}>
        <div className={'col-span-2 flex  justify-between mb-[20px]'}>
          <div className={''}>
            <h1 className="text-start text-[length:18px] font-normal">Uang Lunas :</h1>
          </div>
          <div className={''}>
            <h1 className="text-end text-[length:20px] font-[600]">{data.lunas_sum?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }) || "Rp 0"}</h1>
          </div>
        </div>
        <div className={'col-span-2 flex justify-between pb-[20px]'}>
          <div className={''}>
            <h1 className="text-start text-[length:18px] font-normal">Uang Belum Lunas :</h1>
          </div>
          <div className={''}>
            <h1 className="text-end text-[length:20px] font-[600]">{data.belum_lunas_sum?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }) || "Rp 0"}</h1>
          </div>
        </div>

        <div className={'col-span-2 flex justify-between mt-[20px] pt-[20px] border-t-[1px] border-(--text-color)'}>
          <h1 className={'text-start font-semibold text-[length:20px]'}>Total</h1>
          <h1 className={'text-start font-semibold text-[length:20px]'}>{(data?.lunas_sum - data?.belum_lunas_sum).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }) || "Rp 0"}</h1>
        </div>
      </div>

    </div>
  );
};

export default DashboardPrintPage;
