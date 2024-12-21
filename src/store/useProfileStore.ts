// src/store/useProfileStore.ts
import { create } from "zustand";

interface ProfileState {
  profilePicture: string | null;
  setProfilePicture: (photo: string | null) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profilePicture: null,
  setProfilePicture: (photo) => set({ profilePicture: photo }),
}));

export default useProfileStore;
