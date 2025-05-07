import {getCalendarPost, ResponseCalendarPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

function useGetCalendarPost(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPost(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export default useGetCalendarPost;
