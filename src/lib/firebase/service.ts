import { app, auth } from "./init";
import {
  query,
  collection,
  where,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Post, UserProfile } from "@/types/post";

const firestore = getFirestore(app);

export async function register(data: {
  email: string;
  password: string;
  username: string;
  bio?: string;
  photoURL?: string;
  role?: string;
}) {
  if (!data.email || !data.password || !data.username) {
    return { status: false, statusCode: 400, message: "Invalid input data" };
  }

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

  // Validasi apakah email atau username sudah digunakan
  const emailQuery = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const emailSnapshot = await getDocs(emailQuery);
  if (!emailSnapshot.empty) {
    return { status: false, statusCode: 400, message: "Email already exists" };
  }

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Kirim email verifikasi
    await sendEmailVerification(userCredential.user);

    // Simpan data pengguna ke Firestore dengan userId sebagai ID dokumen
    const userId = userCredential.user.uid;
    await setDoc(doc(firestore, "users", userId), {
      email: data.email,
      username: data.username,
      role: data.role || "user",
      bio: data.bio || "",
      createdAt: new Date(),

      userId, // Menyimpan userId untuk referensi
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
      // Gunakan username sebagai ID dokumen
      const usernameQuery = query(
        collection(firestore, "users"),
        where("username", "==", data.email)
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

    // Autentikasi menggunakan Firebase Authentication
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
        userId: userDoc.ref.id, // Ambil ID dokumen sebagai userId
        photoURL: userData.photoURL || "/images/default-profile.png",
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
        likes: data.likes,
        comments: data.comments,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
      };
    });
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw new Error("Failed to fetch posts.");
  }
}

export async function fetchBioByUserId(userId: string): Promise<string | null> {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return userData.bio || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching bio by userId:", error);
    throw error;
  }
}


export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  try {
    const userRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Validasi tipe data sebelum mengembalikannya
      if (
        data &&
        typeof data.username === "string" &&
        typeof data.profilePicture === "string" &&
        typeof data.profilePictureType === "string"
      ) {
        return {
          username: data.username,
          profilePicture: data.profilePicture,
          profilePictureType: data.profilePictureType,
          role: data.role || undefined,
          email: data.email || undefined,
        };
      }
    }
    return null; // Jika tidak ditemukan
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function getUserPosts(username: string) {
  try {
    const postsRef = collection(firestore, "posts");
    const q = query(postsRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}
