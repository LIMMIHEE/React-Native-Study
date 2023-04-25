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