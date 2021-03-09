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
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../redux/actions/Actions';
import ImagePicker from 'react-native-image-picker';
import { Avatar, Accessory } from 'react-native-elements';

const AddUser = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.root);
  const { newUserPic } = state;

  const [pic, setPic] = useState('');
  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: '',
    phone: '',
    shift: '',
    timings: '',
  });
  const { name, designation, department, phone, shift, timings } = form;

  const inputs = [
    { default: 'Name', val: name, icon: 'user-tie' },
    { default: 'CNIC Number', val: name, icon: 'id-card' },
    { default: 'Daily Wage', val: name, icon: 'money-bill-alt' },
    { default: 'Designation', val: designation, icon: 'briefcase' },
    { default: 'Department', val: department, icon: 'hotel' },
    { default: 'Shift', val: shift, icon: 'user-clock' },
    { default: 'Shift Timings', val: timings, icon: 'clock' },
    { default: 'Phone', val: phone, icon: 'phone' },
  ];

  useEffect(() => {
    console.log('ADD', newUserPic);
  }, []);

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
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setPic(source);
        dispatch(addUser(source));
      }
    });
    console.log('AVATAR', pic);
  };

  const onChange = (str, val) => {
    switch (str) {
      case 'Name':
        setForm((prevState) => {
          return { ...prevState, name: val };
        });
        break;
      case 'Designation':
        setForm((prevState) => {
          return { ...prevState, designation: val };
        });
        break;
      case 'Phone':
        setForm((prevState) => {
          return { ...prevState, phone: val };
        });
        break;
      case 'Department':
        setForm((prevState) => {
          return { ...prevState, department: val };
        });
        break;
      case 'Shift':
        setForm((prevState) => {
          return { ...prevState, shift: val };
        });
        break;
      case 'Shift Timings':
        setForm((prevState) => {
          return { ...prevState, timings: val };
        });
        break;

      default:
        return form;
    }
    // console.log('FORM', form);
  };

  const buttons = [{ title: 'CANCEL' }, { title: 'SUBMIT' }];

  return (
    <View style={styles.container}>
      <GlobalHeader
        headingText="Add Replacement"
        back
        navigation={props.navigation}
        drawerIcon
        navigationDrawer={() => props.navigation.openDrawer()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text style={styles.heading}>Add User</Text> */}

        <View style={styles.avatarView}>
          <Avatar
            imageProps={{ resizeMode: 'cover' }}
            size="xlarge"
            source={
              newUserPic == '' || newUserPic == undefined
                ? Pic.User
                : newUserPic
            }
            rounded
            style={{ height: ScreenSize.hp15, width: ScreenSize.hp15 }}
            onPress={() => getPic()}>
            <Accessory size={30} icon="home" style={styles.iconAccess} />
          </Avatar>
        </View>

        <View>
          {inputs.map((v, i) => {
            return (
              <View
                key={i}
                style={[styles.inpBord, { marginTop: i == 0 ? '0%' : '2%' }]}>
                <View style={styles.iconLock}>
                  <Icons.FontAwesome5
                    name={v.icon}
                    // color={FontColor.lightBlue}
                    color={'gray'}
                    size={15}
                  />
                </View>
                <TextInput
                  style={{
                    flex: 5,
                    height: '100%',
                    fontSize: FontSize.font2,
                    fontFamily: Fonts.Regular,
                    marginTop: '2%',
                  }}
                  placeholder={v.default}
                  // placeholderTextColor={FontColor.lightBlue}
                  placeholderTextColor={'gray'}
                  onChangeText={(text) => onChange(v.default, text)}
                />
                {/* <View style={styles.iconEye}>
                  <Icons.Entypo name="eye-with-line" color="gray" size={20} />
                </View> */}
              </View>
            );
          })}
        </View>

        <View style={styles.btnView}>
          <View style={styles.btnRow}>
            {buttons.map((v, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.btn,
                    {
                      elevation: i == 0 ? 0 : 2,
                      borderColor: i == 0 ? FontColor.blue : 'orange',
                      backgroundColor: i == 0 ? '#fff' : 'orange',
                    },
                  ]}>
                  <Text
                    style={{
                      color: i == 0 ? FontColor.blue : 'white',
                      fontSize: FontSize.font2,
                      fontFamily: Fonts.Regular,
                      paddingTop: '2%',
                    }}>
                    {v.title}
                  </Text>
                </TouchableOpacity>
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
  touch3: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(128,128,128,0.2)',
    height: 20,
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    alignItems: 'center',
    letterSpacing: 1.84,
    marginBottom: 1,
  },
  badge: {
    backgroundColor: '#2e64b5',
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 360,
    marginLeft: 5,
    marginTop: 5,
  },
  heading: {
    fontSize: FontSize.font4,
    textAlign: 'center',
    color: FontColor.green,
    paddingVertical: '4%',
    // backgroundColor: 'rgba(228, 233, 237, 0.5)',
  },
  inpBord: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: ScreenSize.hp065,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: FontColor.green,
  },
  iconLock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  iconEye: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  btnView: {
    height: ScreenSize.hp05,
    marginVertical: '2%',
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
    width: '45%',
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarView: {
    height: ScreenSize.hp2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAccess: {
    height: 40,
    width: 40,
    borderRadius: 360,
    backgroundColor: 'orange',
  },
});

export default AddUser;
