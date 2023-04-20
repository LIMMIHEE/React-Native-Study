# Week 3

## Context API

리액트에 내장된 기능 중 하나.

Props를 사용하지 않아도 특정 값이 필요한 **컴포넌트끼리 값 공유가 가능하게 해준다**.

- 주로 전역 상태 관리할 때 많이 사용한다.

createContext 함수를 사용해 Context를 만들어 사용한다.

→ 이때, context가 생성되면서 아래의 컴포넌트들도 만들어진다.

- **.Provider 컴포넌트**
context 안에 있는 값을 사용할 컴포넌트들을 감싸주는 용도.

**Provider는 value Props를 설정할 수 있는데
이 값이 바로 Context 통해 공유할 값이다.**

Provider 컴포넌트를 사용하면 해당 컴포넌트 내부에 선언된 모든 컴포넌트에서 Context 안의 값을 사용할 수 있다.
- **.Consumer 컴포넌트**

공유된 값을 사용하기 위한 컴포넌트.

예시

```jsx
//선언부 예시
import {createContext} from 'react';

const LogContext = createContext('안녕하세요');

//Provider 사용부 예시
function App() {
  return (
    <NavigationContainer>
      <LogContext.Provider value="안녕하세요">
        <RootStack />
      </LogContext.Provider>
    </NavigationContainer>
  );
}

// Provider 공유값 사용 예시
function FeedsScreen() {
  return (
    <View style={styles.block}>
      <LogContext.Consumer>
        {(value) => <Text>{value}</Text>}
      </LogContext.Consumer>
    </View>
  );
}

```

---

## **children Props**

컴포넌트 태그 사이에 넣어준 값

```jsx
<Text>1</Text>

//위 예시로 보자면 1이 children Props이다
```

아래와 같이 별도의 태그를 넣어서도 사용이 가능하다.

```jsx
function FeedsScreen() {
  return (
    <View>
      <BoxCustom>
        <Text>1</Text>
      </BoxCustom>
      <BoxCustom>
        <Text>2</Text>
      </BoxCustom>
      <BoxCustom>
        <Text>3</Text>
      </BoxCustom>
    </View>
  );
}

function BoxCustom({children}) {
  return <View>{children}</View>;
}
```

---

## Render Props

위 children Props에서 타입을 **함수로 받아오는 패턴**.

Render Props는 Hooks가 없던 시절 유용했기에
요즘은 사용할 일이 그렇게 많지 않다.

```jsx
function FeedsScreen() {
  return (
    <View>
      <BoxCustom>{(value) => <Text>{value}</Text>}</BoxCustom>
    </View>
  );
}

function BoxCustom({children}) {
  return <View>{children('Hello World')}</View>;
}
```

---

## **6.2.3 Context에서 유동적인 값 다루기**

… 뭔가 이해가 어려움

---

**Props의 이름만 쓰고 따로 값을 지정하지 않으면 값이 true로 지정된다.**

```jsx
<TextInput
        placeholder="당신의 오늘을 기록해보세요"
        style={styles.bodyInput}
        multiline
        textAlignVertical="top"
        onChangeText={onChangeBody}
        value={body}
      />

//즉, 위 코드에서
//multiline 부분은 multiline={true}와 동일한 코드다.
```

---

## useRef

함수 컴포넌트에서 컴포넌트의 레퍼런스를 선택할 수 있게하는 Hook

<aside>
🤔 **레퍼런스?**

함수에서 사용가능한 props
ex) int 의 레퍼런스로는 .toString()

</aside>

예시

```jsx
// 적용 예시
function WriteEditor({title, body, onChangeTitle, onChangeBody}) {
  **const bodyRef = useRef()**

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.bodyInput}
        multiline
        **ref={bodyRef}**
      />
    </View>
  );
}

// 사용 예시
<TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleInput}
        onSubmitEditing={() => {
          **bodyRef.current.focus()**
        }}
      />
```

---

## UUID 라이브러리

UUID는 범용 고유 식별자(universally uniqute identifier)로서

표준으로 사용되는 고유 식별자 형식이다.

5가지 버전이 있는데, 일반적으로 랜덤하고 고유한 식별자를 생성할 때는 v4를 많이 사용한다.

예시

```jsx
import {v4} from 'uuid';
v4(); // '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

---

## **date-fns 라이브러리**

- 방금 전
- 3분 전
- 1시간 전
- 3일 전
- 2021년 8월 23일 07:00

위와 같이 작성한 시간에 따라 다양하게 보여줄 수 있는 
날짜 / 시간에 관한 다양한 기능을 제공하는 라이브러리.