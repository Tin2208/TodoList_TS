const TimeStamp = (): string => {
  const now = new Date();
  return (
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) +
    " - " +
    now.toLocaleDateString()
  );
};

export default TimeStamp;
