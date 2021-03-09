import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';

import GlobalHeader from '../../components/GlobalHeader';
import {
  Pic,
  ScreenSize,
  FontSize,
  FontColor,
  Fonts,
} from '../../components/theme';
import * as Icons from '../../components/icons';
import { useSelector, useDispatch } from 'react-redux';
import { savePic } from '../../redux/actions/Actions';
// import ImagePicker from 'react-native-image-picker';
import { Avatar, Accessory } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
const AnimatedTouchable = Animatable.createAnimatableComponent(
  TouchableOpacity,
);

const GetStarted = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.root);
  const { image } = state;

  const [pic, setPic] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={FontColor.primary} />
      <ScrollView>
        <View style={styles.avatarView}>
          <Image
            source={Pic.GetStart}
            style={{ width: '100%', height: '100%' }}
            resizeMode="stretch"
          />
        </View>
      </ScrollView>
      <Animatable.View animation="bounceIn" duration={1000} style={styles.btn}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={styles.viewTouch}>
          <Text style={styles.txt}>Log In</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View animation="bounceIn" duration={1000} style={styles.btn1}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignUp')}
          style={styles.viewTouch}>
          <Text style={styles.txt}>Sign Up</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  avatarView: {
    height: ScreenSize.hp4,
    marginTop: '10%',
  },
  iconAccess: {
    height: 40,
    width: 40,
    borderRadius: 360,
    backgroundColor: 'orange',
  },
  btnView: {
    height: ScreenSize.hp2,
    width: '90%',
    alignSelf: 'center',

    alignItems: 'center',
    backgroundColor: 'green',
  },
  btnRow: {
    height: '40%',
    width: '100%',
    backgroundColor: 'red',
    marginTop: '2%',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  btn: {
    height: ScreenSize.hp07,
    width: '80%',
    marginVertical: '1.5%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    elevation: 3,
    backgroundColor: FontColor.primary,
    position: 'absolute',
    bottom: '15%',
  },
  btn1: {
    height: ScreenSize.hp07,
    width: '80%',
    marginVertical: '1.5%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    elevation: 3,
    backgroundColor: FontColor.primary,
    position: 'absolute',
    bottom: '5%',
  },
  heading: {
    fontSize: FontSize.font3,
    textAlign: 'center',
    fontFamily: Fonts.Regular,
    color: FontColor.green,
    paddingVertical: '4%',
    backgroundColor: '#fff',
  },
  txt: {
    color: 'white',
    fontSize: FontSize.font22,
    // fontWeight: 'bold',
    fontFamily: Fonts.Bold,
  },
  viewTouch: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GetStarted;
