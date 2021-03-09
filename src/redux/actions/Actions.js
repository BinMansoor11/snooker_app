import {
  GET_RESTAURANT_DATA,
  GET_CODE,
  GET_LOCATION,
  UPDATE_LOCATION,
  GET_IMAGE,
  PROFILE_PIC,
  ADD_USER,
  USER,
} from './types';

import { PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// import { NavigationActions } from 'react-navigation';

// const accessPoint = 'http://3pikit.com/';

// const axios = require('axios');

export const userAuth = (user) => async (dispatch) => {
  console.log('USER', user);
  dispatch({
    type: USER,
    payload: user,
  });
};

export const selectedCode = (number, code, verifiedCode) => async (
  dispatch,
) => {
  console.log('SELECTED_ARRAY', number, code);
  dispatch({
    type: GET_CODE,
    number: number,
    code: code,
    verifiedCode: verifiedCode,
  });
};

export const savePic = (pic) => async (dispatch) => {
  console.log('PICTURE', pic);
  dispatch({
    type: GET_IMAGE,
    image: pic,
  });
};

export const addUser = (pic) => async (dispatch) => {
  console.log('PICTURE', pic);
  dispatch({
    type: ADD_USER,
    image: pic,
  });
};

export const saveProfilePic = (pic) => async (dispatch) => {
  console.log('PICTURE', pic);
  dispatch({
    type: PROFILE_PIC,
    image: pic,
  });
};

// export const updatedLocation = () => async (dispatch) => {
//   // console.log('UPDATED_LOCATION', interval),
//   // Geolocation.watchPosition(
//   //   (info) => (
//   //     console.log('LOCATION_INFO', info),
//   //     dispatch({
//   //       type: UPDATE_LOCATION,
//   //       payload: info.coords,
//   //     })
//   //   ),
//   //   (err) => console.log('gEO_ERROR', err),
//   //   { maximumAge: 0, enableHighAccuracy: false, distanceFilter: 0 },
//   // );
// };

// export const getLocation = () => async (dispatch) => {
//   console.log(Geolocation);

//   if (Platform.OS === 'android') {
//     try {
//       if (!(await checkPermissions())) {
//         await requestPermissions();
//       }
//       if (await checkPermissions()) {
//         console.log('PERMITTED');
//         Geolocation.watchPosition(
//           (info) => (
//             console.log('LOCATION_INFO', info),
//             dispatch({
//               type: GET_LOCATION,
//               payload: info.coords,
//             })
//           ),
//           (err) => console.log('gEO_ERROR', err),
//           { maximumAge: 0, enableHighAccuracy: false, distanceFilter: 0 },
//         );
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }
// };

// async function requestPermissions() {
//   let granted = {};
//   try {
//     console.log('requesting SMS permissions');
//     granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Features',
//         message:
//           'Location Features needs access to demonstrate Location Features',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     console.log(granted);
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use ACCESS_LOCATION features');
//     } else {
//       console.log('ACCESS_LOCATION permission denied');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function checkPermissions() {
//   console.log('checking LOCATION permissions');
//   let hasPermissions = false;
//   try {
//     hasPermissions = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//     if (!hasPermissions) return false;
//     hasPermissions = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//     if (!hasPermissions) return false;
//   } catch (e) {
//     console.error(e);
//   }
//   return hasPermissions;
// }

// export const error = () => async (dispatch) => {
//   dispatch({ type: ERROR });
// };

// export const isArabic = (state) => async (dispatch) => {
//   dispatch({ type: IS_ARABIC, payload: state });
// };

// export const getRestrauntBanner = (accessToken) => async (dispatch) => {
//   // dispatch({
//   //   type: GET_RESTAURANT_BANNER,
//   //   payload: { baner: "banner working" }
//   // });
//   console.log('bannerraccess', accessToken);
//   dispatch({ type: LOADING });
//   const res = await axios
//     .post(
//       accessPoint + 'api/v1/featured-banner',
//       {},
//       {
//         headers: {
//           Accept: 'application/json',
//           Authorization: 'Bearer ' + accessToken,
//         },
//       },
//     )
//     .then((res) => {
//       console.log('Response of getrestrauntbanner is : ', res.data);
//       if (res.data.status) {
//         dispatch({
//           type: GET_RESTAURANT_BANNER,
//           payload: res.data.data.banner,
//         });
//         dispatch({ type: LOADED });
//       } else {
//         dispatch({ type: ERROR });
//       }
//     })
//     .catch(function (error) {
//       console.log('banner', error);
//     });
// };

// export const uploadProfilePic = (accessToken, image) => async dispatch => {
//   console.log(accessToken, image);
//   const imageData = { uri: image, name: "profilePic", type: "image/jpg" };
//   const bodyFormData = new FormData();

//   bodyFormData.append("profile_pic", imageData);
//   const up = await axios

//     .post(accessPoint + "api/v1/edit-profile", bodyFormData, {
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + accessToken,
//         "Content-Type": "multipart/form-data"
//       }
//     })
//     .then(res => {
//       console.log(res);
//       // dispatch({
//       //   type: GET_RESTAURANT_DATA,
//       //   payload: res.data.data
//       // });
//       console.log("Navigating to Home");
//       dispatch(NavigationActions.navigate({ routeName: "Home" }));
//     })
//     .catch(function(error) {
//       console.log("Error is", error);
//     });

// };
