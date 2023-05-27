# 기타 정리

# Hook

## useQuery

기본적으로 컴포넌트가 렌더링되는 시점에 자동 요청.

- 따로 비활성화 옵션 설정 가능
- 주로 데이터 조회 시에 사용한다.
( SQL의 select 느낌 )

해당 Hook을 사용할 때는 2가지 개념을 알아야한다.

1. **queryKey**
→ useQuery마다 부여되는 고유 Key 값, 해당 Key값으로 데이터를 캐싱한다.

문자열로도 사용 가능하고 배열로도 사용 가능하다.
이때, 배열에 순서에 따라서도 다른 Key값을 가지니 주의.

ex) [ 1, 2 ] != [ 2,1 ] ← 이 둘의 queryKey는 다르다.

    
    ```jsx
    // 문자열
    const res = useQuery('persons', queryFn);
    
    // 단순 배열
    const res = useQuery(['persons', 'add Id'], queryFn);
    
    // 복합 배열
    const res = useQuery(['persons', {type: 'add', name: 'Id'}], queryFn);
    ```
    
    <aside>
    💡 **queryKey의 역활
    
    → 캐싱을 관리할 수 있도록 도와주는 역활.**
    
    아래의 예시 코드를 보면 같은 queryKey를 이용해 데이터를 조회하려한다.
    
    이때, 일반적으로 2개의 요청이 진행되지만
    실질적으로 서버에는 1개의 요청만이 전달된다.
    
    **WHY?**
    
    그 이유는 ****res1에서 요청을 서버에 전달하면 이미 res2에는 
    동일한 queryKey에 대한 결과값을 가지고 있기 때문이다.
    
    예시코드
    
    ```jsx
    const Query = (){
        const getPersons1 = () => {
            const res1 = useQuery(['persons'], queryFn1);
        }
        
        const getPersons2 = () => {
            const res2 = useQuery(['persons'], queryFn2);
        }
    
        return (
            <div>
                {getPersons1()}
                {getPersons2()}
            </div>
        )
    }
    ```
    
    </aside>
    

1. **queryFn

→ Promise 처리가 이루어지는 함수**
     더 쉽게 이야기 하자면 서버에 API 요청하는 코드

컴포넌트가 렌더링될 때 해당 함수를 호출하고, 이에 대한 상태가 관리된다.

예시 코드
    
    ```jsx
    // 1
    const res = useQuery(['persons'], () => axios.get('http://localhost:8080/persons'));
    
    // 2
    const res = useQuery({
        queryKey: ['persons'],
        queryFn: () => axios.get('http://localhost:8080/persons')
    });
    ```
    

### 반환값

- status: API의 요청 상태를 문자열로 나타냄.
- 'loading': 아직 데이터를 받아오지 않았고, 현재 데이터를 요청 중
- 'error': 오류 발생
- 'success': 데이터 요청 성공
- 'idle': 비활성화된 상태(따로 설정해 비활성화한 경우)
- isLoading: status === 'loading'과 같다.
- isError: status === 'error'와 같다.
- isSuccess: status === 'success'와 같다.
- isIdle: status === 'idle'과 같다.
- error: 오류가 발생했을 때 오류 정보를 지님.
- data: 요청 성공한 데이터를 가르킴.
- isFetching: 데이터가 요청 중일 때 true가 된다.

데이터가 이미 존재하는 상태에서 재요청할 때 isLoading은 false이지만, isFetching은 true.
- refetch: 다시 요청을 시작하는 함수입니다.

종합 예시 코드

```jsx
// 1
const res = useQuery(queryKey, queryFn);

// 2
const res = useQuery({
    queryKey: queryKey,
    queryFn: queryFn
});
```

---

## useMutation

특정 함수에서 원하는 때에 직접 요청하는 형태로 작동.

- 해당 Hook 사용시 요청의 상태관리와 요청 전 / 후 처리도 설정이 가능하다.
- 주로 데이터 변경 작업시에 사용한다.

예시 코드

```jsx
import {useMutation} from 'react-query';

function Sample() {
  const mutation = useMutation(writeArticle, {
    onMutate: (variables) => { 
      /* 요청 직전 처리, 여기서 반환하는 값은 하단 함수들의 context로 사용됨 */
    },
    onError: (error, variables, context) => {
      /* 오류 발생 시 처리 */
    },
    onSuccess: (data, variables, context) => {
      /* 성공 시 처리 */
    },
    onSettled: (data, error, variables, context) => {
      /* 성공 여부와 관계없이 작업이 끝나면 처리 */
    }
  });
  const {mutate, isLoading, isError} = mutation;
}
```

### 반환값

- mutate: 요청을 시작하는 함수. 

이 함수의 첫 번째 인자에는 API 함수에서 사용할 인자를 넣고, 
두 번째 인자에는 {onSuccess, onSettled, onError} 객체를 넣는다. 
     → 두 번째 인자는 생략이 가능. 

만약 useMutation의 옵션에 이 함수들을 설정했다면 
옵션에 설정한 함수가 먼저 호출되고, mutate의 두 번째 파라미터에 넣은 함수들이 두 번째로 호출.
- mutateAsync: mutate와 인자는 동일, 함수를 호출했을 때 반환값이 Promise 타입.
- status: 요청의 상태를 문자열로 나타남 (idle, loading, error, success).
- isIdle, isLoading, isError, isSuccess: status 값에 따라 boolean 타입의 값을 나타남.
- error: 오류가 발생했을 때 오류 정보를 지님.
- data: 요청이 성공한 데이터를 가리킴.
- reset: 상태를 모두 초기화하는 함수.

---

# TS 문법

## |

single vertical bar

조합 유형

두 개 이상의 다른 타입으로 구성된 유형으로, 이러한 타입 중 *하나*일 수 있는 값을 나타낸다. 

- 이러한 각 타입을 *조합원*이라고 부른다.

코드 예시

```jsx
let element: HTMLElement | null = null;
// Equivalent to
let element: (HTMLElement | null) = null;
```

코드 설명

- `HTMLElementnull` 혹은 `null` 둘 중 하나의 타입일 수 있다.
- `null` 을 초기 값으로 설정.