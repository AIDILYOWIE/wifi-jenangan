import { useState, useRef, useEffect, useContext } from "react";
import { useDataContext } from "../../../context/SendDataContext";

export const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formatDate, setFormatDate] = useState(null);
  const inputRef = useRef(null);
  const calendarRef = useRef(null);
  const { setData } = useDataContext();

  // Handle clicks outside the component to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const functFormatDate = (date) => {
    if (!date) return "";
    let dateFormat = date.toISOString().split("T")[0]
    setData((prev) => ({...prev, tanggal_masuk: date}))
    setFormatDate(dateFormat);
  };

  const handleInputClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    functFormatDate(date);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1
      )
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(date)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-100 ${
            isSelected
              ? "bg-(--primary-color) text-white hover:bg-blue-100"
              : isToday
              ? "bg-blue-100 text-(--primary-color)"
              : "text-text hover:text-primary"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      <div className="relative">
        {/* Input Container */}

        <div
          //   style={{ color: color.textColor }}
          className="flex flex-col gap-[7px]"
        >
          <label
            className={`text-(--text-color) transition-all duration-200 pointer-events-none top-3 text-[14px] font-normal`}
          >
            Tanggal Masuk
          </label>
          <input
            ref={inputRef}
            type="text"
            value={formatDate}
            onClick={handleInputClick}
            readOnly
            className={`w-full  focus:outline-none transition-all duration-200 cursor-pointer text-[12px]  border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-2 gap-1`}
            placeholder="Masukan Tanggal"
          />
        </div>

        {/* Calendar */}
        {isCalendarOpen && (
          <div
            ref={calendarRef}
            className="absolute top-full w-xs mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 animate-in fade-in duration-200"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-800">
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>
        )}
      </div>
    </div>
  );
};
