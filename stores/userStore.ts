// stores/userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/user';

interface UserStore {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	setUser: (user: User) => void;
	setTokens: (accessToken: string, refreshToken: string) => void;
	clearUser: () => void;
	isAuthenticated: boolean; // 🔥 CHANGEMENT : Supprimer la fonction
}

const customSessionStorage = {
	getItem: (name: string): string | null => {
		if (typeof window === 'undefined') return null;
		return window.sessionStorage.getItem(name);
	},
	setItem: (name: string, value: string): void => {
		if (typeof window === 'undefined') return;
		window.sessionStorage.setItem(name, value);
	},
	removeItem: (name: string): void => {
		if (typeof window === 'undefined') return;
		window.sessionStorage.removeItem(name);
	},
};

export const useUserStore = create<UserStore>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false, // 🔥 CHANGEMENT : Variable simple
			
			setUser: (user) => {
				const normalizedUser = {
					...user,
					roles: Array.isArray(user.roles) ? user.roles : [user.roles || 'ROLE_USER']
				};
				set({ 
					user: normalizedUser,
					isAuthenticated: true // 🔥 Mettre à jour l'état
				});
			},
			
			setTokens: (accessToken, refreshToken) => set({ 
				accessToken, 
				refreshToken,
				isAuthenticated: true // 🔥 Mettre à jour l'état
			}),
			
			clearUser: () => set({ 
				user: null, 
				accessToken: null, 
				refreshToken: null,
				isAuthenticated: false // 🔥 Réinitialiser l'état
			}),
		}),
		{
			name: 'user-session',
			storage: createJSONStorage(() => customSessionStorage),
		}
	)
);