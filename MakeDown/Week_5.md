# **자바스크립트에서의 ...  연산자**

## **Spread Operator (스프레드 연산자)**

배열이나 문자열을 같이 여러 요소를 동시에 가져올 때 사용.

배열 / 객체 복사나 새로운 요소를 추가하여 새로 배열을 만들 때 등 다양하게 활용 가능하다.

객체 복사 예시

```jsx
const human = {
  name: "nana",
  age: 12
};

const human2 = {
  ...human
};

console.log('human :' , human);
console.log('human2 : ', human2);
```

배열 복사 및 값 추가 예시

```jsx
const user = ['id1','id2','id3'];
const copyUser = [...user];
const copyUser2 = [...user, 'id20','id11'];

console.log('user :' , user);
console.log('copy : ', copyUser);
```

## **rest parameter (나머지 매개변수)**

사용법은 스프레드 연산자와 동일하다.

단, rest의 경우 **함수에서 사용하는 것을 의미**한다.

- rest 파라미터로 전달된 값은 배열의 형태.

예시

```jsx
function restTest(...rest){
	console.log(rest); // ['banana', 'apple']

	// 대괄호 없이 출력도 가능
	console.log(...rest); // 'banana', 'apple'
}

restTest('banana', 'apple');
```

추가 사용예시

```jsx
// 객체
const object = { a: 1, b: 2, c: 3 };
const { a, ...rest } = object;
console.log(a); // 1
console.log(rest); // { b: 2, c: 3 }

//배열
const array = [1, 2, 3, 4, 5];
const [a, b, ...rest];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]
```

실 사용예시

```jsx
const object = { a: 1, b: 2};
const foo = <MyComponent a={object.a} b={object.b} />
const bar = <MyComponent {...object} />
```

<aside>
🤔 **둘의 차이점?**

함수의 파라미터로 쓰이면 rest 파라미터, 그외 객체나 배열 등에 사용되면 스프레드 연산자.

그럼 이 둘의 차이는 뭘까?

바로 위치 상관없이 사용할 수 있는 스프레드와는 다르게 **rest의 경우 함수 매개변수 가장 마지막에 작성되어야 한다**는 점이다.

</aside>

---

### function Props 디폴트 지정 방법

```jsx
지정 Function.defaultProps = {
    Props명:값
};
```