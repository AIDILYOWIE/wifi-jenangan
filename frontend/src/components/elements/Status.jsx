const Status = ({ value }) => {
  const className =
    value !== "Lunas"
      ? "bg-(--bg-delete) text-(--color-delete)"
      : "bg-(--bg-status) text-(--color-status)";

  return (
    <div className={`max-w-full w-[150px] px-5 py-1.5 rounded-[50px] ${className}`}>
      {value === "Lunas" ? "Lunas" : "Belum Lunas"}
    </div>
  );
};

export default Status;
