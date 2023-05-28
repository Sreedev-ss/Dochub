import {initializeApp,applicationDefault} from 'firebase-admin/app'
import admin, { credential } from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth';
import firebaseAccountCredentials from './serviceAccount.json'
import { ServiceAccount } from 'firebase-admin/app';

initializeApp({
  credential: credential.cert(<ServiceAccount>firebaseAccountCredentials)
});

const verifyFirebaseToken = async (idToken:string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // uid
    const { uid } = (await getAuth().verifyIdToken(idToken));

    // user data
    return await getAuth().getUser(uid);
  } catch (error) {
    throw error;
  }
};


export default verifyFirebaseToken