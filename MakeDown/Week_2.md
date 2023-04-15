# Week2

## 불변성

리액트에서 객체와 배열 타입의 상태를 다룰 때는 해당 불변성을 지켜야한다.

이때 불변성이란? 

객체 또는 **배열을 직접 수정하지 않는 것을 의미**한다.

- 기존 객체를 두고, 새로운 객체를 만들어 값을 덮어씌워야한다.

직접 수정 예시

```jsx
info.name = "koko";
```

불변성을 지킨 예시

```jsx
const nextInfo = {
	...info,
	name: "koko"
}
```

> 불변성을 지킨 예시에서 쓰인 **…은 뭘까?**
> 

```jsx
...{객체} 
```

위 형태를 가진 코드는 spread 연산자 문법이다. 

info 객체가 지닌 값들을 새로 만드는 객체에 
가져다 쓴다고 보면 된다.

---

### 불변성은 왜 지켜야 할까?

이유는 렌더링 성능 최적화 방식 때문이다.

리액트는 부모 컴포넌트가 리덴더링되면 자식들도 함께 리렌더링 되기 때문.

물론 불필요한 컴포넌트가 리렌더링 되더라도 일반적으로는 성능 부하가 거의 없지만

→ 리액트는 기존과 새 UI에서 차이가 있으면 보이는 부분만 
    건드리고 나머지는 기존 UI를 그대로 유지하기 때문.

사용하는 데이터가 많아지거나 연산이 늘어나면

컴포넌트에 정말 변화가 발생했을 때만 리렌더링하도록 최적화하도록 하는 것이 좋다.

이때 사용되는 것이 바로 **Props.**

Props 알아보기 → [Props](https://www.notion.so/Props-2680d5afdae843cf85ae41c32470aeb5) 

---

### 배열의 불변성 지키는 법

**항목 추가하기**

1. spread 연산자 사용하기

```jsx
const numbers = [0, 1, 2, 3];
const nextNumbers = [...numbers, 4];
```

💡 spread 연산자는 객체뿐만 아니라 배열에서도 사용할 수 있다.
     중복사용 ( [...numbers, ...numbers] ) 도 가능

1. 내장 함수 사용하기

```jsx
const numbers = [0, 1, 2, 3];
const nextNumbers = numbers.concat(4);

// 여러개 넣기도 가능
const nextNumbers2 = numbers.concat([4,5,6]);
```

**항목 제거하기**

제거하는 방법도 다양하지만 추천하는 방법은 

내장 함수인 filter 사용하기.

이때 filter 함수에 대해 더욱 알아보면

- 특정 조건을 만족하는 원소로 이루어진 새로운 배열을
대신 만들어준다.

```jsx
const numbers = [-3, -2, -1, 0, 1, 2, 3];
const nextNumbers = numbers.filter(number => number !== 0);
// [-3, -2, -1, 1, 2, 3]
```

객체로 이루어진 배열에서 사용하는 예시

```jsx
const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
const nextItems = items.filter(item => item.id !== 3);
// [{ id: 1 }, { id: 2 }, { id: 4 }]
```

**항목 수정하기**

가장 추천하는 방법은 내장 함수 map 사용하기

이때 Map 함수에 대해 더욱 알아보면

- 특정 함수를 사용해 배열의 모든 원소에 변화를 주어 
새로운 배열을 만들 때 사용.
- 기본적으로 배열 안 모든 값에 영향을 주지만
조건부로 처리하면 원하는 값에만 변화주기 가능.

```jsx
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number * 2);
 // [2, 4, 6, 8, 10]
```

---

### **4.2 메모**

> **List 컴포넌트 사용시 주의**
> 
- List 렌더링 시에는 **문자열의 고유값이 있어야**한다.
    - 해당 고유값 비존재 시 항목 순서 값인 index 사용.
    
    → 이 경우 배열 내부에 변동사항이 생기면 UI를 비효율적으로 업데이트. ( 성능에 안 좋음 )

renderItem

→ 배열 안의 각 원소들 데이터를 가리키는 뷰 지정.

keyExtractor 

→ 각 항목의 고유 값을 추출해주는 함수

```jsx
<FlatList
            style = {styles.list}
            data={todos}
            renderItem={({item})=>{
                <View>
                    <Text>{item.Text}</Text>
                </View>
            }}         
            keyExtractor={item => item.id.toString()}
        />
```

---

### 4.4 메모

```dart
const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false
    }

    setTodos(todos.concat(todo));
```

이때 `concat` 는 

List.add 와 같은 역활을 하는 결합 함수이다.

---

### 4.6 메모

> **AsyncStorage**
> 

리액트 네이티브에서 사용할 수 있는 **key-value 형식의 비정기적 저장소**.

- iOS에서는 네이티브 코드, 안드로이드에서는 네이티브 코드와 SQLite를 기반으로 구현되어 있다.

AsyncStorage에서 다루는 데이터의 규모가 커지면 

성능이 떨어지니 주의 할 것, 따라서 소규모 데이터를 다룰 때 사용하는 것이 좋다.

참고로 안드로이드에서 AsyncStorage의 최대 크기는 기본적으로 6MB이다, 별도로 크기 늘리기도 가능은 하다. (최대10MB)

만약 규모가 커졌을 경우에는 아래를 사용하는 것을 추천.

- realm
- eact-native-sqlite-storage

**기본 사용법**

1. 불러오기

```jsx
import AsyncStorage from '@react-native-community/async-storage';
```

1. 저장하기

값을 저장할 때는 setItem을 사용하며
저장될 값은 문자열 타입이어야한다.

만약 객체 및 배열 타입을 저장하려면 
JSON.stringify 함수를 사용해야 한다.

```jsx
const save = async () => {
  try {
    await AsyncStorage.setItem('key', 'value');
  } catch (e) {
    // 오류 예외 처리
  }
}

// 객체 저장 예시
await AsyncStorage.setItem('todos', JSON.stringify(todos));
```

1. 불러오기

값을 불러올 때는 getItem을 사용한다

객체 및 배열을 불러오려면 JSON.parse 함수를 사용해 
문자열을 JSON으로 변환한다.

```jsx
const load = async () => {
  try {
    const value = await AsyncStorage.getItem('key');
    // value를 사용하는 코드
  } catch (e) {
    // 오류 예외 처리
  }
}

// 객체 변환 예시
const rawTodos = await AsyncStorage.getItem('todos');
const todos = JSON.parse(rawTodos);
```

1. 초기화하기

AsyncStorage에 있는 모든 값을 초기화 한다면
clear 메서드를 사용한다.

```jsx
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // 오류 예외 처리
  }
}
```

이외 메소드는 아래 링크 참조

• **[https://bit.ly/async-storage-docs](https://bit.ly/async-storage-docs)**

---

### **Promise**

자바스크립트에서 비동기적 작업을 편하게 관리하도록 도와주는 객체

Promise를 만들 때는 

resolve과 reject를 파라미터로 받는 함수를 인자로 넣는다.

- 이때 resolve와 reject는 둘 다 함수 타입이며

resolve는 성공했을 때 호출 할 함수
reject은 실패했을 때 호출 할 함수이다.

예시

```jsx
const promise = new Promise((resolve, reject) => {
  // ...
})
```

### async와 await

async와 await라는 키워드는 Promise를 더욱 쉽게 사용할 수 있게 해준다.

해당 키워드를 사용하기 위해서는 아래와 같은 규칙이 필요하다.

- 함수 선언할 때 앞 부분에 async 붙이기
- Promise 앞부분에 awit 사용하기

사용 예시

```jsx
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function process() {
  console.log('안녕하세요!');
  await sleep(1000); 
  console.log('반갑습니다!');
}
```

+ 해당 키워드들을 사용할 때 예외 처리하려면 try/catch 구문을 사용해야 한다.

예외처리 예시

```jsx
async function process() {
  try {
    await double(null);
  } catch (e) {
    console.error(e);
  }
}
```

<aside>
💡 **동기적 작업? 비동기적 작업?**

</aside>

**동기적 작업**
→ 특정 작업이 끝날 때까지 대기하다가 
    기존 작업이 끝나면 다음 작업을 시작

비**동기적 작업**
→ 특정 작업이 끝나지 않아도 다음 작업을 수행

---

### useEffect

Hook 함수 중 하나.

해당 함수를 사용하면 컴포넌트에서 

특정 상태가 바뀔 때마다 원하는 코드를 실행할 수 있고

마운트 / 언마운트 상태에서 따라서도 원하는 코드를 실행할 수 있다.

- 마운트 : 가장 처음 화면에 나타남
- 언마운트 : 화면에서 컴포넌트가 사라짐

첫번째 인자에서는 상태가 변환될 때 호출하고 싶은 함수를.

- 단, 해당 함수는 async 키워드가 붙을 수 없다. (충돌발생)

두번째 인자에서는 주시하고 싶은 값을 배열안에 넣으면 된다.

**useEffect는 등록된 순서대로 작동한다.**

예시

```jsx
useEffect(() => {
    // 함수 액션
 }, [//주시할 값]);
```

컴포넌트 마운트 또는 언마운트 시 특정 작업을 하고 싶다면 

useEffect의 두 번째 파라미터에 비어있는 배열을 사용하면 된다.

- **이는 배열이 비어있으면 컴포넌트가 마운트될 때 
딱 한 번만 함수를 호출하기 때문.**