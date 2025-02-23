import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from "react-native-ui-datepicker";
import { Colors } from "@/constants/Colors";

interface CalenderProps {
  selected: DateType;
  setSelected: (calender: DateType) => void;
}

export function Calendar({ selected, setSelected }: CalenderProps) {
  const defaultStyles = getDefaultStyles();

  return (
    <DateTimePicker
      mode="single"
      date={selected}
      minDate={new Date()}
      onChange={({ date }) => setSelected(date)}
      styles={{
        ...defaultStyles,
        today_label: { color: Colors.primary.blue },
        selected: {
          backgroundColor: "#B3C2D2",
          borderRadius: "100%",
        },
        selected_label: { color: Colors.primary.blue },
      }}
    />
  );
}
