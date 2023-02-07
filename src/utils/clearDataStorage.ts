import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA_KEY } from "../config/consts";

export async function clearDataStorage() {
  await AsyncStorage.removeItem(DATA_KEY);
}