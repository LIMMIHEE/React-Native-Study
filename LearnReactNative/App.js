import React from 'react';
import DateHead  from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';

import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  const today = new Date();
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios:'padding'})}
          style={styles.avoid}>
          <DateHead date={today}/>
          <Empty/>
          <AddTodo />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white'
  },
  avoid: {
    flex: 1
  }
});
