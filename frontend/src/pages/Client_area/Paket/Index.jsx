import BaseLayout from "../../../components/layouts/BaseLayout";
import {
  AddOutlinedIcon,
  PeopleAltOutlinedIcon,
  RssFeedIcon,
} from "../../../assets/RegisterAsset";
import HeaderPage from "../../../components/fragments/Header";

const Paket = () => {
  return (
    <BaseLayout text={"Pelanggan"}>
      <HeaderPage
        onClick={() => toggleModalCreate()}
        icon={
          <RssFeedIcon
            sx={{
              fontSize: {
                sm: "28px",
                md: "38px",
              },
              color: "#19297C",
            }}
          />
        }
        text={"Paket"}
        buttonIcon={
          <AddOutlinedIcon
            sx={{
              fontSize: {
                sm: "14px",
                md: "18px",
              },
            }}
          />
        }
      />

      <div className="w-ful p-5 bg-white rounded-[10px]">
        <div className="card flex flex-col md:flex-row items-start gap-x-6 w-full bg-white border-1 border-gray-500 rounded-xl px-6 py-5 max-w-xs overflow-hidden shadow">
            <h1 className="font-light flex md:flex-col mb-3 items-end text-gray-700"><span className="text-2xl font-bold mb-0">10</span>mbps</h1>
            <div className="content">
                <h1 className="title font-bold text-xl text-gray-800">Paket 10mbps</h1>
                <h2 className="timestamps text-xs text-gray-600 font-medium">Terakhir Update : 2025-07-20</h2>
                <p className="deskripsi text-xs mt-2 text-gray-700 line-clamp-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut aperiam blanditiis a eius doloremque repellat quae consectetur illo amet. Illum.</p>
            </div>
        </div>
      </div>

    </BaseLayout>

    
  );
};

export default Paket;
