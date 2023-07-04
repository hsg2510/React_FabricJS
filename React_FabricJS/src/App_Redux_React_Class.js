
import {createStore} from 'redux';
import React, {Component} from 'react';

// store.js 
// reducer를 변수로 따로 생성해서 parameter로 넘겨서 사용할 수도 있지만, 여기서는 그냥 함수 자체를 parameter로 넘겨줬다.
export default createStore(function(state, action) {
    if (state === undefined) {
        return { number : 0 }
    }

    if (action.type === 'INCREMENT') {
        return {...state, number:state.number + action.size }
    }

    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// React Redux 
// 첫번째로, Redux를 사용하는 모든 component에서 store를 접근할 수 있게 해야 한다.
// 맨 상위 component가 있는 index.js에서 store Provider 설정을 해줘야 한다. 
// index.js 
import store from 'store.js'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('root'));

// AddNumberRoot.js
export default class AddNumberRoot extends Component {
    render() {
        return (
            <AddNumberContainer></AddNumberContainer>
        )
    }
}

// AddNumberContainer.js
/* 
    **Container**
    store(redux 관련) 코드를 AddNumber안에 두는 것이 아니라, AddNumber를 감싸는 Container(AddNumberContainer)를 만들고, 
    Constainer에서 store(redux 관련) 코드를 담당하게 함으로써, AddNumber는 Redux와 기능적으로 분리되어, 어디서든 갖다 쓸 수 있는 
    독립적인 Component로의 기능을 수행할 수 있다. 
    밑에 있는 DisplayNumberContainer도 마찬가지 역할을 한다.
*/
/***
    Redux => React Redux
***/
/*
// Redux AddNumberContainer.js
export default class AddNumberContainer extends Component {
    render() {
        return (
            <AddNumber onClick={function(size){
                store.dispatch({type:'INCREMENT', size: size});
            }.bind(this)}></AddNumber>
        )
    }
}
*/

//React Redux AddNumberContainer.js
import {connect} from 'react-redux';

// dispatch 관련 로직을 담은 함수를 props로 전달하는 역할을 밑의 함수로 대체할 수 있다.
function mapReduxDispatchToReactProps(dispatch) {
    return {
        onClick: function(size) {
            dispatch({type:'INCREMENT', size:size});
        }
    }
}

// connect는 parameter를 2개 전달 받는데, 하나만 있거나, 두개 다 있거나, 두개다 없을수도 있다.
export default connect(null, mapReduxDispatchToReactProps)(AddNumber); 

// AddNumber.js
export default class AddNumber extends Component {
    state = {size:1}

    render() {
        return (
            <div>
                <input type="button" value="+" onClick={function() {
                    this.props.onClick(this.state.size);
                }.bind(this)}></input>
                <input type="text" value={this.state.size} onChange={function(e) {
                    this.setState({size:Number(e.target.value)});
                }.bind(this)}></input>
            </div>
        )
    }
}

// DisplayNumberRoot.js
export default class DisplayNumberRoot extends Component { 
    render() {
        return (
            <DisplayNumberContainer unit="kg" ></DisplayNumberContainer>
        )
    }
}


/***
    Redux => React Redux
***/
/*
// Redux DisplayNumberContainer.js
export default class DisplayNumberContainer extends Component {
    state = {number:store.getState().number}
    
    constructor(props) {
        super(props);
        //state가 바겼을 때 호출될 콜백 함수를 등록한다.
        store.subscribe(function(){ 
            this.setState({number: store.getState().number});
        }.bind(this));
    }

    render() {
        return (
            <DisplayNumber number={this.state.number} unit={this.props.unit}></DisplayNumber>
        )
    }
}
*/

// React Redux DisplayNumberContainer.js
import {connect} from 'react-redux';
// 밑에 함수는 state가 변경되면 자동으로 불리는 함수이고, parameter로 변경된 state를 받는다.
// 고로, 밑에 함수 구현 하나로, 위의 store.subscribe, 변경된 state를 DisplayNumber의 props로 전달하는 로직이 구현되는 것이다.
function mapReduxStateToReactProps(state) {
    return {
        number: state.number
    }
}

// connect(mapReduxStateToReactProps)함수를 호출한 return값이 또 함수인데, 
// 그 함수를 다시 호출한 것을 export 하겠다는 것이다. 그래서 connect()()이다.
export default connect(mapReduxStateToReactProps)(DisplayNumber); 


// DisplayNumber.js
// DisplayNumberRoot에서 unit="kg" 을 props으로 전달했는데, 그것을 가져오는 코드를 아무데도 
// 구현하지 않았다.그 이유는 위에 있는 connect함수가 해당 동작을 자동으로 해주기 때문이다.
// 그래서 아래처럼 this.props.unit 으로 가져올 수 있다. 
export default class DisplayNumber extends Component {
    render() {
        return (
            <div>
                <input type="text" value={this.props.number}  readOnly></input>
                {this.props.unit}
            </div>
        )
    }
}