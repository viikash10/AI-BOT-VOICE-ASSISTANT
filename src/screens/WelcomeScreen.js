import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.txt1}>Syntheim</Text>
        <Text style={styles.pnchtxt}>The Future is here, powered by AI</Text>
      </View>
      <View style={styles.container3}>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={styles.img}
        />
      </View>
      <TouchableOpacity
        style={styles.container4}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.txtbtn}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontSize: wp('10%'),
    fontWeight: 'bold',
    color: 'grey',
  },
  pnchtxt: {
    fontSize: wp('3.5%'),
    fontWeight: 'light',
    color: 'grey',
  },
  img: {
    width: wp(75),
    height: hp(45),
  },
  container4: {
    width: wp(85),
    height: hp(8),
    backgroundColor: '#10b981', // Emerald color
    padding: wp(2.5),
    borderRadius: wp(2.5), // Border radius
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtbtn: {
    color: 'white',
    fontSize: wp(5.5),
    fontWeight: 'bold',
  },
});
