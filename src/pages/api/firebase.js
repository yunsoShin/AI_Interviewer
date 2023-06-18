import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
    console.log(user);
  });
}

async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function getResume() {
  return get(ref(database, "Resumes")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}
export async function handleDelete(id) {
  return remove(ref(database, `Resumes/${id}`)).then(
    console.log("성공하였습니다")
  );
}

export async function uploadResume(resume, userId) {
  const id = uuid();
  return set(ref(database, `Resumes/${userId}`), {
    id,
    resume,
  });
}

export async function removeFromLike(userId, resumeId) {
  return remove(ref(database, `Likes/${userId}/${resumeId}`));
}

export async function getLike(userID) {
  return get(ref(database, `Likes/${userID}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function setLikes(likeText, userId) {
  // Remove unwanted characters
  const regaxlikeText = likeText.replace(/[.#$[\]\s]/g, "");

  return set(ref(database, `Likes/${userId}/${regaxlikeText}`), {
    likeText,
  });
}

export async function addOrUpdateToLike(userID, resume) {
  return set(ref(database, `Likes/${userID}/${resume.id}`), resume);
}
