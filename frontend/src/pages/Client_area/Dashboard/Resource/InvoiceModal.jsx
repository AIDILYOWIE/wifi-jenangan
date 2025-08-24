import { Dialog, DialogBackdrop } from '@headlessui/react';
import React from 'react'
import { ToastContainer } from 'react-toastify';
import Button from '../../../../components/elements/Button';
import { ArrowBackIosNewOutlinedIcon, CheckOutlinedIcon } from '../../../../assets/RegisterAsset';
import Input from '../../../../components/elements/Input';
import { DatePicker } from '../../../../components/elements/DatePicker';
import SelectPaket from '../../../../components/elements/Select';

const InvoiceModal = ({ data }) => {

	const type = 'add-pelanggan';
	const disabled = true


	return (
		<div className="relative z-90">
			<ToastContainer position="top-center" />
			<div
				transition
				className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
			/>

			<div className="fixed inset-0 w-screen h-screen overflow-y-auto flex justify-center items-center ">
				<div className="flex flex-col max-[576px]:w-[350px] w-[800px] h-max bg-white rounded-[10px] max-[576px]:px-4 px-8 py-5 gap-[38px] max-[576px]:gap-[20px]">
					<header className="w-full flex justify-between">
						<div className="w-full">
							<h1 className="text-[length:20px] max-[576px]:text-[length:16px] font-[600]">Detail Penagihan</h1>
						</div>
						<div className="w-full flex justify-end gap-2">
							<Button
								className="w-max no-hover border-[1px] border-(--primary-color) rounded-[5px] max-[576px]:text-[12px] text-(--primary-color) px-3 !py-1.5 gap-1.5 hover:bg-red-700"
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
					<div className="w-full flex flex-col max-[576px]:gap-[10px] gap-[20px]">
						<div className="grid grid-cols-2 max-[576px]:grid-cols-1 w-full gap-[20px] max-[576px]:gap-[10px]">
							<div className="">
								<Input
									name="nama_pelanggan"
									label="Nama Pelanggan"
									placeholder="Masukan Nama Pelanggan"
									value={""}
									disabled={true}
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
									value={""}
									disabled={true}
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
									value={""}
									disabled={true}
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
									value={""}
									disabled={true}
									onChange={(e) => setDusunJalan(e.target.value)}
									variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
										? "!text-(--text-color) "
										: "!text-(--border-color) "
										} border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 max-[576px]:grid-cols-1 w-full gap-[20px] max-[576px]:gap-[10px]">
							<SelectPaket
								name="paket"
								value={""}
								disabled={true}
								variant={`${type == "edit-pelanggan" || type == "add-pelanggan"
									? "!text-(--text-color) "
									: "!text-(--border-color) "
									} max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
							/>
							<Input
								name="jumlah_bayar"
								label="Nominal Tagihan"
								value={""}
								disabled={true}
								variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
									? "!text-(--text-color) "
									: "!text-(--border-color) "
									} border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
							/>
						</div>

						<div className="w-full flex justify-end">
							<Button
								className={` ${disabled ? 'hidden' : ''} w-max rounded-[5px] max-[576px]:text-[12px] text-(--background-color) px-3 !py-1.5 gap-1.5`}
								variant="primary"
								disabled={true}
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
		</div>
	)
}

export default InvoiceModal