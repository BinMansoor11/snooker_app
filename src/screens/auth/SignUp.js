import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import GlobalHeader from '../../components/GlobalHeader';
import {
  ScreenSize,
  Pic,
  FontSize,
  FontColor,
  Fonts,
} from '../../components/theme';
import * as Icons from '../../components/icons';
import { Form, Item, Input, Label, Icon } from 'native-base';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { userAuth } from '../../redux/actions/Actions';
import * as Animatable from 'react-native-animatable';
const AnimatedTouchable = Animatable.createAnimatableComponent(
  TouchableOpacity,
);

const SignUp = (props) => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.auth);
  // const { user } = state;

  const [logged, setLogged] = useState(false);
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = form;

  const buttons = [{ title: 'Sign Up', navigate: 'Drawer_navigation' }];

  const onChange = (str, val) => {
    switch (str) {
      case 'First':
        setForm((prevState) => {
          return { ...prevState, firstName: val };
        });
        break;
      case 'Email':
        setForm((prevState) => {
          return { ...prevState, email: val };
        });
        break;
      case 'Password':
        setForm((prevState) => {
          return { ...prevState, password: val };
        });
        break;

      case 'Last':
        setForm((prevState) => {
          return { ...prevState, lastName: val };
        });
        break;
      case 'ForgotEmail':
        setForgotEmail(val);
        break;

      default:
        return form;
    }
    // console.log(form, forgotEmail);
  };

  const login = () => {
    dispatch(userAuth(email));
    setLogged(true);
  };

  setTimeout(() => {
    logged == true &&
      (props.navigation.navigate('HomeScreen'), setLogged(false));
  }, 2000);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={FontColor.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarView}>
          <Image
            source={Pic.GetStart}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>

        <Form>
          <Item
            underline
            style={[
              styles.item,
              {
                borderColor: active == false ? '#ccc' : FontColor.blue,
              },
            ]}
            floatingLabel>
            <Label style={{ color: active == false ? '#ccc' : FontColor.blue }}>
              First Name
            </Label>
            <Input
              style={{ paddingLeft: '3%' }}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              onChangeText={(text) => onChange('First', text)}
            />
          </Item>

          <Item
            underline
            style={[
              styles.item,
              {
                borderColor: active1 == false ? '#ccc' : FontColor.blue,
                fontFamily: Fonts.Regular,
              },
            ]}
            floatingLabel>
            <Label
              style={{
                color: active1 == false ? '#ccc' : FontColor.blue,
                fontFamily: Fonts.Regular,
              }}>
              Last Name
            </Label>
            <Input
              style={{ paddingLeft: '3%' }}
              onChangeText={(text) => onChange('Last', text)}
              onFocus={() => setActive1(true)}
              onBlur={() => setActive1(false)}
            />
          </Item>

          <Item
            underline
            style={[
              styles.item,
              {
                borderColor: active2 == false ? '#ccc' : FontColor.blue,
                fontFamily: Fonts.Regular,
              },
            ]}
            floatingLabel>
            <Label
              style={{
                color: active2 == false ? '#ccc' : FontColor.blue,
                fontFamily: Fonts.Regular,
              }}>
              Email or Phone
            </Label>
            <Input
              style={{ paddingLeft: '3%' }}
              onChangeText={(text) => onChange('Email', text)}
              onFocus={() => setActive2(true)}
              onBlur={() => setActive2(false)}
            />
          </Item>

          <Item
            underline
            style={[
              styles.item,
              {
                borderColor: active3 == false ? '#ccc' : FontColor.blue,
                fontFamily: Fonts.Regular,
              },
            ]}
            floatingLabel>
            <Label
              style={{
                color: active3 == false ? '#ccc' : FontColor.blue,
                fontFamily: Fonts.Regular,
              }}>
              Password
            </Label>
            <Input
              style={{ paddingLeft: '3%' }}
              onChangeText={(text) => onChange('Password', text)}
              onFocus={() => setActive3(true)}
              onBlur={() => setActive3(false)}
            />
          </Item>
        </Form>

        <View style={styles.btnView}>
          <View style={[styles.btnRow, { justifyContent: 'flex-end' }]}>
            {buttons.map((v, i) => {
              return (
                <Animatable.View
                  animation="bounceIn"
                  duration={1000}
                  key={v.title}
                  style={[
                    styles.btn,
                    {
                      elevation: 2,
                      borderColor: FontColor.primary,
                      backgroundColor: FontColor.primary,
                      width: '55%',
                      borderRadius: 5,
                    },
                  ]}>
                  {logged == true ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <TouchableOpacity style={styles.viewTouch} onPress={login}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: FontSize.font2,
                          fontFamily: Fonts.Bold,
                          // backgroundColor: 'red',
                          paddingTop: '2%',
                        }}>
                        {v.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Animatable.View>
              );
            })}
          </View>
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
  btnView: {
    height: ScreenSize.hp06,
    marginVertical: '4%',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  btnRow: {
    height: '100%',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    height: '90%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    // backgroundColor: 'red',
    height: ScreenSize.hp1,
    marginVertical: '2%',
    width: '90%',
    alignSelf: 'center',
  },
  avatarView: {
    height: ScreenSize.hp3,
  },
  forgetBtn: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    fontFamily: Fonts.Bold,
    color: FontColor.primary,
    textDecorationLine: 'underline',
    fontSize: FontSize.font2,
  },
  viewTouch: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUp;
