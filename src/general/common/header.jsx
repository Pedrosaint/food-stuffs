import { useEffect, useState } from "react";

const Header = ({ title }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second with cleanup
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const { formattedDate, formattedTime } = (() => {
    const options = {
      date: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      time: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      },
    };

    return {
      formattedDate: currentTime.toLocaleDateString("en-US", options.date),
      formattedTime: currentTime.toLocaleTimeString("en-US", options.time),
    };
  })();

  return (
    <header className="mb-6">
      <div className="items-start sm:items-center gap-2 sm:gap-4 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-semibold text-gray-900 truncate">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-3 text-sm text-gray-600 min-w-fit">
          <time
            dateTime={currentTime.toISOString()}
            className="whitespace-nowrap"
            aria-label="Current date and time"
          >
            <span className="hidden sm:inline mr-2">{formattedDate}</span>
            <span>{formattedTime}</span>
          </time>
        </div>
      </div>
    </header>
  );
};

export default Header;