import { PERMISSIONS, PermissionStatus as RNPermissionsStatus, openSettings, request } from "react-native-permissions"
import type { PermissionStatus } from "../../infrastructure/interfaces/permissions";
import { Platform } from "react-native";


export const requestLocationPermissions = async(): Promise<PermissionStatus> => {


 let status: RNPermissionsStatus = "unavailable";

 if ( Platform.OS === 'ios' ) {
  status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
 } else if ( Platform.OS === 'android' ) {
  status = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
 } else {
  throw new Error('Unsupported platform');
 }

 if (status === 'blocked') {
  await openSettings();
  return await checkLocationPermissions();
 }

 const permissionMapper: Record<RNPermissionsStatus, PermissionStatus> = {
   granted: "granted",
   denied: "denied",
   blocked: "blocked",
   unavailable: "unavailable",
   limited: 'limited',
 };

 return permissionMapper[status] ?? 'unavailable';

}






export const checkLocationPermissions = async():Promise<PermissionStatus> => {

 let status: RNPermissionsStatus = 'unavailable';

 if ( Platform.OS === 'ios' ) {
  status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
 } else if ( Platform.OS === 'android' ) {
  status = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
 } else {
  throw new Error('Unsupported platform');
 }

 const permissionMapper: Record<RNPermissionsStatus, PermissionStatus> = {
  granted: "granted",
  denied: "denied",
  blocked: "blocked",
  unavailable: "unavailable",
  limited: 'limited',
};

 return permissionMapper[status] ?? 'unavailable';

}