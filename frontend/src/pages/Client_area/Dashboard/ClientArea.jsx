import React, { useEffect, useState } from 'react'
import Container from '../../../components/layouts/Container'
import HeaderPage from '../../../components/fragments/Header'
import { CloudUploadIcon, GridViewIcon, ImgNull } from '../../../assets/RegisterAsset'
import { useDateRange } from '../../../../context/DateRangeContext'
import { api } from '../../../utils/helper/helper'
import Pagination from '../../../components/fragments/Pagination'
import Table from '../../Invoice/Datagrid/Table'
import InvoiceModal from './Resource/InvoiceModal'
import { data } from 'react-router-dom'


const ClientArea = () => {

	const [dataDashboard, setDataDashboard] = useState([]);
	const { dateRange } = useDateRange();
	const [dataInvoice, setDataInvoice] = useState([]);
	const [paginateData, setPaginateData] = useState([]);
	const [desa, setDesa] = useState("");
	const start_date = dateRange?.start ? dateRange?.start : null;
	const end_date = dateRange?.end ? dateRange?.end : null;
	const now = new Date().toLocaleDateString("en-CA");


	const getDataDashboard = async () => {
		try {
			const response = await api.get("/dashboard/client", {
				params: {
					start_date: start_date,
					end_date: end_date,
				},
			});
			setDataDashboard(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDataDashboard();
	}, [dateRange]);


	const getDataInvoice = async () => {
		try {
			const response = await api.get("/tagihan", {
				params: { now },
			});
			setDataInvoice(response.data?.data.data)
			setPaginateData(response.data?.data)
			console.log(response.data?.data.data);

		} catch (error) {
			console.log(error);
		}
	};

	const [filteredInvoice, setFilteredInvoice] = useState([]);

	// handle input change
	const handleChangeDesa = (e) => {
		const value = e.target.value;
		setDesa(value);

		if (!value.trim()) {
			setFilteredInvoice([]);
		} else {
			const filtered = dataInvoice.filter((item) => {
				const desaLower = item.pelanggan.desa?.toLowerCase() || "";
				const kecamatanLower = item.pelanggan.kecamatan?.toLowerCase() || "";
				const searchLower = value.toLowerCase();
				return desaLower.includes(searchLower) || kecamatanLower.includes(searchLower);
			});
			setFilteredInvoice(filtered);
		}
	};

	useEffect(() => {
		getDataInvoice();
	}, [now]);
	const filterType = desa == "" || !desa ? "all" : desa

	return (
		<div className="w-full min-h-screen flex">
			<div className={`flex flex-col items-center w-full gap-y-5 bg-(--secondary-background-color) max-[800px]:pb-[90px] duration-200 max-[800px]:ps-0`}>
				<Container>
					<div className="w-full flex flex-wrap justify-between ">
						<HeaderPage
							icon={
								<GridViewIcon
									sx={{
										fontSize: {
											sm: "28px",
											md: "38px",
										},
										color: "#19297C",
									}}
								/>
							}
							text={"Dashboard"}
							textButton={"Export"}
							type={"date-range"}
							onClick={() => { handlePrint() }}
							buttonIcon={
								<CloudUploadIcon
									sx={{
										fontSize: {
											xs: "16px",
											md: "20px",
										},
									}}
								/>
							}
						/>
					</div>
					<main className="flex flex-col gap-y-[20px]" >
						<div className="card grid grid-cols-2 max-sm:grid-cols-1 items-center w-full gap-5 max-sm:gap-2">
							<div
								className="rounded-xl flex flex-col items-start justify-center px-5 py-2.5 text-white shadow-lg w-full h-[97px] d-sudah-bayar"
								id="d-sudah-bayar"
							>
								<h3 className=" opacity-80 text-[length:14px] font-light">
									Sudah bayar
								</h3>
								<h1 className="text-[length:24px] font-semibold">
									{dataDashboard.lunas?.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
										minimumFractionDigits: 0,
									}) || "Rp 0"}
								</h1>
							</div>
							<div
								className="overflow-hidden rounded-xl bg-gradient-to-br from-red-700 to-red-600 flex flex-col items-start justify-center px-5 py-2.5 text-white w-full h-[97px] "
								id="d-belum-bayar"
							>
								<h3 className="text-[length:14px] font-light opacity-80">
									Belum bayar
								</h3>
								<h1 className="text-[length:24px] font-semibold">
									{dataDashboard.belum_lunas?.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
										minimumFractionDigits: 0,
									}) || "Rp 0"}
								</h1>
							</div>
						</div>


						{dataInvoice?.length === 0 || paginateData?.length === 0 || !paginateData ? (
							<div className={"w-full flex justify-center"}>
								<img src={ImgNull} className={'w-[300px] max-[576px]:w-[200px]'} alt={"null data"} />
							</div>
						) : (
							<div className="w-full p-5 bg-white border-[1px] border-(--border-color) rounded-[10px] flex flex-col items-end">
								<input
									type="text"
									placeholder="Masukkan desa/kecamatan"
									value={desa}
									onChange={(e) => handleChangeDesa(e)}
									className="border w-full max-w-56 px-3 text-sm py-1 rounded-md mb-3 ml-auto"
								/>
								<div className="w-full overflow-x-auto">
									<Table dataInvoice={desa.trim().length > 0 ? filteredInvoice : dataInvoice} />
									{/* <Table dataInvoice={filteredInvoice.length ? filteredInvoice : dataInvoice} /> */}
								</div>
								<div className={"flex flex-col justify-start"}>
									<Pagination data={paginateData} />
								</div>
							</div>
						)}
					</main>
				</Container>
			</div>
		</div>

	)
}

export default ClientArea