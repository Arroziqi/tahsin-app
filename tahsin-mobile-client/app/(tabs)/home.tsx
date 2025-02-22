import SecondaryButton from '@/components/buttons/SecondaryButton';
import Card, { CardProps } from '@/components/card/Card';
import Gap from '@/components/Gap';
import Header from '@/components/header/Header';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const HomeScreen = () => {
  const model: CardProps[] = [
    {
      title: "Pembelajaran Terstruktur",
      subTitle:
        "Kelas tahsin dengan level yang sesuai kemampuan, materi pembelajaran sistematis, dan evaluasi berkala",
    },
    {
      title: "Pengajar Profesional",
      subTitle:
        "Dibimbing oleh guru tahsin berpengalaman dan tersertifikasi dengan monitoring perkembangan personal",
    },
    {
      title: "Sistem Pembelajaran Modern",
      subTitle:
        "Jadwal fleksibel dengan laporan pembelajaran harian dan akses materi kapan saja",
    },
    {
      title: "Kemudahan Bergabung",
      subTitle:
        "Pendaftaran online mudah dengan penempatan kelas sesuai level dan pembayaran yang praktis",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.content}>
          <Card
            title="Mulai Perjalanan Belajar Al-Quran Anda!"
            subTitle="Mulai perjalanan belajar Al-Quran Anda bersama pengajar berpengalaman di Tahsin App. Tingkatkan kualitas bacaan dengan metode yang sistematis dan menyenangkan."
            backgroundColor={Colors.primary.six}
            titleStyle={styles.title}
            subTitleStyle={styles.subTitle}
            style={{ marginBottom: 15 }}
          />
          {model.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              subTitle={item.subTitle}
              backgroundColor={Colors.primary.three}
              style={{ borderRadius: 12, marginVertical: 10 }}
            />
          ))}
          <SecondaryButton onPress={()=> router.push("/(auth)/sign-up")} text={"Apply"} style={styles.buttonApply} />
        </View>
        <Gap height={20} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    justifyContent: "space-around",
  },
  title: {
    color: Colors.primary.four,
    textAlign: "center",
  },
  subTitle: {
    color: "white",
    textAlign: "justify",
  },
  buttonApply: {
    alignSelf: "flex-end",
    paddingVertical: 7,
    paddingHorizontal: 27,
  },
});

export default HomeScreen;
