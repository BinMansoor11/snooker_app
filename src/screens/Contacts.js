import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState('+923152904214');

  const contact = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.log('error', err);
      } else {
        console.log('Contacts: ', contacts);
      }
    });
  };

  async function requestCameraPermission() {
    console.log('PER', PermissionsAndroid);

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the contacts');

        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            console.log('error', err);
          } else {
            console.log('Contacts: ', contacts);
          }
        });
      } else {
        console.log('Camera permission denied', granted);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => requestCameraPermission()}
        style={{ marginTop: 30 }}>
        <Text>dfsf</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contact;
