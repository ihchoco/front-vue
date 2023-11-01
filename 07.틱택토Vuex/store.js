import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); //Vue와 Vuex를 연결 -> 이렇게 하면 this.$store 사용 가능
//Vue.use(axios); // $this.axios 사용 가능
//Vue.use 할 때마다 기능을 추가 (미들웨어 처럼)

//이렇게 해두면 아래 mutations에 있는 함수들을 모듈로 만들어서 밖에서도 쓸 수 있게 해준다
export const SET_WINNER = 'SET_WINNER';
export const CLICK_SELL = 'CLICK_SELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
    state: { //vue의 data 속성과 비슷
        tableData : [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner : '',
    },
    getters: { //vue의 computed 속성과 비슷
        turnMessage(state){ //state에 데이터 + 추가 메시지를 남기고 싶을때 이렇게 쓸 수도 있다
            return state.turn + "님이 승리하였습니다";
        }
    },
    mutations: { //state를 수정할 때 사용, 동기적으로(즉 vue의 데이터를 state가 대신 처리하고 state 변경하려면 mutations를 통해서 사용해야한다)
        [SET_WINNER](state, winner){ //mutations 함수 이름은 대문자로 지정하는게 규칙
            state.winner = winner;
        },
        [CLICK_SELL](state, {row, cell}){
            Vue.set(state.tableData[row], cell, state.turn); //Vuex에는 this.$set이 없어서 Vue.set 사용
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData = [['','',''],['','',''],['','','']];
        },
        [NO_WINNER](state){
            state.winner = '';
        }
    },
    actions: { //비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때

    }
}); //중앙 통제를 배우는 이유도 너무 흩어져 있으면 찾기가 어렵기 때문