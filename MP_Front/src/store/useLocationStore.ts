import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
  setSelectLocation: (location: LatLng | null) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set(state => ({...state, moveLocation}));
  },
  setSelectLocation: (selectLocation: LatLng | null) => {
    set(state => ({...state, selectLocation}));
  },
}));

export default useLocationStore;
