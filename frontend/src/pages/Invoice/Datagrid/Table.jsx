// import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { TableBody, TableHead } from '../../../components/elements/TableStructure';
import { ButtonAction } from '../../../components/elements/Button';
import { api } from '../../../utils/helper/helper';
import { DeleteIcon, EditIcon, PrintIcon, SearchIcon } from '../../../assets/RegisterAsset';


const Table = () => {

    const [dataInvoice, setDataInvoice] = useState([])

    const getDataInvoice = async () => {
        try {
        const response = await api.get('/tagihan')
        setDataInvoice(response.data.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getDataInvoice()
    }, [])
    return (
        <div className=' min-[1000px]:w-full max-[1000px]:w-[1000px] flex'>
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
                {dataInvoice && dataInvoice.map((_,i) => (
                    <TableBody type="action" key={i}>
                        <ButtonAction style={'bg-(--bg-detail)'}>
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