import { db } from '../firebase';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

const colRef = collection(db, 'members');

// const getList = async (gymIds) => {
//   const colQuery = query(colRef, where('gymId', 'in', gymIds));
//   const snap = await getDocs(colQuery);
//   return snap.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// };

const create = async (data) => {
  try {
    const docRef = await addDoc(collection(db, `Events/${data.EventId}/Members`), data);
    return docRef;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};
export const fetchEventData = async ( memberId, phoneNumber) => {
  try {
    const q = query(collection(db, `Events/VS7ExY0IJjovzEdc48g1/Members`), where("MobileNumber", "==", phoneNumber) );
    const querySnapshot = await getDocs(q);
    const eventData = [];
    querySnapshot.forEach((doc) => {
      eventData.push({ id: doc.id, ...doc.data() });
    });
    return eventData;
  } catch (error) {
    console.error('Error fetching event data:', error);
    throw error;
  }
};
export const saveTicket = async (data, number) => {
  try {
    const docRef = await addDoc(collection(db, `Ticekts/${number}/MyPasses`), data);
    return docRef;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const checkForTicket = async (MobileNumber) => {
  try {
    // Query the Firestore collection to check if any documents exist with the given mobile number
    const ticketsRef = collection(db, `Events/VS7ExY0IJjovzEdc48g1/Members`);
    const q = query(ticketsRef, where('MobileNumber', '==', MobileNumber));
    const querySnapshot = await getDocs(q);

    // Check if any documents exist with the given mobile number
    if (!querySnapshot.empty) {
      // If documents exist, return the first document ID
      const docId = querySnapshot.docs[0].id;
      return docId;
    } else {
      // If no documents exist, return null
      return null;
    }
  } catch (error) {
    console.error('Error checking for ticket:', error);
    throw error;
  }
};




export { create };