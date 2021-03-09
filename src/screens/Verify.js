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
  Platform,
  DeviceEventEmitter,
  ActivityIndicator,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { Pic, Fonts, ScreenSize } from '../components/theme';
import SmsAndroid from 'react-native-get-sms-android';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { selectedCode } from '../redux/actions/Actions';

const Verify = (props) => {
  const address = useSelector((state) => state.root.number);
  const savedCode = useSelector((state) => state.root.code);
  const dispatch = useDispatch();

  const [minDate, setminDate] = useState('');
  const [maxDate, setmaxDate] = useState('');
  const [active, setActive] = useState(true);
  const [info, setInfo] = useState('');
  const [isloading, setLoading] = useState(false);
  const [act, setAct] = useState(true);
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    console.log('NUMBER', address, info);

    return console.log('UMOUNTED_VERIFY', info);
  }, []);

  setTimeout(() => readMsg(), 10000);
  setTimeout(() => info !== '' && props.navigation.navigate('BottomTab'), 3000);

  const readMsg = () => {
    var filter = {
      box: 'inbox',
      maxCount: 1,
    };
    if (minDate !== '') {
      filter.minDate = minDate;
    }
    if (maxDate !== '') {
      filter.maxDate = maxDate;
    }

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        console.log('INFO', arr[0].address);
        console.log('MSG', arr[0].body.substring(31, 36));
        if (arr[0].address == address) {
          setInfo(arr[0].body.substring(31, 36));
          setAct(false);
          dispatch(selectedCode(address, savedCode, savedCode));
        } else {
          setActive(false);
          setAct(false);
        }
      },
    );
  };

  const numberWarns = (val) => setInfo(val);

  const verify = () => {
    console.log('VERIFIED', savedCode, info);

    if (info == savedCode) {
      dispatch(selectedCode(address, savedCode, info));
      props.navigation.navigate('BottomTab');
    } else {
      alert('WRONG CODE!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ justifyContent: 'center', marginTop: '10%' }}>
          <View style={{ height: ScreenSize.hp35 }}>
            <Image
              resizeMode="contain"
              source={Pic.Logo}
              style={{ width: '100%', height: '100%' }}
            />
            {/* <View style={{}}>
              <Text style={styles.txt1}>Get Me</Text>
            </View> */}
          </View>
        </View>

        <View style={{ marginTop: 60 }}>
          <Text style={styles.txt2}>VERIFY CODE</Text>
          <View style={styles.inpView}>
            <KeyboardAwareScrollView>
              <TextInput
                style={styles.inp}
                placeholder="Code"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                value={info}
                onChangeText={(number) => numberWarns(number)}
              />
            </KeyboardAwareScrollView>
          </View>

          {act == true ? (
            <ActivityIndicator
              color={'#3498DB'}
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : (
            <View>
              {active == false ? (
                <View style={styles.touch1}>
                  <View style={{ marginTop: 15 }}>
                    <CountDown
                      until={timer}
                      size={20}
                      onFinish={() => props.navigation.navigate('Home')}
                      digitStyle={{ backgroundColor: '#D3D3D3' }}
                      digitTxtStyle={{ color: '#fff', fontSize: 25 }}
                      timeToShow={['M', 'S']}
                      timeLabels={{ m: 'Min', s: 'Sec' }}
                      timeLabelStyle={{ color: 'transparent' }}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => (info == '' ? null : verify())}
                    style={[styles.touch2, { width: '40%' }]}>
                    {isloading == true ? (
                      <ActivityIndicator color={'#fff'} size="large" />
                    ) : (
                      <Text
                        style={[styles.txt, { opacity: info == '' ? 0.5 : 1 }]}>
                        Verify Now
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.touch2}>
                  <Text style={styles.txt}>Verified!</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#fefefe',
    borderBottomWidth: StyleSheet.hairlineWidth,
    lineHeight: 30,
  },
  touch1: {
    alignItems: 'center',
    // borderColor: '#3498DB',
    // marginBottom: 20,
    width: '100%',
    // justifyContent: 'center',
    alignSelf: 'center',
  },
  touch2: {
    backgroundColor: '#3498DB',
    // backgroundColor: 'green',
    elevation: 15,
    marginTop: 20,
    height: 20,
    height: 60,
    width: '40%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txt: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  txt1: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: Fonts.Bold,
  },
  txt2: {
    color: '#3498DB',
    textAlign: 'center',
    fontFamily: Fonts.Bold,
  },
  inpView: {
    width: '20%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  inp: {
    flex: 1,
    backgroundColor: '#fefefe',
    marginLeft: 5,
    borderBottomWidth: 1,
    color: '#3498DB',
    fontSize: 16,
    letterSpacing: 4,
    borderBottomColor: '#3498DB',
  },
});

export default Verify;
