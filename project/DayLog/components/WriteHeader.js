import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import TransparentCircleButton from '../components/TransparentCircleButton';

function WriteHeader({onSave, isEditing, onAskRemove}) {
  const navigation = useNavigation();
  const onGoBack = () => {
    navigation.pop();
  };
  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>
      <View style={styles.buttons}>
        {
          isEditing && (
            <TransparentCircleButton
            name="delete-forever"
            color="#ef5350"
            hasMarginRight
            onPress={onAskRemove}
          />
          )
        }
        <TransparentCircleButton name="check" color="#009688" onPress={onSave}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    block: {
      height: 48,
      paddingHorizontal: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
    }
  });
  
  export default WriteHeader;