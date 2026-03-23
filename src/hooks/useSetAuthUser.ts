import { useGetAuthUserQuery } from "@store/services/recipesApi";

export const useSetAuthUser = () => {
  const { data: user = null } = useGetAuthUserQuery();

  return { user };
};
