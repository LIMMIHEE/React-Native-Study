# 리액트 네이티브 정리

# Day1

20230409 / 3장까지

### **컴포넌트란?**

> UI를 구성하는 요소.
> 

리액트로 개발할때는 해당 컴포넌트를 많이 만들어 진행한다. 

단, 컴포넌트는 단순 UI뿐 만이 아닌 액션(사용자가 취한 행동)에 대한 작업도 설정할 수 있다.

컴포넌트를 사용할 때는 사용할 컴포넌트를 import 해야한다.

대표적인 컴포넌트들은 아래와 같다.

- View
    - 가장 기본적인 컴포넌트로 레이아웃 및 스타일 담당
- Text
    - 텍스트 보여주는 역활

---

### 나만의 컴포넌트 만들기

**함수형 컴포넌트**

함수로 선언한 컴포넌트는 XML 형태로 이룬 내용을 반환하며, 이 문법을 **JSX**라고 부른다.

JSX = JavaScript+XML

선언 예시

```jsx
import React from 'react';
import {View,Text} from 'react-native';

function Greeting() {
 return (
    <View>
        <Text>안녕하세요 함수 컴포넌트</Text>
    </View>
 );
}

export default Greeting;  // 해당 코드는 다른 파일에서 컴포넌트를 부를 수 있게 해준다.
```

사용 예시

```jsx
import React from 'react';
import {View,Text} from 'react-native';
import Greeting from 'Greeting 존재하는 파일 위치';

const App = () =>{
     return (
         <SafeAreaView>
	         <Greeting/>
         </SafeAreaView>
     );
 }
```

---

## Props

> **props란?**
> 

properties의 줄임말

컴포넌트의 속성을 이야기한다.
props 사용시 컴포넌트를 사용할 때 임의의 값을 넣어줄 수 있다.

선언 예시

```jsx
function Greeting(props) {
 return (
    <View>
        <Text>안녕하세요 {props.name}!</Text>
    </View>
 );   
}

function Greeting({name, info}) { // props 해당 방식으로도 보낼 수 있다.
 return (
    <View>
        <Text>안녕하세요 {name}! 정보는 {info}!</Text>
    </View>
 );   
}
```

호출 예시

```jsx
const App = () =>{
       return (
            <SafeAreaView>
	            <Greeting name="Props"/>
            </SafeAreaView>
       );
}
```

<aside>
💡 **JSX에서는 자바 스크립트 표현식을 보여줘야 할 때는 중괄호로 감싸 사용한다.**

ex → {name}

</aside>

### defaultProps

> **defaultProps란?**
> 

컴포넌트에 Props을 지정하지 않아도 기본 값을 설정할 수 있도록 해준다.

사용 예시

```jsx
function Greeting(props) {
 return (
    <View>
        <Text>안녕하세요 {props.name}!</Text>
    </View>
 );   
}

Greeting.defaultProps = {
    name : "리액트 네이티브"
};
```

---

## JSX 문법

1. **태그를 열면 반드시 닫기** 

2. **스스로 닫는 태그 <Greeting/> 사용하기**
해당 태그는 여는 태그와 닫는 태그 사이에 별도로 넣을 내용이 없을 시 사용해야한다.

3. **반환할 때는 꼭 하나의 태그로 감싸기**
아래와 같이 반환을 할 때에 return 하는 태그가 1가지가 아니라면 에러가 발생한다.

에러 발생 예시

```jsx
return (
    <View>
        <Text>안녕하세요 {props.name}!</Text>
    </View>
    <Text>추가 문자!</Text>
 ); 

//반환하는 태그가 <View>, <Text>로 두 가지다.
```

이때, 이를 해결하기 위해서는 2가지 방법이 있다.

- 새로운 View 컴포넌트로 감싸 반환
- 빈 태그를 사용해 반환

```jsx
// 빈 태그 사용 예시
return (
     <>
      <View>
          <Text>안녕하세요 {props.name}!</Text>
       </View>
       <Text>추가 문자!</Text>
     </>
 );
```

1. **JSX 안에서 자바 스크립트 표현식 사용시에는 중괄호 사용하기**
   → 상단에서 설명하고 있다.
 [**JSX에서는 자바 스크립트 표현식을 보여줘야 할 때는 중괄호로 감싸 사용한다.**

ex → {name} ](https://www.notion.so/JSX-ex-name-58988baf6f9c4f3f8f0b19552d84c9d0) 

---

### 주석 사용 방법

JSX에서 주석 작성하고 싶다면 아래 두 가지 방법이 존재한다.

1. {*/ 주석 작성하기 /*}
2. // ← 사용하여 작성.
다만 해당 주석의 경우 여는 태그 혹은 스스로 닫는 태그에서만 사용이 가능하며
해당 주석 작성 후 꼭 새 줄을 입력해줘야 한다.

---

### 스타일 시트 사용 방법

리액트 네이티브는 CSS에서 스타일을 작성하지 않고
**자바 스크립트 파일 안에 StyleSheet를 만들어 사용**한다, 이때 기존 CSS와의 차이점도 있다.

> **CSS와의 차이점**
> 
- 셀렉터 개념 존재하지 않음
- 모든 스타일 속성은 camelCase
- display 속성은 기본 flex, 다른 값은 none 뿐이다.
- flexDirection 속성의 기본 값은 column
- 스타일링 단위는 dp뿐.
- background 대신 backgroundColor 사용해야한다.
- border 대신 borderWidth, borderStyle, borderColor 등 따로 설정해야한다.

선언 코드 예시

```jsx
const styles = StyleSheet.create({
    container : {
        color:'white'
    },
    title:{
        fontSize:24
    },
     box:{
         width: 64,
         backgroundColor: 'black'
     }
});
```

적용 예시

```jsx
function Box() {
 return (
    <View style = {styles.box} />;
 )   
}

// 스타일 중복 적용 예시
function Box() {
 return (
    <View style = {[styles.box, styles.title]} />;
 )   
}

/////////////////////////////

//조건식도 사용 가능하다.
function Box() {
 return (
    <View style = {[styles.box, props.title ? styles.title : null]} />;
 )   
}

//해당 삼항 연산자를 줄이는 방법도 아래와 같이 존재
function Box() {
 return (
   <View style = {[styles.box, props.title && styles.title]} />;
 )   
}

//조건식이 들어있는 컴포넌트 사용 예시는 아래와 같다
// <Box title={true}/>

```

**+ 별도로 조건부 렌더링도 가능하다.**

```jsx
const visible = true;

return (
    <View>
        <Text>안녕하세요!</Text>
        { visible ? <Box/> : null }
    </View>
);

//위 조건부 렌더링도 아래와 같이 줄일 수 있다
return (
    <View>
        <Text>안녕하세요!</Text>
				 { visible && <Box/> }
    </View>
);

```

---

## 비구조화 할당

자바스크립트 문법을 사용해 비구조화 할당을 사용이 가능하다.

> 객체 구조 분해 할당
> 

```jsx
const object = {
    a:1,
    b:2,
    c:3
}

const a = object.a;
const b = object.b;
const c = object.c;

// 사용 O 예시
const object = {
    a:1,
    b:2,
    c:3
}

const {a,b,c} = object;
```

> 배열 구조 분해 할당
> 

```jsx
const people = ['Arica','Sena','Koko'];

const arica = people[0];
const sena = people[1];
const koko = people[2];

// 사용 O 예시
const people = ['Arica','Sena','Koko'];
const [arica ,sena, koko] = people;
```

---

## Hook

리액트에는 **use로 시작하는 다양한 함수**가 존재하는데, 이것들을 Hook이라 부른다.
Hook을 이용하여 상태관리, 최적화, 컴포넌트 작동 등 다양한 기능을 구현 가능하다.

> **Hook의 규칙**
> 

1. **컴포넌트 최상위 레벨에서만 사용되어야 한다.**

조건문이나 반복문, 중첩 함수에서 호출하면 안된다.
만약 함수 중간에 리턴이 존재한다면 Hook은 함수가 리턴되기 전에 사용되어야 한다.

2. **Hook은 커스텀 훅 또는 함수 컴포넌트에서만 사용할 수 있다.**

클래스에서는 사용이 불가능
리액트와 관련없는 일반 자바스크립트 함수에서 사용하면 오류가 발생한다.

* 커스텀 훅이란 여러 Hook을 사용하여 직접 만든 Hook을 이야기한다.

> **useState**
> 

상태값을 관리하는 함수, 리액트에서 상태를 관리하는 기본적인 방법이다.

예시

```jsx
import React, {useState} from 'react'; 

const App = () => {
    const [visible, setVisible] = useState(true);
}
```

useState가 호출되면 두가지 원소가 들어있는 배열이 반환되는데

배열의 첫번째 원소에는 상태값, 두번째에는 상태를 업데이트하는 함수가 들어있다.

즉, 위 코드에서

visible은 상태 값, setVisible은 상태 값을 변경할 수 있는 함수를 가르킨다.

**useState 함수에 넣은 파라미터는 상태의 초기값이다.**

위 예시는 Boolean 형태지만 숫자, 객체, 배열등 다양한 형태를 가진 상태관리가 가능하다.

+ 예시 코드에서 사용한 문법은 배열 구조 분해 할당.