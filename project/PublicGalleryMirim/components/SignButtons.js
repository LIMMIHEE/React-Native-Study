import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';

function SignButton({isSignUp, onSubmit, loading}) {
  const navigation = useNavigation();

  const primaryText = isSignUp ? '회원가입' : '로그인';
  const secondaryText = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.push('Welcome', {isSignUp: true});
    } else {
      navigation.push('SignIn', {isSignUp: true});
    }
  };

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.buttons}>
      <CustomButton title={primaryText} hasMarginBottom onPress={onSubmit} />
      <CustomButton
        title={secondaryText}
        theme="secondary"
        onPress={onSecondaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignButton;
