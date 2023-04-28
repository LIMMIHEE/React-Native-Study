## text.includes

문자열 내장 함수.

텍스트에 특정 문자가 존재하는지 확인한다.

- 존재하면 true를, 존재하지 않는다면 false를 반환한다.

```jsx
text.includes(keyword)
```

---

### some

배열 내장 함수.

배열 원소 중 특정 조건이 true인 원소가 **하나라도 있으면 true 반환,모든 원소가 만족하지 않으면 false 반환**

```jsx
const numbers = [1, 2, 3, 4, 5];

numbers.some(number => number > 6); 
  // 모든 원소에 대해 위 함수를 돌려보고, 
  // 만족하는 원소가 하나도 없어서 false 반환

numbers.some(number => number > 1);
  // 2가 1보다 크기 때문에 true 반환
  // 2 이후의 원소들은 함수를 돌려보지 않음
```

---

## 달력 기능 사용

달력 기능을 사용하기 위해서 

react-native-calendars라는 라이브러리를 설치해야한다.

설치 후에는 CalendarView 컴포넌트를 통해 달력 표시가 가능하다.

사용 예시

```jsx
import {Calendar} from 'react-native-calendars';

function CalendarView() {
  return <Calendar style={styles.calendar} />;
}
```

### 달력에 표시(mark) 하고 싶을때

`markedDates` props를 통해 구현이 가능하며

특정 Map 형식으로 관련 데이터를 넘겨주면 된다.

Map 형식

```jsx
const 변수명 = {
    'yyyy-MM-dd': {
      selected: true,
    },
}
```

**이때 날짜 형식에 주의할 것!!!!**

yyyy-mm-dd ← 라 적으면 에러가 난다… ;-)

실제 예시

```jsx
function CalendarView() {
  const markedDates = {
    '2021-05-17': {
      selected: true,
    },
    '2021-05-18': {
      marked: true,
    },
  };
  return (
    <Calendar
      markedDates={markedDates}
    />
  );
}
```

마크 표시 색상은 theme Props를 통해 변경할 수 있다.

```jsx
return <Calendar style={styles.calendar} 
            markedDates={markedDates}
            theme={{
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: '#009688',
            }}/>;
```

---

### reduce

배열의 내장 함수.

배열 안 값을 연산해 하나의 값으로 도출할 때 사용.

두 개의 파라미터를 입력해야한다.

1. 배열의 원소를 이용해 **연산하는 함수**

함수는 아래와 같은 형태이다.
    
    ```jsx
    (acc,current) => {
    	return 계산식;
    }
    
    //acc : 누적 값
    //current : 현재 처리 중인 값
    ```
    
    이때, 돌려주는 값은 숫자가 아니어도 괜찮다.
    ex) Map 형태, List 형태도 OK
    
2. **초기값**

사용 예시

```jsx
const array = [1,2,3,4,5];
const sum = array.reduce((acc,current) => {
	return acc+cureent;
},0);
```

---

## useMemo

메모이제이션(memoization)을 할 수 있는 Hook.

<aside>
🤔 **메모이제이션?**

동일한 계산을 반복해야할 때 이전 값을 메모리에 저장함으로 동일한 계산의 반복 수행을 제거하여 실행 속도를 빠르도록 만들어준다.

</aside>

사용법

```jsx
const value = useMemo(() => compute(a,b), [a,b]);
```

**각 파라미터의 의미**

1번째 : 어떻게 연산할지 정의하는 함수를 넣어준다.

2번째 : deps 배열을 넣어준다. 

**두 번째 배열안에 넣은 내용이 바뀌면 등록한 함수로 값을 연산해주는 형식.**

 

---

### useReducer

상태를 관리할 수 있는 또다른 Hook.

현재 상태와 액션 객체를 받아 새로운 객체로 반환해준다.

**useState를 여러 번 사용하는 상황에 사용하면 유용할 수있다.**

→ 유용할 수도 있다, 즉 아닐 수도 있다는 것으로 
굳이 해당 Hook을 사용하지 않고 상황에 따라 편하게 사용하면된다.

장점으로는 상태 업데이트 로직을 컴포넌트 밖에서 구현할 수 있다는 점이다.

- dispatch로 다양하게 업데이트 할 수 있어 Context와 함께 사용하면 유용하다.

해당 함수 사용시 아래 개념이 사용된다.

- state: 상태
- action: 변화를 정의하는 객체
- reducer: state와 action을 파라미터로 받아 
                다음 상태 반환하는 함수
- dispatch: action을 발생 함수

기본구조

```jsx
function **reducer**(state, action) {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState;
}
```

사용법

```jsx
const [state, dispatch] = useReducer(**reducer**, initialState);
```

**useReducer 파라미터**

첫번째 인자 → [reducer](https://www.notion.so/Week4-da9452dfa852495a9d557e1476f61600) 함수를 넣는다.

두번째 인자 → 상태의 초기 값을 넣는다.

예제

```jsx
const initialState = {value: 1};

function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return {value: state.value + action.diff};
    case 'decrease':
      return {value: state.value - action.diff};
    default:
      throw new Error('Unhandled action type');
  }
}

function Counter() {
  const [state, dispatch] = **useReducer(reducer, initialState);**
  const onIncrease = () => dispatch({type: 'increase', diff: 1});
  const onDecrease = () => dispatch({type: 'decrease', diff: 1});

  return (...)
}
```

**dispatch 사용 및 동작 설명** 

아래에서 onIncrease함수를 예시로 하자.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return {value: state.value + action.diff};
    case 'decrease':
      return {value: state.value - action.diff};
    default:
      throw new Error('Unhandled action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onIncrease = () => dispatch({type: 'increase', diff: 1});
  const onDecrease = () => dispatch({type: 'decrease', diff: 1});

  return (...)
}
```

위와 같이 객체를 인자에 넣어 **dispatch 함수를 호출하면 reducer함수가 호출** 된다.

이때, state는 현재 상태를 가르키며 action은 dispatch로 넘어온 인자로 넣은 객체를 가르킨다.

reducder에서 반환한 값이 다음 업데이트 값으로 사용된다.

---

### IIFE 패턴

= IIFE, Immediately-Invoked Function Expression

즉시실행함수 표현식를 뜻한다.

자세한 내용은 아래 블로그 참조

[JavaScript // 패턴 // IIFE](https://moonscode.tistory.com/12)

기본 형식 

```jsx
(function () {
    // TODO    
})()
```

사용 예시

```jsx
// 즉시호출함수
(function foo () {})(

);

alert(foo); // 실패, 사유: 즉시호출함수 이기에 별도로 불러와 사용이 불가하다.
```