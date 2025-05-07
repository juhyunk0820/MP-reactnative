import {updateFavoritePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMuateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updateId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updateId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POST,
          queryKeys.FAVORITE,
          queryKeys.GET_FAVORITE_POSTS,
        ],
      });
    },
    ...mutationOptions,
  });
}

export default useMuateFavoritePost;
