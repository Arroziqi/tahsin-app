import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar } from "@/components/Calender";
import { DateType } from "react-native-ui-datepicker";
import { FormatDate } from "@/libs/common/format-date";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export type ThemedDateInputProps = TextInputProps & {
  backgroundColor?: string;
  color?: string;
  name?: string;
};

const ThemedDateInput = ({
  backgroundColor = "#F0F5F5",
  color = "#000000",
  ...rest
}: ThemedDateInputProps) => {
  const [pickCalendar, setPickCalendar] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<DateType>();

  return (
    <>
      <View style={[styles.container, { backgroundColor }]}>
        <TextInput
          style={[styles.dateInput, { color, backgroundColor }]}
          value={FormatDate(selected)}
          {...rest}
        />
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => setPickCalendar(!pickCalendar)}
        >
          <Feather
            name="calendar"
            size={24}
            style={styles.icon}
            color={Colors.primary.five}
          />
        </TouchableWithoutFeedback>
      </View>
      {pickCalendar && (
        <Calendar selected={selected} setSelected={setSelected} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    borderRadius: 8,
  },
  dateInput: {
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
    flex: 1,
    fontSize: 15,
  },
  icon: {
    marginHorizontal: 7,
    marginEnd: 21,
  },
});

export default ThemedDateInput;
