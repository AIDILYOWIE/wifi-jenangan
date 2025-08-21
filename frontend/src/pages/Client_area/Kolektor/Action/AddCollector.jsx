import React from "react";
import {
  Dialog,
  DialogBackdrop,
} from "@headlessui/react";
import Button from "../../../../components/elements/Button";
import {
  ArrowBackIosNewOutlinedIcon,
  CheckOutlinedIcon,
} from "../../../../assets/RegisterAsset";
import Input from "../../../../components/elements/Input";
import SelectPaket from "../../../../components/elements/Select";
import {
  api,
  throttle,
  updateToastToError,
  updateToastToSuccess,
} from "../../../../utils/helper/helper";
import { useDataContext } from "../../../../../context/SendDataContext";
import { useEffect, useState } from "react";
import { DatePicker } from "../../../../components/elements/DatePicker";
import { toast, ToastContainer } from "react-toastify";

const AddCollector = React.memo(
  ({ open, setOpen, onClose, newCode, title, getDataPelanggan }) => {
    const { data, type } = useDataContext();
    const [namaKolektor, setNamaKolektor] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setconfirmPasswordError] = useState("");
    const [disabled, setDisabled] = useState(false);


    // handle kondisi
    const handleSubmit = () => {
      throttle(async () => {
        if (type == "add-pelanggan") {
          handleAddKolektor();
        } else if (type == "edit-pelanggan") {
          handleEditKolektor();
        } else {
          setDisabled(false)
        }
      }, 3000)
    }

    // handle Add Kolektor
    const handleAddKolektor = async () => {
      const toastId = toast.loading("Menambahkan Kolektor");
      try {
        const response = await api.post("/kolektor", {
          name: namaKolektor,
          email: email,
          password: password,
          confirm_password: confirmPassword
        });

        updateToastToSuccess(toastId, response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        updateToastToError(toastId, error.response.data.message);
      }
    };

    // handle Edit Kolektor
    const handleEditKolektor = async () => {
      const toastId = toast.loading("Edit Kolektor");
      try {
        const response = await api.put(`http://localhost:8080/api/v1/kolektor/${data.id}`, {
          name: namaKolektor,
          email: email,
          oldPassword: oldPassword,
          password: password,
          confirm_password : confirmPassword
        });
        updateToastToSuccess(toastId, response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        updateToastToError(toastId, error.response.data.message);
      }
    };

    // fetch data kolektor
    const fetchDataKolektor = async () => {
      try {
        const response = await api.get(`/kolektor/${data.id}`);
        const res = response.data.data;
        setNamaKolektor(res.name);
        setEmail(res.email);
      } catch (error) {
        console.log(error);
      }
    };

    const handleKonfirmPassword = (e) => {
      setConfirmPassword(e.target.value)
      if (password !== e.target.value) {
        return setconfirmPasswordError('Password tidak sama!')
      }
      setconfirmPasswordError('')
    }

    const resetForm = () => {
      setNamaKolektor('')
      setEmail('')
      setOldPassword('')
      setPassword('')
      setConfirmPassword('')
    }

    useEffect(() => {
      if (
        data?.id &&
        (type == "edit-pelanggan" || type == "detail-pelanggan")
      ) {
        fetchDataKolektor();
      }

      if (type == "add-pelanggan") {
        resetForm()
        setDisabled(false)
      }

      if (type == "detail-pelanggan") {
        setDisabled(true);
      }

      if (type == "edit-pelanggan") {resetForm(); setDisabled(false)}
    }, [data?.id, type]);

    return (
      <Dialog open={open} onClose={setOpen} className="relative z-90">
        <ToastContainer position="top-center" />
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 w-screen h-screen overflow-y-auto flex justify-center items-center ">
          <div className="flex flex-col max-[576px]:w-[350px] w-[800px] h-max bg-white rounded-[10px] max-[576px]:px-4 px-8 py-5 gap-[38px] max-[576px]:gap-[20px]">
            <header className="w-full flex justify-between">
              <div className="w-full">
                <h1 className="text-[length:20px] max-[576px]:text-[length:16px] font-[600]">{title}</h1>
              </div>
              <div className="w-full flex justify-end gap-2">
                <Button
                  className="w-max no-hover border-[1px] border-(--primary-color) rounded-[5px] max-[576px]:text-[12px] text-(--primary-color) px-3 !py-1.5 gap-1.5 hover:bg-red-700"
                  variant="secondary"
                  onClick={onClose}
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
              <div className="grid grid-cols-1 w-full gap-[20px]">
                <Input
                  name="name_kolektor"
                  label="Nama Kolektor"
                  placeholder="Masukan Nama Kolektor"
                  value={namaKolektor}
                  disabled={disabled}
                  onChange={(e) => setNamaKolektor(e.target.value)}
                  variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
                    ? "!text-(--text-color) "
                    : "!text-(--border-color) "
                    }  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                />
                <Input
                  name="email_kolektor"
                  label="Email Pelanggan"
                  placeholder="Masukan Email Kolektor"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disabled}
                  variant={`text-[12px] max-[576px]:text-[10px] max-[576px]:rounded-[5px] !text-(--border-color)  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1`}
                />
                {type != "detail-pelanggan" &&
                  <>
                    {type == 'edit-pelanggan' &&
                      <Input
                        type="password"
                        name="oldPassword"
                        label="Password Lama"
                        placeholder="Masukan Password Lama"
                        value={oldPassword}
                        disabled={disabled}
                        onChange={(e) => setOldPassword(e.target.value)}
                        variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
                          ? "!text-(--text-color) "
                          : "!text-(--border-color) "
                          }  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                      />
                    }
                    <Input
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="Masukan Password"
                      value={password}
                      disabled={disabled}
                      onChange={(e) => setPassword(e.target.value)}
                      variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
                        ? "!text-(--text-color) "
                        : "!text-(--border-color) "
                        }  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                    />
                    <div>
                      <Input
                        type="password"
                        name="confirm_password"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        disabled={disabled}
                        onChange={(e) => handleKonfirmPassword(e)}
                        variant={`text-[12px] ${type == "edit-pelanggan" || type == "add-pelanggan"
                          ? "!text-(--text-color) "
                          : "!text-(--border-color) "
                          }  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1 max-[576px]:text-[10px] max-[576px]:rounded-[5px]`}
                      />
                      {confirmPasswordError && <p className="text-red-700 text-xs mt-2">Password tidak sama</p>}
                    </div>

                  </>
                }

              </div>

              <div className="w-full flex justify-end">
                <Button
                  className={` ${disabled ? 'hidden' : ''} w-max rounded-[5px] max-[576px]:text-[12px] text-(--background-color) px-3 !py-1.5 gap-1.5`}
                  variant="primary"
                  disabled={disabled}
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
      </Dialog>
    );
  }
);
export default AddCollector;
