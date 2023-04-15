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

### 4.4파트 메모

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