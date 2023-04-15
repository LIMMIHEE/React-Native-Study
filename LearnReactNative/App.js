import React, { useState } from 'react';
import DateHead  from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';

import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import TodoList from './components/TodoList';

export default function App() {
  const today = new Date();
  const [todos, setTodos] = useState([
    {id: 1,text: "작업환경 설정", done:true},
    {id: 2,text: "리액트 네이티브 기초 공부", done:false},
    {id: 3,text: "투두 리스트 만들어보기", done:false}
  ]);
  const onInsert = text => {
    // 새로 등록할 id를 구하고 계산하여
    // 새로운 todo를 만든다.
    const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false
    }

    setTodos(todos.concat(todo));
  }

  const onToggle = id => {
    const nextTodos = todos.map(todo =>
        todo.id == id ? {...todo, done: !todo.done} : todo
      );
      setTodos(nextTodos)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios:'padding'})}
          style={styles.avoid}>
          <DateHead date={today}/>
          {todos.length === 0 ? <Empty/> :
            <TodoList todos = {todos} onToggle={onToggle}/>
          }
          
          <AddTodo onInsert={onInsert}/>
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
