import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";

export const authStore = writable({
  user: null,
  records: [],
  loading: true,
})

export const authHandlers = {
  signUp: async (email, pass) => {
    await createUserWithEmailAndPassword(auth, email, pass)
  },
  logIn: async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass)
  },
  logOut: async () => {
    await signOut(auth)
  }
}