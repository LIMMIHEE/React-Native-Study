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

```jsx
useEffect(() => {
  console.log('컴포넌트가 마운트될 때 출력됨');
  return () => {
    console.log('컴포넌트가 언마운트될 때 출력됨');
  }
}, [])
```

---

# 5장

## 리액트 내비게이션

리액트 네이티브에서는 여러 화면으로 구성된 앱을 만들기 위해서는

내비게이션 관련 라이브러리를 사용해야한다.

1. **react-navigation**
    
    리액트 네이티브 커뮤니티에서 관리하는 사용률 높은 라이브러리.
    
    공식에서도 해당 라이브러리를 구현 방법으로 소개하며
    기능은 자바 스크립트로 구현되어있다.
    이번에는 해당 라이브러리를 사용할 예정.
    
2. **react-native-navigation**
    
    Wix에서 관리하는 라이브러리
    
    이미 만들어진 네이티브 앱에 리액트를 적용할 때 사용하기 좋으며 
    기능이 자바 스크립트가 아닌 네이티브 코드들로 구현되어 있어 
    네이티브스러운 앱을 만들 수 있다.
    

## **react-navigation**

### 네이티브 스택 네비게이터

안드로이드에서는 Fragment, IOS에서는 UINavigationController를 

사용하여 구현되었으며 가장 흔히 사용되고 있다.

![예시 이미지](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e665f209-9b7d-4142-abf0-1a3b15c0bdd3/Untitled.png)

예시 이미지

리액트의 네이티브 스택 네비게이터는

createNativeStackNavigator를 가진 객체 이용해 제작한다.

해당 객체 안에는 아래와 같은 컴포넌트들이 들어있다.

- Navigator

→ NavigationContainer 컴포넌트 안에 넣어야 정상 작동을 한다.

    initialRouteName 파라미터를 통해 시작 화면을 설정할 수 있다.
    지정하지 않는다면 내비게이터 안에 들어있는 첫 번째 화면을 보여준다.
- Screen
→ 각 화면을 설정 할 수 있는 컴포넌트.

     name 파라미터로 화면의 이름을 설정하며
     해당 name을 통해 조회 및 이동을 진행한다.

선언 예시

```jsx
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

스크린으로 사용되는 컴포넌트는 

navigation 외 route라는 Props도 함께 받아오는데

이는 객체 타입이며 아래와 같은 정보를 가지고 있다.

- key : 화면의 고유 ID
새로운 화면이 나타날 때 자동으로 생성된다.
- name : 네이티브 스택 내비게이터를 설정할 때 지정한 이름
- params : 화면 전환 시 지정한 라우트 파라미터

예시

```jsx
{
  "key": "Detail-vgDx8-H-8e7oao6a3xJz7",
  "name": "Detail", 
  "params": {"id": 1}
}
```

### 스크린 이동

스크린 이동시에 사용할 수 있는 Props는 두 가지가 존재한다.

- navigate
→ 이동할 화면이 같으면 화면을 새로 쌓지 않고 파라미터만 변경
- push
→ 이동할 화면이 같아도 화면을 새로 쌓으며 진행
    **참고로 push는  스택 내비게이터 외에서는 사용이 불가능.**

```jsx
navigation.navigate('Detail')

// 혹은
navigation.push('Detail')
```

추가로 이동하며 의존해야하는 어떤 값이 있다면

**라우트 파라미터**를 설정할 수 있다.

```jsx
navigation.navigate('Detail', {id: 1})

// 1개 이상 담을 수도 있다.
navigation.push('Detail', {id: 2 , name: 'koko'})
```

### 뒤로가기

- push
→ 바로 이전 화면으로 뒤로가기
- popToTop
→ 가장 첫 번째 화면으로 이동

```jsx
navigation.pop()
navigation.popToTop()
```

### 헤더 커스터 마이징하기

더욱 자세한 것은 5.2.5 챕터 참고

1. options으로 설정하기

```jsx
<Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
          }}
        />
```

1. navigation.setOptions 으로 설정하기

```jsx
useEffect(() => {
    navigation.setOptions({title: '홈'});
  }, [navigation]);

// 비게이션 option은 App 컴포넌트에서 Props를 통해 설정한 option을 덮어씌운다.
```

위 예시를 보면 useEffect Hook을 이용하고 있으며 

현재 해당 deps( 두번째 파라미터 )에 바뀌지 않는 객체인 navigation을 넣었는데.

그 이유는 해당 객체는 바뀌지 않아도 ESLint(자바스크립트 검사 도구) 규칙상 useEffect 내부에 사용하는 값을 꼭 deps에 넣어야 하기 때문이다.

![헤더 위치 참고 이미지](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/14be7877-4fe4-4675-be4f-e43b05acbbb0/Untitled.png)

헤더 위치 참고 이미지

---

### **드로어 내비게이터**

좌측 또는 우측에 사이드바를 만들고 싶을 때 사용하는 내비게이터

createDrawerNavigator 로 Drawer 객체를 만들어 사용하는 방식으로

네이티브 스택 내비게이터를 사용했을 때와 사용법이 꽤 비슷하다. 

navigation.push(열기), navigation.pop(뒤로가기)는 해당 내비게이터와 호환되지 않으며

아래의 함수들을 사용한다.

- `navigation.openDrawer()`  화면 열기
- `navigation.goBack()` 화면 돌아가기
- `navigation.closeDrawer()`  드로어 (화면목록) 닫기

선언 예시

```jsx
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerPosition="left"
        backBehavior="history"
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Setting" component={SettingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

**파라미터 설명**

- drawerPosition : 드로어가 나타나는 위치를 정한다. 
                             left / right 중 택 1. 기본설정은 left.
- backBehavior : 뒤로가기를 할 때 어떻게 작동할지 설정한다.
    - initialRoute: 가장 첫 번째 화면을 보여준다.
    - order: Drawer.Screen 컴포넌트를 사용한 순서에 따라 현재 화면의 이전 화면을 보여준다.
    - history: 현재 화면을 열기 직전에 봤던 화면을 보여준다.
    - none: 뒤로가기를 수행하지 않는다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c39b28f-7719-4096-bc35-d0bbcafbc2c3/Untitled.png)

---

### **하단 탭 내비게이터**

이름 그대로 하단에 탭을 보여주는 내비게이터

탭을 이용해 이동하는 형식이므로 별도의 push, pop과 같은 함수는 없다.

```jsx
<NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Notification" component={NotificationScreen} />
        <Tab.Screen name="Message" component={MessageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/101a66ee-0298-4c5c-a436-ac2b0a977f42/Untitled.png)

---

### **머티리얼 상단 탭 내비게이터**

바로 위의 하단 탭 내비게이터와 유사하지만

해당 탭이 상단에 위치해있으며, ripple 효과가 적용된 내비게이터.

- ripple 효과는 안드로이드 5이상에서 나타나며 IOS는 미적용된다.

화면을 스와이프 형태로 전환할 수도 있다.

사용법 예시

```jsx
const Tab = createMaterialTopTabNavigator();

<Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={24} />
          ),
        }}
      />
</Tab.Navigator>
```

**Tab.Navigator 주요 Props**

- initialRouteName: 초기 화면의 이름
- screenOptions: 화면의 기본 설정. 
하단 탭 내비게이션과 비슷한데, 다음과 같은 추가 옵션이 있다.
    - swipeEnabled: 화면을 좌우로 스와이프하여 전환할 수 있게 한다(기본값: true).
    - lazy: 특정 탭으로 이동해야만 해당 탭을 렌더링 (기본값: true).
    - lazyPreloadDistance: lazy 속성이 활성화된 상태에서 몇 칸 뒤 화면을 미리 불러올지 설정한다(기본값: 0).
    - lazyPlaceholder: lazy 속성이 활성화되어 있을 때 아직 보이지 않은 화면에서 보여줄 대체 컴포넌트
    - tabBarIndicator: 활성화된 탭을 표시하는 컴포넌트
    - tabBarIndicatorStyle: 활성화된 탭을 표시하는 컴포넌트의 스타일
- backBehavior: 뒤로가기할 때의 작동 방식
- tabBarPosition: 탭 바의 위치(top 또는 bottom)
- keyboardDismissMode: 키보드를 숨기는 설정
    - auto: 기본값. 화면이 바뀔 때 키보드를 숨김.
    - on-drag 화면을 드래그할 때 키보드를 숨김.
    - none: 드래그해도 키보드를 숨기지 않음.
- sceneContainerStyle: 각 화면에 대한 스타일
- style: 전체 탭 뷰에 대한 스타일
- tabBar: 탭 바를 대체할 수 있는 컴포넌트

**Tab.Screen의 options Props**

- tabBarIcon: 아이콘을 보여주는 함수, { focused: boolean, color: string } 타입의 파라미터를 온다.
- tabBarLabel: 탭에서 보이는 이름

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f73b65c1-b9ba-44da-af40-cca9cb77fb4a/Untitled.png)

---

### **머티리얼 하단 탭 내비게이터**

상단에서 다룬 상탄 탭과 비슷하지만

이 내비게이터는 하단에만 나타나며 **탭에 따라 전체 탭의 배경색을 변경 가능**하다.

→ 또한 탭의 이름도 아이콘 하단에 나타난다.

이때 ripple효과도 함께 전환이 가능하며

탭을 활성화 시킬 때 아이콘이 상단으로 조금 움직인다.

사용법은 상단의 

`createMaterialTopTabNavigator`  대신`createMaterialBottomTabNavigator` 를 사용해주면 된다.

```jsx
const Tab = createMaterialBottomTabNavigator();
```

**Tab.Navigator 주요 Props**

- initialRouteName: 초기 화면의 이름
- screenOptions: 화면의 기본 설정
- backBehavior: 뒤로가기할 때의 작동 방식
- shifting: 이 값이 true로 지정되어 있으면 탭이 변경될 때마다 배경색을 변경하고, 활성화된 탭만 탭의 이름을 보여준다. 탭의 개수가 세 개 이상이면 이 값은 기본적으로 true로 설정되며 만약 이 값을 false로 지정하면 탭마다 배경색을 따로 따로 지정할 수 없고, 모든 탭에 이름이 보이게 된다.
- labeled: 탭 아이콘 하단에 탭의 이름을 나타낼지 정하는 값. 
이 값을 false로 지정하면 모든 탭에 이름이 나타나지 않는다(기본값: true).
- activeColor: 활성화된 탭의 아이콘과 텍스트의 색상
- inactiveColor: 비활성화된 탭의 아이콘과 텍스트의 색상
- barStyle: 탭 바에 스타일 적용

**Tab.Screen의 options Props**

- tabBarIcon: 아이콘을 보여주는 함수, { focused: boolean, color: string } 타입의 파라미터를 받아온다.
- tabBarLabel: 탭에 보이는 이름
- tabBarBadge: 탭 아이콘에 배지를 보여준다. 
이 값을 true로 설정하면 아이콘 우측 상단에 빨간색 점을 보여준다. 
이 값을 문자열 또는 숫자로 입력하면 그 내용이 배지에 나타난다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b24d32ed-8888-4a9e-8162-9c34726bdb00/Untitled.png)

---

### nullish 병합 연산자

연산자 좌측에 있는 값이 null이거나 undefined면 우측의 값으로 설정한다.

```jsx
const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
```

---

## **내비게이션 Hooks**

Screen으로 사용 중인 컴포넌트에서는 Props를 통해 navigation 또는 route 객체를 사용할 수 있다. 

하지만 Screen으로 사용되지 않는 다른 컴포넌트에서는 navigation 또는 route를 

Props로 받아와서 사용할 수 없다.

제한을 우회하는 방법 중 3가지는 아래와 같다.

1. **Function 형식으로 Props를 받아오기  ( non Hooks )**

```jsx
function OpenDetailButton({onPress}) {
  return <Button title="Detail 1 열기" onPress={onPress} />;
}

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <OpenDetailButton onPress={() => navigation.push('Detail', {id: 1})} />
    </View>
  );
}
```

1. **Props로 navigation 객체를 바로 넘겨주기 ( non Hooks )**

```jsx
function OpenDetailButton({navigation}) {
  return (
    <Button
      title="Detail 1 열기"
      onPress={() => navigation.push('Detail', {id: 1})}
    />
  );
}

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
        <OpenDetailButton navigation={navigation} />
    </View>
  );
}
```

 

1. **useNavigation Hook 사용하기**

> **useNavigation Hook 이란?**
> 

해당 Hook을 사용하면 Screen으로 사용되고 있지 않은 컴포넌트에서도

상위에서 Props를 받아 사용하지 않아도 **navigation 객체**를 사용할 수 있도록 해준다.

사용 예시

```jsx
import {
    useNavigation,
} from '@react-navigation/native';

(...)

function OpenDetailButton() {
  const navigation = useNavigation();

  return (
    <Button
      title="Detail 1 열기"
      onPress={() => navigation.push('Detail', {id: 1})}
    />
  );
}

function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
      <OpenDetailButton />
    </View>
  );
}
```

1. **useRoute Hook 사용하기**

> **useRoute Hook 이란?**
> 

useNavigation와 비슷하지만 Screen이 아닌 컴포넌트에서

**route객체** 를 사용할 수 있게 해준다.

사용 예시

```jsx
import {useRoute} from '@react-navigation/native';

function IDText() {
  const route = useRoute();
  return <Text style={styles.text}>id: {route.params.id}</Text>;
}

function DetailScreen({route, navigation}) {
  useEffect(() => {
    navigation.setOptions({
      title: `상세 정보 - ${route.params.id}`,
    });
  }, [navigation, route.params.id]);
  return (
    <View style={styles.block}>
      <IDText />
        <View style={styles.buttons}>
          <Button
            title="다음"
            onPress={() => navigation.push('Detail', {id: route.params.id + 1})}
          />
          <Button title="뒤로가기" onPress={() => navigation.pop()} />
          <Button title="처음으로" onPress={() => navigation.popToTop()} />
        </View>
      </View>
    );
  }
```

1. **useFocusEffect Hook 사용하기**

> **useFocusEffect Hook 이란?**
> 

화면에 포커스가 잡히면 특정 작업을 할 수있는 Hook.

ex) 만약 HomeScreen에서 DetailScreen을 띄운다면 
       HomeScreen이 화면에서 사라지는 게 아니라, HomeScreen 위에 DetailScreen을 쌓아서 보여주는 것

useFocusEffect 기초가 되는  **useEffect**에 대해 먼저 알아보자

해당 useEffect Hook을 통해서 컴포넌트가 마운트되거나 언마운트될 때 

콘솔에 텍스트를 출력한다면 DetailScreen을 띄울 때 컴포넌트가 언마운트되지 않고

뒤로가기하여 HomeScreen으로 돌아왔을 때 컴포넌트가 마운트되지 않는 것을 확인할 수 있다.

사용 예시

```jsx
import React, {useEffect} from 'react';

(...)

function HomeScreen() {
  useEffect(() => {
    console.log('mounted');
    return () => {
      console.log('unmounted');
    };
  }, []);

  return (
    <View>
      <Text>Home</Text>
        <OpenDetailButton />
    </View>
  );
}
```

* OpenDetailButton은 useNavigation Hook 예시에서 만든 버튼.

> **useFocusEffect Hook**
> 

해당 Hook 사용에서 주의해야 할 것은 

useCallback을 사용하지 않으면 컴포넌트가 리렌더링될 때마다 useFocusEffect에 등록한 함수가 호출되므로

useFocusEffect는 꼭 useCallback과 같이 사용해야한다는 것이다.

> **useCallback ?**
> 

useCallback은 컴포넌트 내부에서 함수를 만들 때

새로 만든 함수를 사용하지 않고 이전에 만든 함수를 다시 사용하도록 만들어준다. 

그리고 그 함수 내부의 로직에서 의존하는 값이 있다면 

의존하는 값이 바뀌었을 때 함수를 교체할 수 있도록 해주는 Hook이다.

사용 예시

```jsx
import React, {useEffect, useCallback} from 'react';
import {
    useNavigation,
    useFocusEffect,
} from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

function OpenDetailButton() {
  const navigation = useNavigation();

  return (
    <Button
      title="Detail 1 열기"
      onPress={() => navigation.push('Detail', {id: 1})}
    />
  );
}

function HomeScreen() {
  useFocusEffect(
    useCallback(() => {
      console.log('이 화면을 보고 있어요.');
      return () => {
        console.log('다른 화면으로 넘어갔어요.');
      };
    }, []),
  );

  return (
    <View>
      <Text>Home</Text>
      <OpenDetailButton />
    </View>
  );
}
```

---