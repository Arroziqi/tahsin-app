import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import Indicator from "@/components/progress/Indicator";

const RegistrationScreen = () => {
  return (
    <SafeAreaView>
      <Indicator title="Pendaftaran Kelas" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: {},
});

export default RegistrationScreen;
