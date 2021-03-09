import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
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
import * as Animatable from 'react-native-animatable';

import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = (props) => {
  const isFocused = useIsFocused();

  const cardArray = Array.from({ length: 6 }, (v, i) => i + 1);

  return (
    <View style={styles.container}>
      <GlobalHeader
        headingText="History"
        // drawerIcon
        home
        // navigationDrawer={() => props.navigation.openDrawer()}
      />
      <ScrollView>
        {cardArray.map((v, i) => {
          return (
            <Animatable.View
              animation="fadeInUpBig"
              duration={750}
              key={i}
              style={[
                styles.cardView,
                { marginBottom: i == cardArray.length - 1 ? '3%' : '0%' },
              ]}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Details')}
                style={styles.viewTouch}>
                <View style={{ height: '100%', flex: 1 }}>
                  <Image
                    source={Pic.Pool}
                    resizeMode="stretch"
                    style={{ height: '100%', width: '100%' }}
                  />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardDate}>Date: 1-1-2020</Text>
                  <Text style={styles.cardTime}>Timings: 9:00 - 11:00 PM</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardView: {
    height: ScreenSize.hp15,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'rgba(128,128,128,0.9)',
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1%',
    borderRadius: 5,
  },
  cardText: {
    height: '100%',
    flex: 3,
    marginLeft: '1%',
    paddingTop: '2%',
  },
  cardDate: {
    fontSize: FontSize.font3,
    fontFamily: Fonts.Bold,
    color: '#fff',
    paddingLeft: '4%',
  },
  cardTime: {
    fontSize: FontSize.font25,
    fontFamily: Fonts.SemiBold,
    color: '#fff',
    paddingLeft: '4%',
  },
  viewTouch: {
    height: '100%',
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default HomeScreen;
