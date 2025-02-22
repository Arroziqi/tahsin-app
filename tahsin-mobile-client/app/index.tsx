import { Redirect } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function HomeScreen() {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  return <Redirect href={"/(tabs)/home"} />;
}
