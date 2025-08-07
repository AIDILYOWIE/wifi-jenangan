import { Link } from "react-router-dom";
import { ChevronRightOutlinedIcon, ChevronLeftOutlinedIcon }  from "../../assets/RegisterAsset.js"
import {useEffect, useState} from "react";

const Pagination = ({ data }) => {
	const [prevDisabled, setPrevDisabled] =  useState(false);
	const [nextDisabled, setNextDisabled] =  useState(false);
	const [lastPage, setLastPage] =  useState(0);
	const [currentPage, setCurrentPage] =  useState(0);

	useEffect(() => {

		setCurrentPage(Number(data?.current_page))
		setLastPage(Number(data?.last_page))
		setPrevDisabled(data?.prev_page_url === null)
		setNextDisabled(data?.next_page_url === null)
	}, [data]);

		const createPagination = () => {
			const pages = [];

			if (lastPage <= 5) {
				for (let i = 1; i <= lastPage; i++) pages.push(i);
			} else if (currentPage <= 2) {
				pages.push(1, 2, 3, "...", lastPage);
			} else if (currentPage === 3) {
				pages.push(1, "...", 2, 3, 4, "...", lastPage);
			} else if (currentPage > 3 && currentPage < lastPage - 2) {
				pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastPage);
			} else {
				pages.push(1, "...", lastPage - 2, lastPage - 1, lastPage);
			}

			return pages;
		};


	const pages = createPagination();

	return (
		<div className=" flex items-center justify-center gap-2 mt-6 select-none ml-auto">
			{/* Tombol Previous */}
			<Link
				to={`/pelanggan?page=${currentPage - 1}`}
				className={`flex items-center px-3 py-1.5 rounded-[5px] border-[1px] border-(--border-color) text-[12px] font-normal ${
					prevDisabled
						? "bg-gray-100 text-(--border-color) pointer-events-none"
						: "bg-white hover:bg-gray-100"
				}`}
			>
				<ChevronLeftOutlinedIcon sx={{
					fontSize: "16px"
				}}/>
				Kembali
			</Link>

			{/* Nomor halaman */}
			{pages.map((page, index) => {
				if(!Number.isFinite(page)) return null;
				if (page === "...") {
					return (
						<span key={index} className="px-2 text-gray-500">
							...
						</span>
					);
				}

				return (
					<Link
						key={index}
						to={`/pelanggan?page=${page}`}
						className={`px-3 py-1.5 rounded-[5px] text-[12px] font-normal border-[1px] border-(--border-color) ${
							currentPage === page
								? "bg-(--border-color) border-none text-white border-white" 
								: "bg-white hover:bg-gray-100 text-gray-700"
						}`}
					>
						{page}
					</Link>
				);
			})}

			{/* Tombol Next */}
			<Link
				to={`/pelanggan?page=${currentPage + 1}`}
				className={`flex items-center px-3 py-1.5 rounded-[5px] border-[1px] border-(--border-color) text-[12px] font-normal ${
					nextDisabled
						? "bg-gray-100 text-(--border-color) pointer-events-none"
						: "bg-white hover:bg-gray-100"
				}`}
			>
				Next <ChevronRightOutlinedIcon sx={{
					fontSize: "16px"
				}}
			/>
			</Link>
		</div>
	);
};

export default Pagination;
