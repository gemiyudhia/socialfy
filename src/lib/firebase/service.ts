import { app, auth } from "./init";
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
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Post } from "@/types/post";

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

  // Validasi input (email format dan panjang password)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { status: false, statusCode: 400, message: "Invalid email format" };
  }
  if (data.password.length < 8) {
    return {
      status: false,
      statusCode: 400,
      message: "Password must be at least 8 characters",
    };
  }

  // Cek apakah email sudah ada di Firestore
  const emailQuery = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const emailSnapshot = await getDocs(emailQuery);

  if (!emailSnapshot.empty) {
    return { status: false, statusCode: 400, message: "Email already exists" };
  }

  // Cek apakah username sudah ada di Firestore
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
      data.password
    );

    // Kirim email verifikasi
    await sendEmailVerification(userCredential.user);

    // Simpan data pengguna ke Firestore
    await addDoc(collection(firestore, "users"), {
      email: data.email,
      username: data.username,
      role: data.role || "user",
      createdAt: new Date(),
    });

    return {
      status: true,
      statusCode: 200,
      message:
        "Register success. Please check your email to verify your account.",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: false, statusCode: 400, message: error.message };
    }
    return { status: false, statusCode: 400, message: "Register failed" };
  }
}

export async function login(data: { email: string; password: string }) {
  try {
    // Periksa apakah input adalah email atau username
    const isEmail = data.email.includes("@");
    let userDoc;

    if (isEmail) {
      // Cari pengguna berdasarkan email
      const emailQuery = query(
        collection(firestore, "users"),
        where("email", "==", data.email)
      );
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        userDoc = emailSnapshot.docs[0];
      }
    } else {
      // Cari pengguna berdasarkan username
      const usernameQuery = query(
        collection(firestore, "users"),
        where("username", "==", data.email) // 'email' di sini berisi username
      );
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        userDoc = usernameSnapshot.docs[0];
      }
    }

    // Jika pengguna tidak ditemukan
    if (!userDoc) {
      return { status: false, error: "User not found in database" };
    }

    const userData = userDoc.data();

    // Gunakan Firebase Authentication untuk autentikasi berdasarkan email
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      data.password
    );
    const user = userCredential.user;

    // Periksa apakah email sudah diverifikasi
    if (!user.emailVerified) {
      return { status: false, error: "Email not verified" };
    }

    // Kembalikan data pengguna
    return {
      status: true,
      user: {
        email: user.email,
        username: userData.username,
        role: userData.role,
        createdAt: userData.createdAt,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { status: false, error: "Invalid credentials" };
  }
}

export async function fetchPostByUser(username: string): Promise<Post[]> {
  try {
    const postsRef = collection(firestore, "posts");
    const q = query(postsRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        username: data.username,
        caption: data.caption,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
      };
    });
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw new Error("Failed to fetch posts.");
  }
}
