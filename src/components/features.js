// bounce kya hota hai??
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const features = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <Text style={styles.htxt}>Features</Text>
      {/* chatGPT */}
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Image
            source={require('../../assets/images/chatgptIcon.png')}
            style={styles.img}
          />
          <Text style={styles.shtext}>ChatGPT</Text>
        </View>
        <Text style={styles.text}>
          ChatGPT can provide you with instant and knowledgeable responses,
          assist you with creative ideas on a wide range of topics.
        </Text>
      </View>

      {/* Dall-E */}
      <View style={styles.dcontainer2}>
        <View style={styles.dcontainer3}>
          <Image
            source={require('../../assets/images/dalleIcon.png')}
            style={styles.img}
          />
          <Text style={styles.dshtext}>Dall-E</Text>
        </View>
        <Text style={styles.text}>
          DALL-E can generate imaginative and diverse images from textual
          descriptions, expanding the boundaries of visual creativity.
        </Text>
      </View>
      {/* smartAI */}
      <View style={styles.scontainer2}>
        <View style={styles.scontainer3}>
          <Image
            source={require('../../assets/images/smartaiIcon.png')}
            style={styles.img}
          />
          <Text style={styles.sshtext}>SmartAI</Text>
        </View>
        <Text style={styles.text}>
          A powerful voice assistant with the abilities of ChatGPT and Dall-E,
          providing you the best of both worlds.
        </Text>
      </View>
    </ScrollView>
  );
};

export default features;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    verticalAlign: 4,
    height: hp(60),
  },
  htxt: {
    fontSize: 6.5 * wp(1),
    fontWeight: 'bold',
    color: '#4A5568',
    marginLeft: wp(2.5),
  },
  container2: {
    backgroundColor: '#9fdeac',
    padding: 16,
    borderRadius: 24,
    marginBottom: 8,
    margin: wp(2.5),
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(0.5),
  },
  shtext: {
    fontSize: 5.5 * wp(1), // wp(4.8)
    fontWeight: 'bold', // font-semibold
    color: '#4a5568', // text-gray-700
    marginRight: wp(54),
  },
  text: {
    fontSize: wp(3.5),
    color: '#4a5568',
    fontWeight: '500',
    marginTop: hp(1),
  },
  //  dall-e
  dcontainer2: {
    backgroundColor: '#DDD6FE',
    padding: 16,
    borderRadius: 24,
    marginBottom: 8,
    margin: wp(2.5),
  },
  dcontainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dshtext: {
    fontSize: 5.5 * wp(1), // wp(4.8)
    fontWeight: 'bold', // font-semibold
    color: '#4a5568', // text-gray-700
    marginRight: wp(60),
  },

  // smartai
  scontainer2: {
    backgroundColor: '#34e1eb',
    padding: 16,
    borderRadius: 24,
    marginBottom: 8,
    margin: wp(2.5),
  },
  scontainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sshtext: {
    fontSize: 5.5 * wp(1), // wp(4.8)
    fontWeight: 'bold', // font-semibold
    color: '#4a5568', // text-gray-700
    marginRight: wp(56),
  },
});
