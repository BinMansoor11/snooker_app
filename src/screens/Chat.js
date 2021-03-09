import React, { useState } from 'react';
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

import GlobalHeader from '../components/GlobalHeader';
import { Fonts, ScreenSize } from '../components/theme';
import * as Icons from '../components/icons';
// import { onChange } from 'react-native-reanimated';

const Chat = ({ navigation, route }) => {
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [convo, setConvo] = useState([
    { id: 0, msg: 'Hey?', time: '19:24' },
    { id: 1, msg: [], time: '19:24' },
  ]);

  const { id, msg, time } = convo;

  const onChange = (val) => {
    setValue(val), setFocused(true), setMessage(val);
    console.log('VAL', val);
  };

  const onSend = () => {
    setFocused(false), setValue('');
    convo[1].msg.push(message);
  };

  const attachments = [
    {
      title: 'Find Freinds',
      icon: 'users',
      press: () => alert('Find Freinds'),
    },
    {
      title: 'Send Location',
      icon: 'location-pin',
      press: () => alert('Location'),
    },
    {
      title: 'Show Gallery',
      icon: 'images',
      press: () => alert('Gallery'),
    },
    {
      title: 'Document',
      icon: 'text-document-inverted',
      press: () => alert('Document'),
    },
    {
      title: 'Contact',
      icon: 'phone',
      press: () => alert('Contact'),
    },
    {
      title: 'Camera',
      icon: 'camera',
      press: () => navigation.navigate('Camera'),
    },
  ];

  return (
    <View style={styles.container}>
      <GlobalHeader
        headingText="Dierdre John"
        back
        item
        navigation={navigation}
      />
      <ScrollView
        style={{ marginHorizontal: 10, marginTop: 20 }}
        showsVerticalScrollIndicator={false}>
        {convo.map((v, i) => {
          return (
            <View
              style={{
                width: '60%',
                alignSelf: v.id == 0 ? 'flex-start' : 'flex-end',
              }}>
              <View
                style={[
                  styles.bubble,
                  { backgroundColor: v.id == 0 ? 'white' : '#1664d4' },
                ]}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.Regular,
                    color: v.id == 0 ? '#000' : '#fff',
                  }}>
                  {v.msg}
                </Text>
              </View>
              <Text style={styles.date}>{v.time}</Text>
            </View>
          );
        })}
      </ScrollView>

      {active == true && (
        <View style={styles.attachView}>
          {attachments.map((v, i) => {
            return (
              <TouchableOpacity onPress={v.press} style={styles.attachTouch}>
                <View style={styles.iconView}>
                  <Icons.Entypo name={v.icon} size={25} color="#fff" />
                </View>
                <Text style={styles.title}>{v.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <View style={styles.main}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {focused == false && (
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
              <Icons.Feather
                name="camera"
                size={25}
                color="gray"
                style={{ marginHorizontal: 15 }}
              />
            </TouchableOpacity>
          )}
          {focused == false && (
            <TouchableOpacity onPress={() => setActive(!active)}>
              <Icons.Entypo
                name="attachment"
                size={25}
                color="gray"
                style={{ marginHorizontal: 15 }}
              />
            </TouchableOpacity>
          )}
          <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => (setFocused(false), setValue(''))}
            value={value}
            onChangeText={(text) => onChange(text)}
            multiline={true}
            style={{
              padding: 0,
              backgroundColor: '#f9f9f9',
              alignSelf: 'center',
              // fontFamily: Fonts.Regular,
              width: focused == true ? '90%' : 'auto',
            }}
            placeholder="Type message..."
          />
        </View>

        {focused == false ? (
          <TouchableOpacity onPress={() => alert('dfdf')} style={styles.mic}>
            <Icons.SimpleLineIcons name="microphone" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onSend()} style={styles.send}>
            <Icons.FontAwesome name="send" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.2)',
    height: 90,
    justifyContent: 'space-between',
    alignItems: 'center',
    letterSpacing: 1.84,
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
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    height: 60,
  },
  mic: {
    backgroundColor: '#2283ec',
    height: 30,
    width: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  send: {
    backgroundColor: '#2283ec',
    height: 30,
    width: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  bubble: {
    width: '98%',
    alignSelf: 'center',
    marginVertical: 1,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 3,
  },
  date: {
    alignSelf: 'flex-end',
    marginRight: 10,
    color: 'gray',
    fontFamily: Fonts.Regular,
  },
  attachView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: ScreenSize.hp35,
    backgroundColor: '#f9f9f9',
    width: '98%',
    alignSelf: 'center',
    borderRadius: 5,
    zIndex: 9999,
    elevation: 5,
    padding: 20,
  },
  iconView: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: '#2283ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6883b2',
    textAlign: 'center',
    // fontFamily: Fonts.Regular,
  },
  attachTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    // backgroundColor: 'red',
    width: '20%',
    marginTop: 5,
  },
});

export default Chat;
