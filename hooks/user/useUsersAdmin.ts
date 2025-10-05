
import { useUsers } from './useUsers';

export const useUsersAdmin = () => {
  const {
    getAllUsers,
    createUser,
    updateUser,
    updateRole,
    deleteUser,
    updateLockStatus,
    updateEnabledStatus,
    updateExpiryStatus,
    updateCredentialsExpiryStatus,
    getRoles
  } = useUsers();
  
  return {
    users: getAllUsers.data,
    roles: getRoles.data,
    isLoading: getAllUsers.isLoading,
    isError: getAllUsers.isError,
    error: getAllUsers.error,
    createUser,
    updateUser,
    updateRole,
    deleteUser,
    updateLockStatus,
    updateEnabledStatus,
    updateExpiryStatus,
    updateCredentialsExpiryStatus,
  };
};