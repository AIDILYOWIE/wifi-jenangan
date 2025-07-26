import React from "react";
import { AddOutlinedIcon } from "../../assets/RegisterAsset";
import Button from "../elements/Button";
import ButtonContext, { ButtonProvider } from "../../../context/ButtonContext";
import DateRangePicker from "../elements/DateRangePicker";

const HeaderPage = React.memo(
  ({
    icon,
    text,
    onClick,
    buttonIcon = null,
    textButton = "Tambah",
    isHidden,
    type,
  }) => {
    return (
      <ButtonProvider>
        <div className="w-full flex justify-between max-[576px]:flex-col gap-[10px]">
          <div className="w-full flex items-center gap-2.5">
            <div className=" p-2.5 rounded-[10px] bg-(--background-color) w-max h-max">
              {icon}
            </div>
            <h1 className=" text-2xl max-[576px]:text-[20px] font-semibold text-(--text-color)">
              {text}
            </h1>
          </div>
          <div
            className={`w-full  justify-end items-center ${
              isHidden !== true ? "flex" : "hidden"
            }`}
          >
            {type === "date-range" ? (
              <DateRangePicker />
            ) : (
              <Button
                width="w-max"
                variant="primary"
                className=" px-4 py-2 max-[576px]:px-2.5 max-[576px]:py-2 gap-1.5 max-[576px]:text-[12px] !text-sm max-[576px]:rounded-[6px] max-[576px]:absolute max-[576px]:bottom-0 max-[576px]:right-[8px]"
                onClick={onClick}
              >
                {buttonIcon}
                <h6 className="max-[576px]:hidden">{textButton}</h6>
              </Button>
            )}
          </div>
        </div>
      </ButtonProvider>
    );
  }
);

export default HeaderPage;
