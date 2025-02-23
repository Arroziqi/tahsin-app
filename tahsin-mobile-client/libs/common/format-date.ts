import { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";

interface FormatDateProps {
  date: DateType | undefined;
}

export const FormatDate = (date: DateType | undefined): string => {
  if (!date) return "";

  const jsDate = dayjs.isDayjs(date) ? date.toDate() : new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return jsDate instanceof Date && !isNaN(jsDate.getTime())
    ? jsDate.toLocaleDateString("en-US", options)
    : "";
};
