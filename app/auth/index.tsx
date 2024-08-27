import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, FC} from 'react';
import {images} from '../../constants';

type Props = {
  navigation: any;
};

const Splash: FC<Props> = ({navigation}) => {
  useEffect(() => {
    checkAndGo();
  }, []);

  const checkAndGo = async () => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.BG}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <ActivityIndicator style={{marginTop: 400}} size={40} color={'white'} />
      </ImageBackground>
      {/* <Image
                style={{width: '100%', height: '15%'}}
                resizeMode="contain"
                source={logo}/> */}
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
