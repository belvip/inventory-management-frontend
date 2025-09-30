export const UsersCacheKeys = {
  all: ['users'] as const,
  
  lists: () => [...UsersCacheKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => 
    [...UsersCacheKeys.lists(), filters] as const,
  
  details: () => [...UsersCacheKeys.all, 'detail'] as const,
  detail: (id: number | string) => 
    [...UsersCacheKeys.details(), id.toString()] as const,
  
  search: (query: string) => 
    [...UsersCacheKeys.all, 'search', query] as const,
  
  pagination: (page: number, limit: number) =>
    [...UsersCacheKeys.lists(), 'page', page, 'limit', limit] as const,
} as const;