
import { useUsers } from './useUsers';

export const useUsersAdmin = () => {
  // Temporairement désactiver les appels API pour tester
  return {
    users: [],
    roles: [],
    isLoading: false,
    isError: false,
    error: null,
    createUser: { mutate: () => {} },
    updateUser: { mutate: () => {} },
    updateRole: { mutate: () => {} },
    deleteUser: { mutate: () => {} },
    updateLockStatus: { mutate: () => {} },
    updateEnabledStatus: { mutate: () => {} },
    updateExpiryStatus: { mutate: () => {} },
    updateCredentialsExpiryStatus: { mutate: () => {} },
  };
};