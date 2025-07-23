import { createContext, useContext, useState } from "react";

const DateRangeContext = createContext()

export const DateRangeProvider = ({children}) => {
    const [dateRange, setDateRange] = useState({
        start: null,
        end: null
    })

    return (
        <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
            {children}
        </DateRangeContext.Provider>
    )
}

export const useDateRange = () => useContext(DateRangeContext)