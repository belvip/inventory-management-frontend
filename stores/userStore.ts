import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface UserStore {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	setUser: (user: User) => void;
	setTokens: (accessToken: string, refreshToken: string) => void;
	clearUser: () => void;
	isAuthenticated: () => boolean;
}

export const useUserStore = create<UserStore>()(persist(
	(set, get) => ({
		user: null,
		accessToken: null,
		refreshToken: null,
		setUser: (user) => set({ user }),
		setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
		clearUser: () => set({ user: null, accessToken: null, refreshToken: null }),
		isAuthenticated: () => !!get().accessToken && !!get().user,
	}),
	{
		name: 'user-storage',
	}
));
