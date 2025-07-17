import React from "react";
import { AddOutlinedIcon } from "../../assets/RegisterAsset";
import Button from "../elements/Button";
import ButtonContext, { ButtonProvider } from "../../../context/ButtonContext";

const HeaderPage = React.memo(({ icon, text, onClick, buttonIcon = null, textButton = "Tambah" }) => {
  return (
    <ButtonProvider>
      <div className="w-full flex justify-between">
        <div className="w-full flex items-center gap-2.5">
          <div className=" p-2.5 rounded-[10px] bg-(--background-color) w-max h-max">
            {icon}
          </div>
          <h1 className=" text-2xl max-[576px]:text-[20px] font-semibold">
            {text}
          </h1>
        </div>
        <div className="w-full flex justify-end items-center ">
          <Button
            width="w-max"
            variant="primary"
            className=" px-4 py-2 max-[576px]:px-2.5 max-[576px]:py-2 gap-1.5 max-[576px]:text-[12px] !text-sm max-[576px]:rounded-[6px]"
            onClick={onClick}
          >
            {buttonIcon == null &&
              <buttonIcon
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "24px",
                  },
                }}
              />
            }
            {buttonIcon && buttonIcon }
            {textButton}
          </Button>
        </div>
      </div>
    </ButtonProvider>
  );
});

export default HeaderPage;
