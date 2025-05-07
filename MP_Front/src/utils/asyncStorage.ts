import AsyncStorage from '@react-native-async-storage/async-storage';

const setAsyncStorage = async <T>(key: string, data: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const getAsyncStorage = async (key: string) => {
  const storedData = await AsyncStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
};

const removeAsyncStorage = async (key: string) => {
  const data = await getAsyncStorage(key);
  if (data) {
    await AsyncStorage.removeItem(key);
  }
};

export {setAsyncStorage, getAsyncStorage, removeAsyncStorage};
