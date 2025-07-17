import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { DeleteIcon, SearchIcon, EditIcon } from '../../assets/RegisterAsset';
import { ButtonAction } from '../elements/Button';
import { TableBody, TableHead } from '../elements/TableStructure';


// const Table = () => {
//     const rows = [
//         { id: 1, tanggalMasuk: '13 - 10 - 2025', namaPelanggan: 'Aidil Yowie', kecamatan: 'Sukorejo', action: <ButtonAction><EditIcon /></ButtonAction> },
//         { id: 2, tanggalMasuk: '13 - 10 - 2025', namaPelanggan: 'Aidil Yowie', kecamatan: 'Sukorejo', action: <ButtonAction><EditIcon /></ButtonAction> },
//         { id: 3, tanggalMasuk: '13 - 10 - 2025', namaPelanggan: 'Aidil Yowie', kecamatan: 'Sukorejo', action: <ButtonAction><EditIcon /></ButtonAction> },
//     ]

//     const columns = [
//         { field: 'tanggalMasuk', headerName: 'Tanggal Masuk', flex: 1, resizable: false, sortable: false, headerAlign: 'center', headerClassName: 'header-ujung-kiri' },
//         { field: 'namaPelanggan', headerName: 'Nama Pelanggan', flex: 1, resizable: false, sortable: false, headerAlign: 'center' },
//         { field: 'kecamatan', headerName: 'kecamatan', flex: 1, resizable: false, sortable: false, headerAlign: 'center' },
//         {
//             field: 'action', headerName: 'Action', flex: 1, resizable: false, sortable: false, headerAlign: 'center', headerClassName: 'header-ujung-kanan', renderCell: (params) => {
//                 // `params.row` berisi data lengkap baris saat ini
//                 // `params.id` adalah ID baris
//                 // `params.value` adalah nilai dari field 'action' (jika ada)

//                 return (
//                     <>
//                         <ButtonAction style={'bg-(--bg-edit)'}>
//                             <EditIcon sx={{
//                                 color: '#FFDC00',
//                                 fontSize: '20px'
//                             }} />
//                         </ButtonAction>
//                         <ButtonAction style={'bg-(--bg-delete)'}>
//                             <DeleteIcon sx={{
//                                 color: '#FF0004',
//                                 fontSize: '20px'
//                             }} />
//                         </ButtonAction>
//                         <ButtonAction style={'bg-(--bg-detail)'}>
//                             <SearchIcon sx={{
//                                 color: '#5FC7FF',
//                                 fontSize: '20px'
//                             }} />
//                         </ButtonAction>
//                     </>

//                 );
//             },
//         },
//     ]

//     return (
//         <div className='w-full'>
//             <DataGrid
//                 sx={{
//                     ' .MuiDataGrid-columnSeparator--sideRight': {
//                         display: 'none',
//                     },
//                     '.MuiDataGrid-columnHeaders': {
//                         backgroundColor: 'transparent',
//                     },
//                     [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
//                         outline: 'none',
//                     },
//                     [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
//                     {
//                         outline: 'none',
//                     },
//                     [`& .${gridClasses.columnHeader}`]:
//                     {
//                         backgroundColor: '#F3F3F3',
//                         width: '100%',
//                         borderBottom: 'none',
//                         height: 'max-content',
//                         padding: '10px 20px',
//                         fontSize: '14px',
//                         fontWeight: 'semibold',
//                         color: '#A3A3A3'
//                     },
//                     [`& .${gridClasses.columnHeader}.header-ujung-kiri`]:
//                     {
//                         borderTopLeftRadius: '10px',
//                         borderBottomLeftRadius: '10px',
//                     },
//                     [`& .${gridClasses.columnHeader}.header-ujung-kanan`]:
//                     {
//                         borderTopRightRadius: '10px',
//                         borderBottomRightRadius: '10px',
//                     },
//                     [` & .${gridClasses.cell}`]:
//                     {
//                         textAlign: 'center',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         gap: '5px',
//                     },
//                     border: 'none',
//                     background: 'transparent'
//                 }}
//                 rows={rows} columns={columns} hideFooter disableColumnMenu disableRowSelectionOnClick />
//         </div>
//     )
// }

export const dataPelanggan = [
    { index: 1, namaPelanggan: "Andi Setiawan", kecamatan: "Jenangan", desa: "Karadenan", dusunJalan: "Jalan Kenanga No. 12", status: "LUNAS", tanggal: "April 5, 2025" },
    { index: 2, namaPelanggan: "Siti Aminah", kecamatan: "Jenangan", desa: "Tajur", dusunJalan: "Gang Melati RT 03", status: "BELUM LUNAS", tanggal: "June 12, 2025" },
];

const Table = () => {
    return (
        <div className=' min-[1000px]:w-full max-[1000px]:w-[1000px] flex'>
            <div className='w-full'>
                <TableHead value="Tanggal Masuk" style='rounded-l-[10px]'/>
                {dataPelanggan && dataPelanggan.map((item) => (
                    <TableBody value={item.tanggal} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Nama Pelanggan" />
                {dataPelanggan && dataPelanggan.map((item) => (
                    <TableBody value={item.namaPelanggan} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Kecamatan" />
                {dataPelanggan && dataPelanggan.map((item) => (
                    <TableBody value={item.kecamatan} />
                ))}
            </div>
            <div className='w-full'>
                <TableHead value="Action" style='rounded-r-[10px]'/>
                {dataPelanggan && dataPelanggan.map(() => (
                    <TableBody type="action">
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