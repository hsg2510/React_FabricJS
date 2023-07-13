
//////UseEffect///////
/*
    Mount, Update(다시 랜더링), Unmount 되었을 때, 특정작업을 수행하고 싶을때 useEffect를 사용한다.

    // 랜더링 될때마다 실때.
    useEffect(() => {
    });
    
    // 맨 처음 랜더링 될때(Mount), value가 바뀔때 실행.
    useEffect(() => {
    }, [value]);

    // 맨 처음 랜더링 될때만 실행.
    useEffect(() => {
    }, []);

    useEffect(() => {
        return () => {
            // unMount 될 때 실행
        }
    }, []);
 */

//////UseRef///////
/*
    1. 저장 공간으로 사용. 
        - component가 re-rendering이 되어도 값이 유지된다.
        - state와 달리 ref 값이 변경되어도 랜더링 되지 않는다.)
    2. DOM 요소에 접근.

    // 저장 공간 
    const countRef = useRef(0); 
    // countRef { current: 0 } 

    // DOM 요소에 접근
    const inputRef = useRef();

    useEffect(() => {
        console.log(inputRef.current);
    }, []);
    
    return (
        <input ref={inputRef} type="text" placeholder="username">
    )
*/

//////UseContext///////
/*
    Context를 사용하면, 부모 component가 props로 필요한 자식 component까지 data를 전달해 주지 않아도 자식 Component
    에서 useContext()를 사용해서 전역적으로 Context에 저장된 data에 접근할 수 있다.

    전역 Theme, User, Language 등을 관리할 때 사용한다.

    ///// ThemeContext.js
    import { createContext } from 'react';

    const ThemeContext = createContext(null);
    /////

    ///// App.js
    import { ThemeContext } from './ThemeContext';

    function App() {
        const [isDark, setIsDark] = useState(false);

        return (
            <ThemeContext.Provider value={{isDark, setIsDark}}>
                <Page/>
            </ThemeContext.Provider>
        );
    }

    const Page = () => {
        const data = useContext(ThemeContext);
        // data = { isDark : false, setIsDark : ƒ()} 

        // const {isDark, setIsDark} = useContext(ThemeContext); 로도 사용가능.
    };

    //// context 초기값
    const ThemeContext = createContext('초기값'); 
    
    만약 자식 component(Page)가 <ThemeContext.Provider>로 감싸지지 않았다면, 
    <ThemeContext.Provider value={{isDark, setIsDark}}>로 초기값을 전달해 주지 않았기 때문에, 
    Page component에서 const data = useContext(ThemeContext)를 사용할 때, 초기값이 필요하다.
    그런 경우, const ThemeContext = createContext(null); 으로 할것이 아니라,
    const ThemeContext = createContext(초기값); 으로 초기값을 전달해 줘야 한다.

    *단순히 Prop drilling을 피하기 위한 목적이라면 Component Composition을 사용하는 것을 먼저 고려해보자.*
 */

//////UseMemo///////
/*
    ////Case 1.
    const [hardNumber, setHardNumber] = useState(1);
    const [easyNumber, setEasyNumber] = useState(1);

    const hardSum = hardCalculate(hardNumber);
    const easySum = easyCalculate(easyNumber);

    // 버튼이 두개가 있고, 하나의 버튼은 hardNumber를 1씩 증가시키고, 다른 하나는 easyNumber를 1씩 증가시킨다고 가정.
    // 버튼을 누를때마다 re-rendering 되기 때문에 hardCalculate, easyCalculate 모두 실행된다.
    // hardCalculate 함수가 실행이 오래걸린다고 가정한다면, easyNumber만 변경된다고 하더라도 hardCalculate 함수가
    // 실행될 수 밖에 없다. 

    const [hardNumber, setHardNumber] = useState(1);
    const [easyNumber, setEasyNumber] = useState(1);

    // hardNumber가 변경될 때만 실행.
    const hardSum = useMemo(() => {
        return hardCalculate(hardNumber)
    }, [hardNumber]); 
    const easySum = easyCalculate(easyNumber);

    ////Case 2.
    const [isKorea, setIsKorea] = useState(true);
    const location = {
        country: isKorea ? '한국' : '외국'
    };
    
    useEffect(() => {

    }, [location]);
    // location값이 변경되지 않더라도 re-rendering 될때마다 useEffect가 실행된다.
    // location은 object라 re-rendering 될때마다 매번 다른 주소값을 가질것이기 때문이다.

    const location = useMemo(() => {
        return {
            country: isKorea ? '한국' : '외국'
        };
    }, [isKorea]);
    // re-rendering 되더라도 isKorea 값이 바뀌지 않으면, location 값도 바뀌지 않을테고 따라서 useEffect도 
    // 실행되지 않는다.
 */

//////UseCallback///////
/*
    useCallback 또한, useMemo와 같이 memoization을 이용해서 Component의 성능을 최적화 시켜주는 도구다.
    useMemo와 다른점은 인자로 전달한 콜백함수 그 자체를 memoization 해주는 것이다.

    const [size, setSizes] = useState(100);
    const [isDark, setIsDark] = useState(false);    
    const createBoxStyle = () => {
        return {
            backgroundColor: 'pink',
            width: '${size}px',
            height: '${size}px'
        };
    };

    return (
        <div style={{ background: isDark ? 'black' : 'white' }}>
        <input type="number" value={size} onChange={(e) => setSizes(e.target.value)}/>
        <button onClick={() => setIsDark(!isDark)}>Change Theme</button>
        <div style={createBoxStyle()}/>
    )
    //위 코드에서는 size가 변경될 때만 createBoxStyle 함수(object)가 변경되어야 하는데, isDark가 변경될 때도 변경된다.

    const createBoxStyle = useCallback(() => {
        return {
            backgroundColor: 'pink',
            width: '${size}px',
            height: '${size}px'
        };
    }, [size]);
    // createBoxStyle을 useCallback을 사용하게 바꿔 줌으로써, isDark가 변경될때는 createBoxStyle 함수(object)가 변경되지 않고, size가 변경될 때만 변경된다.
*/

//////UseCallback & Ref///////
// 자식 element를 참조할 때 보통 useRef를 사용한다. 하지만, 해당 element를 참조까지 하면서 해당 element가 mount, unMount 될 때 특정 code를 실행시키고 싶다면, 
// useCallback을 useRef처럼 사용하면 된다.
/*
    function CallBackAndRef(props) {
        const h1Ref = useCallback(node => {
            // h1 element가 mount, unMount될때 실행하고 싶은 코드 작성.
        }, []);

        return (
            <>
                <h1 ref={h1Ref}>안녕, 리액트</h1>
            </>
        );
    }
*/

//////UseReducer///////
/*
    여러개의 하위값들을 포함하는 복잡한 state를 다뤄야 할 때, useState 대신 사용한다. reduce도 state 처럼 reduce의 state가 바뀔 때마다 re-rendering 된다.
    Reducer : state를 업데이트하는 역할. component의 state를 변경하고 싶다면, 꼭 reducer를 통해서 해야한다.
    dispatch : Reducer에게 state를 변경하라고 명령하는 역할.
    action : Reducer에게 어떤 state를 어떻게 변경해야 할지 정의. 
    -> dispatch 안에 action을 담아서 Reducer에게 전달

    import React, { useState, useReducer } from 'react';

    const ACTION_TYPES = {
        deposit: 'deposit',
        withdraw: 'withdraw'
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case ACTION_TYPES.deposit:
                return state + action.payload;
            case ACTION_TYPES.withdraw:
                return state - action.payload;
            default:
                return state;
        }
    };

    function App() {
        const [number, setNumber] = useState(0);
        const [money, dispatch] = useReducer(reducer, 0); // reducer 객체(함수), state(money)의 초기값

        return (
            <div>
                <p>잔고: {moeny}</p>
                <input  
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(parseInt(e.target.value))}
                    step="1000"
                />
                <button onClick={() => { 
                    dispatch({ type: ACTION_TYPES.deposit, payload: number })
                }}>입금</button>
                <button onClick={() => {
                    dispatch({ type: ACTION_TYPES.withdraw, payload: number })
                }}>출금</button>
            </div>
        )
    };
*/

//////React.memo///////
/*
    React에서는 부모 Component가 re-rendering 되면, 자식 Component도 re-rendering 된다.
    React.memo는 react에서 제공하는 고차 컴포넌트(HOC, Higher-Order Component)다.
    HOC는 어떤 component를 인자로 받아서, 새로운 component를 리턴하는 함수다.
    React.memo는 인자로 component를 받아서 좀 더 최적화 시킨 component를 리턴해 주는데, 최적화 된 component는 자신의 prop이 변경되지 않으면 re-rendering 되지 않는 기능을 가지고 있다.
    단, component가 useState, useContext, useReducer 와 같은 상태와 관련된 hook을 사용한다면, props의 변화가 없더라도 state나 context가 변경되면 re-rendering 된다.

    *React.memo를 무분별하게 사용하면 메모리를 많이 사용하기 때문에 오히려 성능에 악영향을 줄 수 있다. 고로, 다음과 같은 경우에만 사용하는 것을 고려해 보자.
    1. 컴포넌트가 같은 props로 자주 렌더링 될 때
    2. 컴포넌트가 랜더링 될때마다 복잡한 작업을 처리해야 할 때

    function App() {
        const [parengAge, setParentAge] = useState(30);
        const [childAge, setChildAge] = useState(10);

        const incrementParentAge = () => {
            setParentAge(parentAge + 1);
        };

        const incrementChildAge = () => {
            setChildAge(childAge + 1);
        };

        return (
            <div>
                <p>부모 age: {parentAge}</p>
                <button onClick={incrementParentAge}>부모 나이 증가</button>
                <button onClick={incrementChildAge}>자녀 나이 증가</button>
                <Child name={'홍길동'} age={childAge} />
            </div>
        );
    }
    
    // 다른 파일 이라고 가정
    import React, { memo } from 'react';

    const Child = ({ name, age }) => {
        return (
            <p>name: {name}</p>
            <p>age: {age}</p>
        );
    };

    export default memo(Child);
    // 사용 방법은 간단하다, memo(컴포넌트)만 해주면 된다.
*/

//////Custom Hooks///////
/*
    /// Custom Hooks 사용 전 ///
    import { useEffect, useState } from 'react';

    const baseUrl = 'https://jsonplaceholder.typicode.com';

    function App() {
        const [data, setData] = useState(null);
        const fetchUrl = (type) => {
            fetch(baseUrl + '/' + type)
                .then((res) => res.json())
                .then((res) => setData(res));
        };

        useEffect(() => {
            fetchUrl('users');
        }, []);

        return (
            <div>
                <button onClick={() => fetchUrl('users')}>Users</button>
                <button onClick={() => fetchUrl('posts')}>Posts</button>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    }

    // 우리가 url에서 결과를 Fetch 해와서 json으로 변환하는 기능을 여러군데에서 사용하고 싶다면, 해당 기능을 Custom Hooks로 만들어서 재사용하면 된다.

    /// Custom Hooks 사용 후 ///
    /// useFetch.js ///
    import { useEffect, useState } from 'react';

    export function useFetch(baseUrl, initialType) {
        const [data, setData] = useState(null);
        const fetchUrl = (type) => {
            fetch(baseUrl + '/' + type)
                .then((res) => res.json())
                .then((res) => setData(res));
        };

        useEffect(() => {
            fetchUrl(initialType);
        }, []);

        return {
            data,
            fetchUrl,
        }; // object인데, { 0 : data, 1 : fetchUrl } 이렇게 쓰는 것과 같다.
    }

    /// App.js ///
    import { useFetch } from './useFetch';

    const baseUrl = 'https://jsonplaceholder.typicode.com';

    function App() {
        const { data: useData } = useFetch(baseUrl, 'users');
        const { data: postData } = useFetch(baseUrl, 'posts');

        return (
            <div>
                <h1>User</h1>
                {userData && <pre>{JSON.stringify(userData[0], null, 2)}</pre>}
                <h1>Post</h1>
                {userData && <pre>{JSON.stringify(postData[0], null, 2)}</pre>}
            </div>
        );
    }
    // 위와 같이 Custom Hook으로 url을 받아서 data를 fetch 해오는 기능을 만들어 놓으면, 하나의 Component에서 여러번 사용하거나, 다른 Component에서도 해당 기능을 쉽게 사용할 수 있다.
*/