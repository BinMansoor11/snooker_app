import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
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
import ImagePicker from 'react-native-image-picker';
import { Avatar, Accessory } from 'react-native-elements';
import { Thumbnail } from 'native-base';
import * as Animatable from 'react-native-animatable';
const AnimatedTouchable = Animatable.createAnimatableComponent(
  TouchableOpacity,
);
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const Register = (props) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.root);
  const { image } = state;

  const [pic, setPic] = useState('');
  const [add, setAdd] = useState(false);
  const [mark, setMark] = useState(false);
  const [userName, setUserName] = useState(false);
  const [status, setStatus] = useState(false);
  const [active, setActive] = useState(null);
  const [disable, setDisable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMsg] = useState({ msg: '', color: '' });

  const { msg, color } = message;

  useEffect(() => {
    console.log('REFRESHED_HOMESCREEN');
  }, [isFocused]);

  const options = {
    title: 'Select Profile Pic',
    // customButtons: [{ name: 'gallery', title: 'Choose Photo from gallery' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const getPic = () => {
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        setDisable(false);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('SOUUURCE', source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setUser();
        setPic(source);
        dispatch(savePic(source));
      }
    });
    console.log('AVATAR', pic);
  };

  const setUser = () => {
    // setTimeout(() => {
    //   setUserName(true);
    // }, 2000);

    setTimeout(() => {
      setMark(true);
    }, 2000);
  };

  setTimeout(() => {
    status == true
      ? (setStatus(false),
        setActive(null),
        setMark(false),
        setDisable(false),
        setPic(''),
        dispatch(savePic('')),
        setUserName(false),
        setMsg((prevState) => {
          return {
            ...prevState,
            msg: '',
            color: '',
          };
        }))
      : null;
  }, 4000);

  const setAct = (i) => setActive(i);

  const postImage = () => {
    axios
      .post('https://jsonplaceholder.typicode.com/photos', {
        albumId: 1,
        title: 'MY IMAGE',
        url: pic,
        thumbnailUrl: 'https://via.placeholder.com/150/1ee8a4',
      })
      .then(function (response) {
        console.log('API_RESPPONSE', response.data);
        setMsg((prevState) => {
          return {
            ...prevState,
            msg: 'done',
            color: FontColor.success,
          };
        });
      })
      .catch(function (error) {
        console.log('API_ERROR', error);
        setMsg((prevState) => {
          return {
            ...prevState,
            msg: 'fail',
            color: 'red',
          };
        });
      })
      .finally(() => setLoading(false), setStatus(true), setUserName(true));
  };

  return (
    <View style={styles.container}>
      <GlobalHeader
        headingText="Register User"
        drawerIcon
        home
        navigationDrawer={() => props.navigation.openDrawer()}
      />
      <ScrollView>
        <View style={styles.avatarView}>
          <Avatar
            imageProps={{ resizeMode: 'cover' }}
            size="xlarge"
            source={image == '' || image == undefined ? Pic.User : image}
            onPress={() => (getPic(), setUserName(false))}
            style={{ height: ScreenSize.hp22, width: ScreenSize.hp22 }}
            rounded>
            <Accessory size={30} icon="home" style={styles.iconAccess} />
          </Avatar>
        </View>

        {userName == true && (
          <Animatable.Text
            animation="bounceIn"
            duration={1000}
            delay={250}
            style={styles.username}>
            User
          </Animatable.Text>
        )}

        {disable == true && (
          <Animatable.View
            animation="bounceIn"
            duration={1000}
            style={styles.btn}>
            <TouchableOpacity
              style={styles.viewTouch}
              onPress={() => (getPic(), setUser(), setUserName(false))}>
              <Text style={styles.txtTouch}>Camera</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}

        <Text style={styles.headingText}>Employees</Text>

        {[1, 1, 1, 1, 1, 1, 1].map((v, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => (
                setAct(i),
                setAdd(false),
                setDisable(true),
                setPic({
                  uri: 'https://picsum.photos/seed/picsum/200/300',
                }),
                dispatch(
                  savePic({
                    uri: 'https://picsum.photos/seed/picsum/200/300',
                  }),
                )
              )}
              style={[
                styles.countryTouch,
                {
                  backgroundColor:
                    i == active ? FontColor.green : 'transparent',
                },
              ]}>
              <Thumbnail
                // small
                // source={Pic.User}
                source={{
                  uri: 'https://picsum.photos/seed/picsum/200/300',
                }}
              />
              <Text
                style={[
                  styles.addManualUser,
                  { color: i == active ? '#fff' : '#000' },
                ]}>
                User
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {mark == true && (
        <Animatable.View
          animation="bounceIn"
          duration={1000}
          style={styles.btn1}>
          <TouchableOpacity
            style={styles.touchMark}
            onPress={() => (postImage(), setLoading(true))}>
            <Icons.Entypo name="add-user" color="#fff" size={20} />
            {isLoading == true ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.txtTouch1}>Register User</Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
      )}

      {/* <ActivityIndicator size="small" color="#fff" /> */}
      {status == true && (
        <Animatable.View
          duration={500}
          delay={500}
          animation="fadeInUpBig"
          style={[
            styles.avatarView1,
            {
              backgroundColor: color,
            },
          ]}>
          <View style={{ marginLeft: '-10%' }}>
            <Avatar
              imageProps={{ resizeMode: 'cover' }}
              size="large"
              source={image == '' || image == undefined ? Pic.User : image}
              rounded
              // onPress={() => getPic()}
            ></Avatar>
          </View>
          <View style={styles.attendView}>
            <Text style={styles.attendHead}>
              {msg == 'done' ? 'User Registered' : 'Not Registered'}
            </Text>
            {/* <Text style={styles.attendTime}>
              {msg == 'done' ? 'Time: 09:00' : 'Time: 00:00'}
            </Text> */}
            <Text style={styles.attendName}>
              {msg == 'done' ? 'Name: User' : 'Name: No user'}
            </Text>
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  avatarView: {
    height: ScreenSize.hp3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarView1: {
    height: ScreenSize.hp2,
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: '5%',
    right: '2%',
    borderRadius: 10,
    elevation: 6,
  },
  iconAccess: {
    height: 40,
    width: 40,
    borderRadius: 360,
    backgroundColor: 'orange',
  },
  btn: {
    height: ScreenSize.hp07,
    width: '40%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
    backgroundColor: 'orange',
    marginTop: '3%',
  },
  btn1: {
    height: ScreenSize.hp07,
    width: '45%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignSelf: 'center',
    elevation: 5,
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: '8%',
  },
  btnManual: {
    height: ScreenSize.hp05,
    width: '25%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    elevation: 5,
    backgroundColor: FontColor.green,
    marginTop: '2%',
    marginHorizontal: '2%',
  },
  btnManual1: {
    height: ScreenSize.hp04,
    width: ScreenSize.hp04,
    borderRadius: ScreenSize.hp04,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    elevation: 5,
    backgroundColor: FontColor.green,
    marginTop: '2%',
    marginHorizontal: '4%',
  },
  txtTouch: {
    color: '#fff',
    fontSize: FontSize.font4,
    fontFamily: Fonts.Bold,
    letterSpacing: 2,
    paddingTop: '2%',
  },
  txtAdd: {
    color: '#fff',
    fontSize: FontSize.font25,
    fontFamily: Fonts.SemiBold,
    // letterSpacing: 2,
  },
  txtTouch1: {
    color: '#fff',
    fontSize: FontSize.font25,
    fontFamily: Fonts.Bold,
    // letterSpacing: 2,
  },
  txtTouchManual: {
    color: '#fff',
    fontSize: FontSize.font2,
    fontFamily: Fonts.Bold,
    // letterSpacing:,
  },
  countryOverlay: {
    height: ScreenSize.hp6,
    position: 'absolute',
    top: '10%',
    left: 0,
    zIndex: 9999,
    width: '60%',
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 3,
  },
  countryTouch: {
    flexDirection: 'row',
    height: ScreenSize.hp1,
    width: '98%',
    alignSelf: 'center',
    borderRadius: 4,
    alignItems: 'center',
    paddingLeft: '2%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginBottom: '1%',
  },
  attendView: {
    height: '100%',
    paddingLeft: '5%',
    width: '70%',
    paddingVertical: '5%',
  },
  attendHead: {
    fontFamily: Fonts.Bold,
    color: '#fff',
    fontSize: FontSize.font3,
    marginBottom: '1%',
  },
  attendTime: {
    fontFamily: Fonts.SemiBold,
    color: '#fff',
    fontSize: FontSize.font3,
  },
  attendName: {
    fontFamily: Fonts.SemiBold,
    color: '#fff',
    fontSize: FontSize.font3,
  },
  username: {
    textAlign: 'center',
    fontSize: FontSize.font4,
    color: FontColor.green,
    fontFamily: Fonts.Regular,
  },
  btnAdd: {
    height: ScreenSize.hp06,
    width: '90%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,

    marginVertical: '4%',
  },
  viewTouch: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchMark: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  addManualUser: {
    fontSize: FontSize.font3,
    paddingLeft: '5%',
    fontFamily: Fonts.Regular,
  },
  headingText: {
    fontSize: FontSize.font3,
    // textAlign: 'center',
    color: FontColor.green,
    paddingVertical: '3%',
    paddingHorizontal: '2%',
    backgroundColor: 'rgba(228, 233, 237, 0.5)',
    fontFamily: Fonts.SemiBold,
    marginTop: '5%',
  },
  touch3: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    height: ScreenSize.hp04,
    justifyContent: 'space-between',
    // paddingLeft: '5%',
    alignItems: 'center',
    letterSpacing: 1.84,
    marginBottom: 1,
  },
  titleText: {
    fontSize: FontSize.font2,
    color: '#000',
    fontFamily: Fonts.Regular,
  },
  titleText1: {
    fontSize: FontSize.font2,
    fontFamily: Fonts.Bold,
    color: '#000',
  },
  titleView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
