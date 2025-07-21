// import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { TableBody, TableHead } from '../../../../components/elements/TableStructure';
import { ButtonAction } from '../../../../components/elements/Button';
import { api, updateToastToSuccess } from '../../../../utils/helper/helper';
import { CheckIcon, PrintIcon, SearchIcon } from '../../../../assets/RegisterAsset';


const Table = () => {

    const [dataTransaksi, setDataTransaksi] = useState([])

    // jangan lupa dirubah sesuai inputan
    const startDate = new Date(2025, 2,20)
    const endDate = new Date(2025,9,20)

    const getDataTransaksi = async () => {
        try {
            const response = await api.get('/transaksi', {
                params : { 
                    start_date : startDate,
                    end_date : endDate
                }
            })
            setDataTransaksi(response.data.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const confirmTagihan = (id) => {
        const toastId = toast.loading("Mengkonfirmasi...")
        api.put(`/tagihan/${id}`)
            .then(res => {
                updateToastToSuccess(toastId, "Tagihan berhasil dikonfirmasi!")
                setTimeout(function() {
                    window.location.reload()
                }, 1000);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getDataTransaksi()
    }, [])
    return (
        <div className=' min-[1000px]:w-full max-[1000px]:w-[1000px] flex'>
            <ToastContainer position='top-center'/>
            <div className='w-full'>
                <TableHead value="Tanggal Masuk" style='rounded-l-[10px]'/>
                {dataTransaksi && dataTransaksi.map((item, i) => (
                    <TableBody value={item?.pelanggan?.tanggal_pemasangan} key={i} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Nama Pelanggan" />
                {dataTransaksi && dataTransaksi.map((item, i) => (
                    <TableBody value={item?.pelanggan?.name} key={i}/>
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Kecamatan" />
                {dataTransaksi && dataTransaksi.map((item, i) => (
                    <TableBody value={item?.pelanggan?.kecamatan} key={i} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Paket" />
                {dataTransaksi && dataTransaksi.map((item, i) => (
                    <TableBody value={(item.pelanggan.paket.harga).toLocaleString('id-ID', { style:"currency", currency:'IDR', minimumFractionDigits : 0 }) + '/Bln'} key={i} />
                ))}
            </div>
            <div className='w-max'>
                <TableHead value="Status" />
                {dataTransaksi && dataTransaksi.map((item, i) => (
                    <TableBody value={item.status} key={i} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Action" style='rounded-r-[10px]'/>
                {dataTransaksi && dataTransaksi.map((item,i) => (
                    <TableBody type="action" key={i}>
                        {item.status == "Lunas" &&
                            <ButtonAction style={'bg-(--bg-detail)'}>
                                    <SearchIcon sx={{
                                        color: '#5FC7FF',
                                        fontSize: '20px'
                                    }} />
                            </ButtonAction>
                        }
                        {item.status == "Belum Lunas" &&
                            <ButtonAction onClick={() => {confirmTagihan(item.id)}} style={'bg-green-200'}>
                                    <CheckIcon sx={{
                                        color: '#008000',
                                        fontSize: '20px'
                                    }} />
                            </ButtonAction>
                        }
                    </TableBody>
                ))}

            </div>
        </div>
    )
}

export default Table