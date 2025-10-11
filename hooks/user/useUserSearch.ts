
import { useUsers } from './useUsers';
import { useState } from 'react';

export const useUserSearch = () => {
  const { useSearchUsers } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchQuery = useSearchUsers(searchTerm);
  
  return {
    searchResults: searchQuery.data,
    isLoading: searchQuery.isLoading,
    searchTerm,
    setSearchTerm,
    executeSearch: setSearchTerm,
  };
};