/*
import React from 'react';
import './App.css'
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

function reducer(state, action) {
    if (currentState === undefined) {
        return {
            number : 1,
        }
    const newState = { ...state};

    if (action.type === 'PLUS') {
        newState.number++;
    }
    
    return newState;
}
const store = createStore(reducer);

export default function App () {
    return (
        <div id="container">
            <h1>Root</h1>
            <div id="grid">
            <Provider store={store}> // Left1, Right1 component에 store를 사용할 수 있게 되었다.
                <Left1></Left1>
                <Right1></Right1>
            </Provider>
        </div>
    )
}

function Left1(props) {
    reutrn (    
        <div>
            <h1>Left1 : {props.number}</h1>
            <Left2 number={props.number}></Left2>
        </div>
    );
}
function Left2(props) {
    reutrn (    
        <div>
            <h1>Left2 : {props.number}</h1>
            <Left3 number={props.number}></Left3>
        </div>
    );
}
function Left3(props) {
    // function f(state){
    //     return state.number;
    // }
    const number = useSelector((state) => state.number); // 위 f 함수를 축약형으로 선언해서 parameter로 넘겨준것.
    reutrn (    
        <div>
            <h1>Left3 : {number}</h1>
        </div>
    );
}

function Right1(props) {
    reutrn (    
        <div>
            <h1>Right1</h1>
            <Right2></Right2>
        </div>
    );
}
function Right2(props) {
    reutrn (    
        <div>
            <h1>Right2</h1>
            <Right3></Right3>
        </div>
    );
}
function Right3(props) {
    const dispatch = useDispatch();
    reutrn (    
        <div>
            <h1>Right3</h1>
            <input type="button" value="+" onClick={() => {
                dispatch({type:'PLUS'})
            }}>
        </div>
    );
}

*/


//// Redux Toolkit
//without Toolkit
/*
    function reducer(state, action) {
        if (action.type === 'up') {
            return {...state, value: state.value + action.step}
        } 

        return state;
    }

    const initialState = {value: 0};
    const store = createStore(reducer, initialState);
    
    function Counter() {
        const dispatch = useDispatch();
        const count = useSelector(state=>state.value);

        return <button onClick={()=> {
            dispatch({type:'up', step: 2});
        }}> + </button> {count}
    }
*/

//// with Toolkit
//counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counterName',
    initialState : {value: 0},
    reducers: {
        up: (state, action) => {
            state.value += action.payload;
        }
    }
});

export default counterSlice;
export const {up} = counterSlice.actions;

//store.js
import store from './store';
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});

//App.js
import store from './store';
import {up} from './counterSlice'

function Counter() {
    const dispatch = useDispatch();
    const count = useSelector(state=>{
        return state.counter.value
    });

    return <button onClick={()=> {
        // action.payload = 2, 이렇게 자동으로 들어감.
        dispatch(up(2));
    }}> + </button> {count}
}