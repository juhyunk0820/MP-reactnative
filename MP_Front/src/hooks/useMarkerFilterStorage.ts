import {Marker} from '@/types';
import {getAsyncStorage, setAsyncStorage} from '@/utils';
import {useEffect, useState} from 'react';
import useMarkerFilterStore from '@/store/useMarkerFilterStore';
import {storageKeys} from '@/constants';

const initialFilters = {
  RED: true,
  YELLOW: true,
  GREEN: true,
  BLUE: true,
  PURPLE: true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
};

function useMarkerFilter() {
  const {filterItems, setFilterItems} = useMarkerFilterStore();

  const set = async (items: Record<string, boolean>) => {
    await setAsyncStorage(storageKeys.MARKER_FILTER, items);
    setFilterItems(items);
  };

  const transformFilterMarker = (markers: Marker[]) => {
    return markers.filter(marker => {
      return (
        filterItems[marker.color] === true &&
        filterItems[String(marker.score)] === true
      );
    });
  };

  useEffect(() => {
    (async () => {
      const storedData =
        (await getAsyncStorage(storageKeys.MARKER_FILTER)) ?? initialFilters;
      setFilterItems(storedData);
    })();
  }, []);

  return {set, filterItems, transformFilterMarker};
}

export default useMarkerFilter;
