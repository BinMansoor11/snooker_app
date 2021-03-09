import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import * as Icons from '../components/icons';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Header from './header';

// const Separator = () => <View style={styles.separator} />;

const Home = (props) => {
  const [secondName, setSecondName] = useState('Hussain');
  const [number, setnumber] = useState('');
  const [number_code, setnumber_code] = useState('');
  // console.warn(number);

  const numberWarns = (str, val) => {
    if (str == 'name') {
      console.warn('name', val);
    } else {
      console.warn('last_name', val);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        flex: 1,
      }}>
      <View
        style={{
          height: '20%',
          // backgroundColor: 'green',
          justifyContent: 'center',
        }}>
        <View style={{ marginTop: -50 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            COMPLETE PROFILE
          </Text>
        </View>
      </View>
      <View style={{ height: '15%' }}>
        <View
          style={{
            backgroundColor: '#EAEDED',
            marginTop: -20,
            height: 30,
            flexDirection: 'row',
            height: 100,
            width: 100,
            borderWidth: 1,
            borderRadius: 50,
            alignItems: 'center',
            borderColor: '#EAEDED',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Icons.Feather name="camera" size={40} color="#999a95" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            textAlign: 'center',
          }}>
          Upload your profile pictuer
        </Text>
      </View>

      <View style={{ height: '70%', marginTop: 50 }}>
        {/* <Text style={{ color: '#3498DB', marginLeft: 10, fontWeight: '' }}>
          FIRST NAME
        </Text> */}
        <View
          style={{
            width: '95%',
            flexDirection: 'row',
            backgroundColor: '',
            alignSelf: 'center',
          }}>
          <TextInput
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: '#3498DB',
              color: '#3498DB',
            }}
            placeholder="FIRST NAME"
            keyboardType=""
            underlineColorAndroid="transparent"
            onChangeText={(NAME) => numberWarns('name', NAME)}
          />
        </View>

        <View
          style={{
            width: '95%',
            flexDirection: 'row',
            backgroundColor: '',
            alignSelf: 'center',
          }}>
          <TextInput
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: '#3498DB',
              color: '#3498DB',
            }}
            placeholder="LAST NAME"
            keyboardType=""
            underlineColorAndroid="transparent"
            onChangeText={(LAST_NAME) => numberWarns('last_name', LAST_NAME)}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#3498DB',
            marginTop: 30,
            height: 40,
            width: '85%',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            elevation: 15,
          }}
          onPress={() => props.navigation.navigate('BottomTab')}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>CONTINUE</Text>
        </TouchableOpacity>

        {/* <TextInput
          style={{
            flex: 4,
            backgroundColor: '#fefefe',
            marginLeft: 5,
            borderBottomWidth: 1,
            color: '#3498DB',
            borderBottomColor: '#3498DB',
          }}
          placeholder="+92625466465"
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          onChangeText={(number) => numberWarns('NUMBER_1', number)}
        /> */}
      </View>

      {/* <Button
        style={{marginTop: 140, borderRadius: 200}}
        title="Sign Up"
        color="#1E90FF"
        onPress={() => props.navigation.navigate('SignUp')}
      /> */}
      {/* <Button
        title="Login "
        onPress={() => props.navigation.navigate('Drawer_navigation')}
      /> */}
      {/* <Separator /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    // justifyContent: 'center',
    // marginHorizontal: 16,
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
});

export default Home;
