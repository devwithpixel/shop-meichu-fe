export function getGreeting() {
  const now = new Date();
  const hours = now.getHours();

  let greeting = "Good Evening";
  if (hours >= 5 && hours < 12) greeting = "Good Morning";
  else if (hours >= 12 && hours < 18) greeting = "Good Afternoon";

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[now.getDay()];
  const dayMessage = `Have a nice ${dayName}`;

  return { greeting, dayMessage };
}

export function getCurrentDateTime() {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(now);

  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  const year = parts.find((p) => p.type === "year")?.value;
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;

  const formattedDate = `${month} ${day}, ${year}`;
  const formattedTime = `${hour}:${minute}`;

  return { formattedDate, formattedTime };
}
