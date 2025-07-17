// import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { DeleteIcon, SearchIcon, EditIcon } from '../../../../assets/RegisterAsset';
import { ButtonAction } from '../../../../components/elements/Button';
import { TableBody, TableHead } from '../../../../components/elements/TableStructure';
import { api } from '../../../../utils/helper/helper';

const Table = () => {

    const [dataPelanggan, setDataPelanggan] = useState([])

    const getDataPelanggan = async () => {
        try {
        const response = await api.get('/pelanggan')
        setDataPelanggan(response.data.data.data);
        console.log(response.data.data.data);

        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getDataPelanggan()
    }, [])
    return (
        <div className=' min-[1000px]:w-full max-[1000px]:w-[1000px] flex'>
            <div className='w-full'>
                <TableHead value="Tanggal Masuk" style='rounded-l-[10px]'/>
                {dataPelanggan && dataPelanggan.map((item, i) => (
                    <TableBody value={item.tanggal_pemasangan} key={i} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Nama Pelanggan" />
                {dataPelanggan && dataPelanggan.map((item, i) => (
                    <TableBody value={item.name} key={i}/>
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Kecamatan" />
                {dataPelanggan && dataPelanggan.map((item, i) => (
                    <TableBody value={item.kecamatan} key={i} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Action" style='rounded-r-[10px]'/>
                {dataPelanggan && dataPelanggan.map((_,i) => (
                    <TableBody type="action" key={i}>
                        <ButtonAction style={'bg-(--bg-edit)'}>
                            <EditIcon sx={{
                                color: '#FFDC00',
                                fontSize: '20px'
                            }} />
                        </ButtonAction>
                        <ButtonAction style={'bg-(--bg-delete)'}>
                            <DeleteIcon sx={{
                                color: '#FF0004',
                                fontSize: '20px'
                            }} />
                        </ButtonAction>
                        <ButtonAction style={'bg-(--bg-detail)'}>
                            <SearchIcon sx={{
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