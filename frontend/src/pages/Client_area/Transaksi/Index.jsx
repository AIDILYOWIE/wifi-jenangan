import { ReceiptOutlinedIcon } from "../../../assets/RegisterAsset"
import HeaderPage from "../../../components/fragments/Header"
import BaseLayout from "../../../components/layouts/BaseLayout"
import Table from "./Datagrid/Table"

const Invoice = () => {
  return (
    <BaseLayout >
      <HeaderPage
        text={"Transaksi"}
        canCreate = {false}
        icon={
          <ReceiptOutlinedIcon
            sx={{
              fontSize: {
                sm: "28px",
                md: "38px",
              },
              color: "#19297C",
            }}
          />
        }
      />
      <div className="w-ful p-5 bg-white border-[1px] border-(--border-color) rounded-[10px]">
        <div className="w-full overflow-x-auto">
          <Table />
        </div>
      </div>

    </BaseLayout>
  )
}

export default Invoice