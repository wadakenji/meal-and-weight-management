import { createSupabaseServerClient } from '@/libs/supabase/createClient';
import { UsecaseAuthError, UsecaseDbError } from '@/usecase/shared/error';
import { userGroupRowToUserGroup } from '@/libs/supabase/interface/user-group';

export const getBelongingUserGroups = async (
  userId?: string,
): Promise<UserGroup[]> => {
  const supabaseClient = await createSupabaseServerClient();

  if (userId === undefined) {
    const res = await supabaseClient.auth.getUser();
    if (res.error) {
      console.error(res.error);
      throw new UsecaseAuthError({
        module: 'user-group',
        function: 'getBelongingUserGroups',
      });
    }
    userId = res.data.user.id;
  }

  const res = await supabaseClient
    .from('user_groups')
    .select(
      `
    *, 
    user_group_belongings_1:user_group_belongings(
      *
    ),
    user_group_belongings_2:user_group_belongings(
      *,
      users(
        *
      )
    )`,
    )
    .eq('user_group_belongings_1.user_id', userId);

  if (res.error) {
    console.error(res.error);
    throw new UsecaseDbError({
      module: 'user-group',
      function: 'getBelongingUserGroups',
    });
  }

  return res.data.map((row) =>
    userGroupRowToUserGroup(
      row,
      row.user_group_belongings_2.map((ugb) => ugb.users),
    ),
  );
};

export const getRelatedUsers = async () => {
  const belongingUserGroups = await getBelongingUserGroups();
  return (
    belongingUserGroups
      .flatMap((userGroup) => userGroup.users)
      // 重複削除
      .reduce<UserGroup['users']>((acc, cur) => {
        if (acc.find(({ id }) => id === cur.id)) return acc;
        acc.push(cur);
        return acc;
      }, [])
  );
};
