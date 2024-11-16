import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import bcrypt from "bcrypt";
import { app, auth } from "./init";

const firestore = getFirestore(app);

export async function register(data: {
  email: string;
  password: string;
  username: string;
  role?: string;
}) {
  if (!data.email || !data.password || !data.username) {
    return { status: false, statusCode: 400, message: "Invalid input data" };
  }

  // Cek apakah email sudah ada
  const emailQuery = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const emailSnapshot = await getDocs(emailQuery);

  if (!emailSnapshot.empty) {
    return { status: false, statusCode: 400, message: "Email already exists" };
  }

  // Cek apakah username sudah ada
  const usernameQuery = query(
    collection(firestore, "users"),
    where("username", "==", data.username)
  );
  const usernameSnapshot = await getDocs(usernameQuery);

  if (!usernameSnapshot.empty) {
    return {
      status: false,
      statusCode: 400,
      message: "Username already exists",
    };
  }

  try {
    // Proses pendaftaran akun di Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      (data.password = await bcrypt.hash(data.password, 10))
    );
    await sendEmailVerification(userCredential.user);

    // Menyimpan data pengguna ke Firestore
    await addDoc(collection(firestore, "users"), {
      email: data.email,
      password: data.password,
      username: data.username,
      role: data.role || "user",
    });

    return {
      status: true,
      statusCode: 200,
      message:
        "Register success. Please check your email to verify your account",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Jika error adalah instance dari Error, kita bisa mengakses message
      return { status: false, statusCode: 400, message: error.message };
    }
    // Jika bukan instance dari Error, tampilkan pesan default
    return { status: false, statusCode: 400, message: "Register failed" };
  }
}
