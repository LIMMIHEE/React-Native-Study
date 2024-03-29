import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {format, formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';
import { useNavigation } from '@react-navigation/native';

function formatDate(date) {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000;

    if(diff < 60 * 1){
        return '방금 전';
    }

    if(diff < 60 * 60 * 24 * 3){
        return formatDistanceToNow(d, {addSuffix : true, locale: ko});
    }
    return format(d,'YYYY년 M월 dd일 E',{locale: ko});
    
}

function truncate(text) {
    // 모든 줄바꿈 제거
    const replaced = text.replace('\n/g', '');
    if(replaced.length <= 100){
        return replaced;
    }

    return replaced.slice(0,100).concat('...');
}

function FeedListItem({log}) {
    const {title, body, date} = log;
    //사용 전에 객체 구조 분해 할당.

    const navigation = useNavigation();
    const onPress = () => {
      navigation.navigate('Write',{
        log
      });
    }

    return(
        <Pressable
            style={({pressed}) => [
                styles.block,
                Platform.OS === 'ios' && pressed && {backgroundColor: '#efefef'},
              ]}
              onPress={onPress}
            android_ripple={{color: '#ededed'}}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{body}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    block: {
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    date: {
      fontSize: 12,
      color: '#546e7a',
      marginBottom: 8,
    },
    title: {
      color: '#263238',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    body: {
      color: '#37474f',
      fontSize: 16,
      lineHeight: 21,
    },
  });
  
  export default FeedListItem;