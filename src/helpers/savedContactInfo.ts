import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "SAVED_CONTACT_INFO";

export type SavedContactInfo = {
  fullName: string;
  phoneNumber: string;
  detailedAddress: string;
};

export const getSavedContactInfo = async (): Promise<SavedContactInfo | null> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedContactInfo;
  } catch {
    return null;
  }
};

export const saveContactInfo = (data: SavedContactInfo): Promise<void> =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const isSameContactInfo = (a: SavedContactInfo, b: SavedContactInfo): boolean =>
  a.fullName === b.fullName &&
  a.phoneNumber === b.phoneNumber &&
  a.detailedAddress === b.detailedAddress;
