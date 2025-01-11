import { Database } from '@/types/supabase';

type UserRow = Database['public']['Tables']['users']['Row'];
type UserGroupRow = Database['public']['Tables']['user_groups']['Row'];

export const userGroupRowToUserGroup = (
  userGroupRow: UserGroupRow,
  userRows: UserRow[],
): UserGroup => {
  return {
    id: userGroupRow.id,
    name: userGroupRow.name,
    users: userRows.map(({ id, name }) => ({
      id,
      name,
    })),
  };
};
