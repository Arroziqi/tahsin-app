import * as SecureStore from "expo-secure-store";

export class SecureStoreService {
  async saveItem(key: string, value: any): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  async deleteItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}
