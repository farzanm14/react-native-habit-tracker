import AsyncStorage from "@react-native-async-storage/async-storage";

const storageService = {
  async saveItem<T>(key: string, item: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error("AsyncStorage Save Error:", error);
      return false;
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error("AsyncStorage Get Error:", error);
      return null;
    }
  },

  async clearItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("AsyncStorage Remove Error:", error);
      return false;
    }
  },

  async clearAll(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error("AsyncStorage Clear All Error:", error);
      return false;
    }
  },
};

export default storageService;
