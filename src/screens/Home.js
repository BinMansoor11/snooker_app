import React, {useState, useEffect} from 'react';
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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {Pic, Fonts, ScreenSize} from '../components/theme';
import SmsAndroid from 'react-native-get-sms-android';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import {selectedCode, getLocation} from '../redux/actions/Actions';
import {useIsFocused} from '@react-navigation/native';

const Home = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const globalState = useSelector((state) => state.root);

  const {location} = globalState;

  const [phone, setPhoneNumber] = useState('');
  const [number, setnumber] = useState('');
  const [number_code, setnumber_code] = useState('');
  const [active, setActive] = useState(true);
  const [smscode, setSmsCode] = useState(
    Math.random().toString().substring(2, 6),
  );
  const [isloading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Keyboard.addListener('keyboardDidHide', keyboardHidden());
    console.log('STATUS', status);
    dispatch(getLocation());
    location.length !== 0 && getCountry();

    // console.log('PROPS', Keyboard);
    DeviceEventEmitter.addListener('sms_onDelivery', (msg) => {
      console.log('DELIVERED', msg, props);
      setStatus(msg);
      setLoading(false);
      // props.navigation.navigate('Verify');
      // return () => {
      //   Keyboard.removeListener('keyboardDidHide', console.log('HIDDEN'));
      // };
    });
  }, [isFocused, status, location]);

  const keyboardHidden = () => {
    console.log('HIDDEN');
    setPhoneNumber(number_code + number);
  };

  setTimeout(
    () => status == 'SMS sent' && props.navigation.navigate('Verify'),
    3000,
  );

  const getCountry = async () => {
    try {
      console.log('HOME', location);

      const lat = location.latitude;
      const long = location.longitude;

      console.log('LAT_LONG', lat, long);

      const countries = await fetch(
        `http://vbswebs.com/GetMe/API/getcountrycode.php?x=${lat}&y=${long}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            x: lat,
            y: long,
          }),
        },
      );
      const data = await countries.json();

      if (status == '') {
        return (
          setnumber_code('+' + data.CountryCode), console.log('COUNTRIES', data)
        );
      }
    } catch (error) {
      console.log('ERROR_GETTING_COUNTRY', error);
    }
  };

  const sent = async () => {
    DeviceEventEmitter.addListener('sms_onDelivery', (msg) => {
      console.log('DELIVERED', msg, props);
      setStatus(status);
      setTimeout(
        () => msg == 'sent successfully' && props.navigation.navigate('Verify'),
        50000,
      );
    });
  };

  setTimeout(
    () => status == 'sent successfully' && props.navigation.navigate('Verify'),
    50000,
  );

  async function checkPer() {
    setLoading(true);
    if (Platform.OS === 'android') {
      try {
        if (!(await checkPermissions())) {
          await requestPermissions();
        }
        if (await checkPermissions()) {
          sendMsg(props);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function requestPermissions() {
    let granted = {};
    try {
      console.log('requesting SMS permissions');
      granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
        ],
        {
          title: 'Example App SMS Features',
          message: 'Example SMS App needs access to demonstrate SMS features',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use SMS features');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async function checkPermissions() {
    console.log('checking SMS permissions');
    let hasPermissions = false;
    try {
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      if (!hasPermissions) return false;
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      );
      if (!hasPermissions) return false;
    } catch (e) {
      console.error(e);
    }
    return hasPermissions;
  }

  const sendMsg = () => {
    const phoneNumber = {
      addressList: [phone],
    };
    const msg = `GetMe SMS verification code is: ${smscode}`;

    const myJson = JSON.stringify(phoneNumber);
    console.log('PHONENUMBER', myJson);
    SmsAndroid.autoSend(
      myJson,
      msg,
      (fail) => {
        console.log('Failed with this error: ' + fail);
        setTimeout(
          () => (
            setLoading(false),
            setStatus(
              'Allow SMS Permission or may you have some balance in your mobile number ',
            )
          ),
          1000,
        );
      },
      (success) => {
        console.log('SMS sent successfully');
        setStatus(success);
        setLoading(false);
        sent();
        dispatch(selectedCode(phone, smscode, ''));
      },
    );
  };

  const numberWarns = (str, val) => {
    setnumber(val);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={Keyboard.dismiss}
        accessible={false}>
        <ScrollView>
          <View style={{justifyContent: 'center', marginTop: '10%'}}>
            <View style={{height: ScreenSize.hp35}}>
              <Image
                resizeMode="contain"
                source={Pic.Logo}
                style={{width: '100%', height: '100%'}}
              />
              {/* <View style={{}}>
                <Text style={styles.txt}>Get Me</Text>
              </View> */}
            </View>
          </View>

          <View style={{marginTop: 60}}>
            <Text style={styles.txt2}>PHONE NUMBER</Text>
            <View style={styles.inputView}>
              <KeyboardAwareScrollView>
                <TextInput
                  style={styles.inp1}
                  editable={false}
                  placeholder="+92"
                  maxLength={3}
                  underlineColorAndroid="transparent"
                  // onFocus={() => setActive(false)}
                  // onSubmitEditing={() => (
                  //   setPhoneNumber(number + number_code),
                  //   console.log('BLURRED', phone),
                  //   setActive(true)
                  // )}
                  // onChangeText={(number_code) =>
                  //   numberWarns('NUMBER_2', number_code)
                  // }
                  value={number_code}
                />
              </KeyboardAwareScrollView>
              {/* <KeyboardAwareScrollView> */}
              <TextInput
                style={styles.inp2}
                placeholder="e.g 786012345"
                keyboardType="phone-pad"
                underlineColorAndroid="transparent"
                // onFocus={() => setActive(false)}
                // onSubmitEditing={() => (
                //   setPhoneNumber(number_code + number),
                //   console.log('BLURRED', phone),
                //   setActive(true)
                // )}
                onChangeText={(number) => setnumber(number)}
                onEndEditing={() => setPhoneNumber(number_code + number)}
                // onChange={() => console.log('ONCHANGE')}
              />
              {/* </KeyboardAwareScrollView> */}
            </View>

            {/* {active == true && ( */}
            <View style={styles.touch}>
              <TouchableOpacity onPress={() => checkPer()}>
                {isloading == true ? (
                  <ActivityIndicator color={'#fff'} size="large" />
                ) : (
                  <Feather name="arrow-right" size={30} color="white" />
                )}
              </TouchableOpacity>
            </View>
            {/* )} */}

            {status !== '' && (
              <View
                style={[
                  styles.touch2,
                  {
                    backgroundColor:
                      status ==
                      'Allow SMS Permission or may you have some balance in your mobile number '
                        ? 'red'
                        : '#3498DB',
                  },
                ]}>
                <Text style={styles.txt3}>{status}!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
  txt: {
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
  inputView: {
    width: '50%',
    flexDirection: 'row',
    // backgroundColor: '',
    alignSelf: 'center',
  },
  inp1: {
    flex: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '#3498DB',
    color: '#3498DB',
    fontSize: 16,
    textAlign: 'center',
  },
  inp2: {
    flex: 4,
    backgroundColor: '#fefefe',
    marginLeft: 5,
    borderBottomWidth: 1,
    color: '#3498DB',
    borderBottomColor: '#3498DB',
    fontSize: 16,
    // textAlign: 'center',
    letterSpacing: 1,
  },
  touch: {
    backgroundColor: '#3498DB',
    elevation: 25,
    marginTop: 30,
    height: 20,
    flexDirection: 'row',
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    borderColor: '#3498DB',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  touch2: {
    backgroundColor: '#3498DB',
    // backgroundColor: 'green',
    elevation: 10,
    // marginTop: 20,
    height: 60,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txt3: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',

    // letterSpacing: 1,
  },
});

export default Home;
