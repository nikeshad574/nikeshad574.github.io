import axios from "axios";

export default function handleAxiosError(
  err: unknown,
  defaultMsg: string = "Something went wrong!",
) {
  if (axios.isAxiosError(err) && err.response) {
    return err.response.data.message || err.message || defaultMsg;
  } else {
    return "Error:" + err;
  }
}

export function stripHTMLTags(html: string): string {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export function getDateTimeFormat(dateTime: string) {
  const date = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-CA", options);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const string = formattedDate + " " + formattedTime;

  return { date: formattedDate, time: formattedTime, string };
}
