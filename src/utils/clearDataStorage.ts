import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA_KEY_BASE } from "../config/consts";

export async function clearDataStorage(userId: string) {
  await AsyncStorage.removeItem(`${DATA_KEY_BASE}_user:${userId}`);
}