import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import Indicator from "@/components/progress/Indicator";
import CardForm, { CardFormProps } from "@/components/card/CardForm";
import Gap from "@/components/Gap";
import RowView from "@/components/RowView";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { Colors } from "@/constants/Colors";

const RegistrationScreen = () => {
  const model: CardFormProps[] = [
    {
      title: "Data Diri",
      inputs: [
        {
          label: "Nama Lengkap*",
          placeholder: "Masukan nama lengkap Anda",
        },
        {
          label: "Tanggal Lahir*",
          inputType: "date",
        },
        {
          label: "Nomor Telepon",
          placeholder: "+62",
        },
        {
          label: "Email",
          textContentType: "emailAddress",
          placeholder: "email@mail.com",
        },
      ],
    },
    {
      title: "Informasi Akademik",
      inputs: [
        {
          label: "Pendidikan Terakhir*",
          inputType: "select",
        },
        {
          label: "Program Pilihan*",
          inputType: "select",
        },
      ],
    },
    {
      title: "Preferensi Belajar",
      inputs: [
        {
          label: "Jenis Kelas*",
        },
        {
          label: "Waktu Belajar*",
        },
        {
          label: "Tujuan Belajar*",
          placeholder: "Apa yang Anda ingin capai dari program ini",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <Indicator title="Pendaftaran Kelas" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {model.map((item, index) => (
            <CardForm key={index} title={item.title} inputs={item.inputs} />
          ))}
        </View>
        <RowView justifyContent={"space-between"} style={styles.buttonGroup}>
          <SecondaryButton
            text={"Sebelumnya"}
            style={styles.button}
            backgroundColor={Colors.primary.six}
          />
          <SecondaryButton
            text={"Selanjutnya"}
            style={styles.button}
            backgroundColor={Colors.primary.six}
          />
        </RowView>
        <Gap height={180} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 35,
  },
  container: {
    paddingVertical: 10,
    gap: 35,
  },
  buttonGroup: {
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 27,
    paddingVertical: 10,
  },
});

export default RegistrationScreen;
