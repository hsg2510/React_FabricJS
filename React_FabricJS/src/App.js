import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
    // setState로 인해 state가 변경되면 해당 state가 포함된 html은 다시 렌더링된다.
    // 자주 변경될것 같은 html 부분은 state로 관리하자.
    let [a, setState] = useState('남자 코트 추천');


    return (
        <div className='App'>
            
        </div>
    );
}

export default App;