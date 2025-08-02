
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { AllData } from '@/lib/types';

// A single document in the 'data' collection will hold all our app's content.
const dataDocRef = doc(db, 'data', 'singleton');

/**
 * Fetches all application data from Firestore.
 * @returns {Promise<AllData | null>} A promise that resolves to the data object, or null if it doesn't exist.
 */
export const getData = async (): Promise<AllData | null> => {
  try {
    const docSnap = await getDoc(dataDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as AllData;
    } else {
      console.log("No such document! Initial data will be used.");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw new Error("Failed to fetch data from Firestore.");
  }
};

/**
 * Saves the entire application data object to Firestore.
 * @param {AllData} data The entire data object to save.
 * @returns {Promise<void>} A promise that resolves when the data is successfully written.
 */
export const saveData = async (data: AllData): Promise<void> => {
  try {
    await setDoc(dataDocRef, data);
  } catch (error) {
    console.error("Error writing document:", error);
    throw new Error("Failed to save data to Firestore.");
  }
};
