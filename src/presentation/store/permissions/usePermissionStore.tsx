import {create} from 'zustand';
import type {PermissionStatus} from '../../../infrastructure/interfaces/permissions';
import {
  checkLocationPermissions,
  requestLocationPermissions,
} from '../../../actions/permissions/location';

interface PermissionsState {
  locationStatus: PermissionStatus;

  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionsState>()(set => ({
  locationStatus: 'undetermined',

  requestLocationPermission: async () => {
    const status = await requestLocationPermissions();
    set({locationStatus: status});

    return status;
  },

  checkLocationPermission: async () => {
    const status = await checkLocationPermissions();
    set({locationStatus: status});
    return status;
  },
}));
