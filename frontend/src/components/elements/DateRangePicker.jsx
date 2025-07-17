import React, { useState, useRef, useEffect } from "react";

const DateRangePicker = React.memo(({ placeholder = "Masukan Tanggal" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const months = [
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

  const weekdays = ["Mng", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getDisplayText = () => {
    if (startDate && endDate) {
      console.log()
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    if (startDate) {
      return `${formatDate(startDate)} - Pilih Tanggal Terakhir`;
    }
    return placeholder;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isDateInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateInHoverRange = (date) => {
    if (!startDate || !hoverDate || endDate) return false;
    const start = startDate < hoverDate ? startDate : hoverDate;
    const end = startDate < hoverDate ? hoverDate : startDate;
    return date >= start && date <= end;
  };

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(startDate);
      } else {
        setEndDate(date);
      }
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
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
      const isSelected = isSameDay(date, startDate) || isSameDay(date, endDate);
      const isInRange = isDateInRange(date) || isDateInHoverRange(date);
      const isToday = isSameDay(date, new Date());

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
          className={`
            w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
            hover:bg-primary hover:text-background hover:scale-105 focus:outline-none 
            ${
              isSelected
                ? "bg-primary text-background shadow-lg"
                : isInRange
                ? "bg-blue-100 text-(--primary-color)"
                : isToday
                ? "bg-gray-100 text-primary font-bold"
                : "text-(--text-color) hover:text-blue-600"
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="relative inline-block w-full">
      <div className="w-full flex flex-col gap-[7px]">
        <label htmlFor="" className="text-(length:--size-text-2)">Tanggal Masuk</label>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="
        w-full flex justify-between items-center text-[12px] text-(--border-color) border-[1px] rounded-(--border-radius) border-(--border-color) px-2.5 py-1.5 gap-1
        "
        >
          <span
            className={
              "text-background text-background max-[850px]:text-[14px]"
            }
          >
            {getDisplayText()}
          </span>
          <svg
            className={`w-[14px] text-background h-[24px] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="
            absolute top-full -left-17 max-[576px]:-left-20 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl
            z-50 p-6 min-w-80 max-[576px]:min-w-65
             transition-all duration-200 animate-fadeIn
          "
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
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

            <h3 className="text-lg font-semibold text-text">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>

            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
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

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-text py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

          {/* Clear Button */}
          {(startDate || endDate) && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  if (onDateRangeChange) {
                    onDateRangeChange({ startDate: null, endDate: null });
                  }
                }}
                className="
                  w-full py-2 px-4 text-sm font-medium text-gray-700 
                  bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200
                "
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default DateRangePicker;
