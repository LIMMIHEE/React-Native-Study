import React, {useEffect} from 'react';
import {View} from 'react-native';
import Profile from '../components/Profile';
import {useNavigation, useRoute} from '@react-navigation/native';

function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId, displayName} = route.params ?? {};

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return <Profile userId={userId} />;
}

export default ProfileScreen;
