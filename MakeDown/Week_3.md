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