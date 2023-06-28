
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
    <Page/>
    Page component에서 const data = useContext(ThemeContext)를 사용하면, data = '초기값'이 된다.

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