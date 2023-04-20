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

- 레퍼런스 선택 외에 특정 값을 컴포넌트 생성 시에 설정하고, 컴포넌트가 사라질 때까지 재사용하고 싶은 경우에도 사용이 가능하다.

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

---

## Animated

리액트에서 애니메이션을 구현할때는 Animated객체를 사용한다.

사용시에 Animated Value가 먼저 선언되어야 하며
해당 Value를 만들때에는 useRef가 사용되어야 한다.

- 생성자 함수의 인자는 초기값을 가지도록한다.

```jsx
import React, {useRef} from 'react';
import {Animated} from 'react-native'

function Sample() {
  const animation = useRef(new **Animated.Value**(1)).current;
}
```

Animated 뒤에 사용하고 싶은 리액트 네이티브 컴포넌트의 이름을 넣어주어 사용이 가능하다.

```jsx
// 사용
<Animated.View style={{opacity: animation}}></Animated.View>
```

### Animated.timing

애니메이션 값을 변경할때 사용하는 함수.

**아래 값은 필수적으로 설정**해주어야 한다.

- **toValue**  : 어떤 값으로 변경할지
- **useNativeDriver :** 네이티브 드라이버 사용 여부

<aside>
🤔 **네이티브 드라이버?**

애니메이션 처리 작업을 자바스크립트가 아닌 네이티브에서 진행하도록 하는 옵션.

transform, opacity처럼 레이아웃과 관련없는 스타일에만 적용할 수 있다.
→ left, width, paddingLeft, marginLeft은 설정 적용 불가능하기에 false 처리를 해야한다.

</aside>

애니매이션은 .start() 함수로 시작하고, 해당 함수에 콜백을 넣어주면 종료시에 호출할 수 있다.

**설정 예시**

```jsx
Animated.timing(animation, {
  toValue: 0, // 어떤 값으로 변경할지 - 필수
  duration: 1000, // 애니메이션에 걸리는 시간(밀리세컨드) - 기본값: 500
  delay: 0, // 딜레이 이후 애니메이션 시작 - 기본값: 0
  useNativeDriver: true, // 네이티브 드라이버 사용 여부 - 필수
  isInteraction: true, // 사용자 인터랙션에 의해 시작한 애니메이션인지 지정 - 기본값: true
  // 애니메이션 속도 변경 함수 - 기본값: Easing.inOut(Easing.ease)
  easing: Easing.inOut(Easing.ease), 
}).start(() => {
  // 애니메이션 처리 완료 후 실행할 작업
})
```

### Animated.spring

timing과 비슷하지만 서서히 변하는 것이 아닌

스프링과 같이 값이 통통 튀는 효과며 변한다.

숫자로 예시를 들자면 아래와같다.

ex) 0 → 1.2 → 0.9 → 1.1 → 1

사용 예시

```jsx
Animated.spring(animation, {
    toValue: hidden ? 1 : 0,
    useNativeDriver: true,
    tension: 45,
    friction: 5,
  }).start();
```

다음과 같은 옵션을 설정해줄 수 있다.

- tension: 강도(기본값: 40)
- friction: 감속(기본값: 7)
- speed: 속도(기본값: 12)
- bounciness: 탄력성(기본값: 8)

---