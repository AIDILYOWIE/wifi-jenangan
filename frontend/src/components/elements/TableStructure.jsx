import React from "react";

export const TableHead = React.memo(({ width = "w-fill", value = "Header", style }) => {
    return (
        <div
            className={`${width}  text-center bg-[#F3F3F3] px-5 py-2.5 ${style}`}
        >
            <p className="text-(--border-color) text-[14px] font-semibold">{value}</p>
        </div>
    );
})

export const TableBody = React.memo(({
    width = "w-full",
    value = "Body",
    type = "default",
    children,
}) => {
    return (
        <div className={`${width} h-[54px]  text-center 'py-[10px] px-[10px]'} border-b-1 border-(--border-color-2) flex items-center justify-center gap-[5px]`}>
            {type == "default" ? (
                <p className="text-(--text-color) text-[16px] font-light">{value}</p>
            ) : (
                children
            )}
        </div>
    );
})