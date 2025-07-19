// import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { TableBody, TableHead } from '../../../components/elements/TableStructure';
import { ButtonAction } from '../../../components/elements/Button';
import { api, updateToastToSuccess } from '../../../utils/helper/helper';
import { CheckIcon, DeleteIcon, EditIcon, PrintIcon, SearchIcon } from '../../../assets/RegisterAsset';
import { toast, ToastContainer } from 'react-toastify';


const Table = () => {

    const [dataInvoice, setDataInvoice] = useState([])

    const now = new Date().toLocaleDateString('en-CA')

    const getDataInvoice = async () => {
        try {
            const response = await api.get('/tagihan', {
                params : { 
                    now : now,
                }
            })
            setDataInvoice(response.data.data.data);
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
        getDataInvoice()
    }, [now])
    return (
        <div className=' min-[1000px]:w-full max-[1000px]:w-[1000px] flex'>
            <ToastContainer position='top-center'/>
            <div className='w-full'>
                <TableHead value="Kode Pelanggan" style='rounded-l-[10px]'/>
                {dataInvoice && dataInvoice.map((item, i) => (
                    <TableBody value={item.pelanggan.kode_pelanggan} key={i} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Nama Pelanggan" />
                {dataInvoice && dataInvoice.map((item, i) => (
                    <TableBody value={item.pelanggan.name} key={i}/>
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Tanggal Tagihan" />
                {dataInvoice && dataInvoice.map((item, i) => (
                    <TableBody value={item.tanggal} key={i} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Paket" />
                {dataInvoice && dataInvoice.map((item, i) => (
                    <TableBody value={item.pelanggan.paket.harga + '/Bln'} key={i} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Action" style='rounded-r-[10px]'/>
                {dataInvoice && dataInvoice.map((item,i) => (
                    <TableBody type="action" key={i}>
                        <ButtonAction onClick={() => {confirmTagihan(item.id)}} style={'bg-green-200 text-green-700'}>
                            <CheckIcon sx={{
                                fontSize: '20px'
                            }} />
                        </ButtonAction>
                        <ButtonAction onClick={() => {window.location.href = `/invoice/${item.id}/print`}} style={'bg-(--bg-detail)'}>
                            <PrintIcon sx={{
                                color: '#5FC7FF',
                                fontSize: '20px'
                            }} />
                        </ButtonAction>
                    </TableBody>
                ))}

            </div>
        </div>
    )
}

export default Table