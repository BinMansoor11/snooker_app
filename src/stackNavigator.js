import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GetStarted, Login, SignUp, HomeScreen, Details } from './screens';

import { useSelector, useDispatch } from 'react-redux';

const Stack = createStackNavigator();

export default function MyStack(props) {
  // const state = useSelector((state) => state.root);
  // const {verifiedCode} = state;

  // useEffect(() => {
  //   console.log('STACK', verifiedCode);
  // }, [verifiedCode]);

  return (
    <Stack.Navigator headerMode="none" initialRouteName={'GetStarted'}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
