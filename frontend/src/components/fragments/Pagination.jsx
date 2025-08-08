import { ChevronRightOutlinedIcon, ChevronLeftOutlinedIcon }  from "../../assets/RegisterAsset.js"
import { Link, useLocation } from "react-router-dom";

const Pagination = ({ data }) => {
	const current_page = Number(data?.current_page) ?? 1;
	const last_page = Number(data?.last_page);
	const prev_disable = data?.prev_page_url === null;
	const next_disable = data?.next_page_url === null ?? null;

	const { pathname } = useLocation()

	const createPagination = () => {
		const pages = [];

		if (last_page <= 5) {
			for (let i = 1; i <= last_page; i++) pages.push(i);
		} else if (current_page <= 2) {
			pages.push(1, 2, 3, "...", last_page);
		} else if (current_page === 3) {
			pages.push(1, "...", 2, 3, 4, "...", last_page);
		} else if (current_page > 3 && current_page < last_page - 2) {
			pages.push(1, "...", current_page - 1, current_page, current_page + 1, "...", last_page);
		} else {
			pages.push(1, "...", last_page - 2, last_page - 1, last_page);
		}

		return pages;
	};


	const pages = createPagination();

	return (
		<div className=" flex items-center justify-center gap-2 mt-6 select-none ml-auto">
			{/* Tombol Previous */}
			<Link
				to={`${pathname}?page=${current_page - 1}`}
                className={`flex items-center px-3 py-1.5 rounded-[5px] border-[1px] border-(--border-color) text-[12px] font-normal ${
                    prev_disable
                        ? "bg-gray-100 text-(--border-color) pointer-events-none"
                        : "bg-white hover:bg-gray-100"}`}
			      >
				<ChevronLeftOutlinedIcon sx={{
					fontSize: "16px"
				}}/>
				Kembali
			</Link>

			{/* Nomor halaman */}
			{pages.map((page, index) => {
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
						to={`${pathname}?page=${page}`}
                        className={`px-3 py-1.5 rounded-[5px] text-[12px] font-normal border-[1px] border-(--border-color) ${
                            current_page === page
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
				to={`${pathname}?page=${current_page + 1}`}
                className={`flex items-center px-3 py-1.5 rounded-[5px] border-[1px] border-(--border-color) text-[12px] font-normal ${
                    next_disable
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
