import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import Voice from '@react-native-community/voice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {apiCall} from '../api/openAI';
import Features from '../components/features';
import Tts from 'react-native-tts';

const App = () => {
  const [result, setResult] = useState('');
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const scrollViewRef = useRef();

  const speechStartHandler = e => {
    console.log('speech start event', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = e => {
    console.log('speech event: ', e);
    const text = e.value[0];
    setResult(text);
  };

  const speechErrorHandler = e => {
    console.log('speech error: ', e);
  };

  const startRecording = async () => {
    setRecording(true);
    Tts.stop();
    try {
      await Voice.start('en-US'); // en-US
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
      // fetch response
      fetchResponse();
    } catch (error) {
      console.log('error', error);
    }
  };
  const clear = () => {
    Tts.stop();
    setSpeaking(false);
    setLoading(false);
    setMessages([]);
  };

  const fetchResponse = async () => {
    if (result.trim().length > 0) {
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);
      updateScrollView() ;
      setLoading(true);
      apiCall(result.trim(), newMessages).then(res => {
        //console.log('got api data:' ,res) ;
        setLoading(false);
        if (res.success) {
          setMessages([...res.data]);
          updateScrollView();
          setResult('');
          startTextToSpeach(res.data[res.data.length-1]) ;
        } else {
          Alert.alert('Error', res.msg);
        }
      });
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }, 200);
  };

  const startTextToSpeach = message => {
    if (!message.content.includes('https')) {
      setSpeaking(true);
      // playing response with the voice id and voice speed
      Tts.speak(message.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };

  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  };

  useEffect(() => {
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    // text to speech events
    Tts.setDefaultLanguage('en-IE');
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {
      console.log('finish', event);
      setSpeaking(false);
    });
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  //console.log('result:',result) ;
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={styles.container1}>
        {/* bot icon */}
        <View style={styles.container2}>
          <Image
            source={require('../../assets/images/bot.png')}
            style={styles.img}
          />
        </View>

        {/* features || message history */}
        {messages.length > 0 ? (
          <View style={styles.container3}>
            <Text style={styles.htxt}>Assistant</Text>

            <View style={styles.container4}>
              <ScrollView
                ref={scrollViewRef}
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role == 'assistant') {
                    if (message.content.includes('https')) {
                      // result is an ai image
                      return (
                        <View key={index} style={styles.container5}>
                          <View style={styles.container6}>
                            <Image
                              source={{uri: message.content}}
                              style={styles.astimg}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      // chat gpt response
                      return (
                        <View key={index} style={styles.container7}>
                          <Text style={styles.mssgtxt}>{message.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    // user input text
                    return (
                      <View key={index} style={styles.container8}>
                        <Text style={styles.mssgtxt}>{message.content}</Text>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}

        {/* recording, clear and stop buttons */}
        <View style={styles.container9}>
          {loading ? (
            <Image
              source={require('../../assets/images/loading.gif')}
              style={{width: hp(10), height: hp(10)}}
            />
          ) : recording ? (
            <TouchableOpacity className="space-y-2" onPress={stopRecording}>
              {/* recording stop button */}
              <Image
                style={styles.micimg}
                source={require('../../assets/images/voiceLoading.gif')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              {/* recording start button */}
              <Image
                source={require('../../assets/images/recordingIcon.png')}
                style={styles.micimg}
              />
            </TouchableOpacity>
          )}
          {messages.length > 0 && (
            <TouchableOpacity onPress={clear} style={styles.clearbtn}>
              <Text>Clear</Text>
            </TouchableOpacity>
          )}
          {speaking && (
            <TouchableOpacity onPress={stopSpeaking} style={styles.stpbtn}>
              <Text style={{color: 'white'}}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: hp(1),
  },
  container1: {
    flex: 1,
  },
  container2: {
    alignItems: 'center',
  },
  img: {
    width: wp(30),
    height: hp(20),
    justifyContent: 'space-around',
  },
  container3: {
    flex: 1,
  },
  htxt: {
    fontSize: 6.5 * wp(1),
    fontWeight: 'bold',
    color: '#4A5568',
    marginLeft: wp(2.5),
  },
  container4: {
    height: hp(58), // height: hp(58)
    backgroundColor: '#e0e0e0', // bg-neutral-200
    borderRadius: 12, // rounded-3xl
    padding: 16, // p-4,
    margin: wp(2.5),
  },

  //assistant txt
  container7: {
    backgroundColor: '#d1fae5', // bg-neutral-200
    justifyContent: 'flex-start',
    borderRadius: 10, // rounded-3xl
    borderTopLeftRadius: 0,
    margin: wp(1.5),
  },
  // assistant image
  container5: {
    flexDirection: 'row',
    justifyContent: 'start',
  },
  container6: {
    padding: 8,
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#d1fae5', // bg-emerald-100
    borderTopLeftRadius: 0,
  },
  astimg: {
    borderRadius: 16,
    resizeMode: 'contain',
    height: wp(60),
    width: wp(60),
  },

  // user input
  container8: {
    backgroundColor: 'white', // bg-neutral-200
    justifyContent: 'flex-end',
    borderRadius: 10, // rounded-3xl
    borderTopRightRadius: 0,
    margin: wp(1.5),
  },
  mssgtxt: {
    fontSize: 3.5 * wp(1), // wp(4.8)
    fontWeight: 'semibold', // font-semibold
    color: '#4a5568', // text-gray-700
    padding: wp(2.5),
  },

  // recording , clear , stop buttons
  container9: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  micimg: {
    height: hp(10),
    width: hp(10),
    borderRadius: wp(50),
  },
  clearbtn: {
    backgroundColor: '#CED4DA', // This is a rough approximation of bg-neutral-400
    borderRadius: 12, // rounded-3xl
    padding: 8, // p-2
    position: 'absolute',
    right: 100, // right-10
  },
  clrtxt: {
    color: '#FFFFFF', // text-white
    fontWeight: '600', // font-semibold
  },
  stpbtn: {
    backgroundColor: 'red', // This is a rough approximation of bg-neutral-400
    borderRadius: 12, // rounded-3xl
    padding: 8, // p-2
    position: 'absolute',
    left: 100, // right-10
  },
});
