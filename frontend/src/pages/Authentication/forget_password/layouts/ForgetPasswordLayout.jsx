import { arrow_down } from "../../../../assets/RegisterAsset"

const ForgetPasswordLayout = (props) => {
  return (
    <div className="w-full h-screen grid place-items-center px-3">
      <div className="card w-full max-w-md border-1 border-neutral-400 shadow-xl rounded-(--border-radius) p-4 flex flex-col gap-y-4">
        <div>
          <header className="flex items-center mb-2">
            <img src={arrow_down} alt="icon" className="rotate-90 cursor-pointer" onClick={() => {window.history.back()}} />
            <h1 className="text-xl font-semibold text-gray-700">
              {props.title}
            </h1>
          </header>
          <p className="text-xs text-gray-700 max-w-sm">{props.deskripsi}</p>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default ForgetPasswordLayout