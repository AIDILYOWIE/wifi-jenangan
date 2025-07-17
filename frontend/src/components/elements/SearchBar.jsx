import { SearchOutlinedIcon } from "../../assets/RegisterAsset"
import React from 'react';

const SearchBar = React.memo((props) => {
    const {type, onChange, placeholder = "Search keyword", value} = props
  return (
    <div className="w-1/2 min-w-fit border-1 border-[var(--border-color)] rounded-[10px] flex items-center p-2.5 gap-2.5">
        <SearchOutlinedIcon/>
        <input type={type} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
})

export default SearchBar