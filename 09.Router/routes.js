import Vue from 'vue';
import VueRouter from 'vue-router';
import NumberBaseball from '../03.야구게임/NumberBaseball';
import ResponseCheck from '../04.반응속도체크/ResponseCheck';
import RockScissorsPaper from '../05.가위바위보/RockScissorsPaper';
import LottoGenerator from '../06.로또/LottoGenerator';
import GameMatcher from './GameMatcher';


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {path: '/number-baseball', component: NumberBaseball }, 
        {path: '/response-check', component: ResponseCheck },
        {path: '/rock-scissors-paper', component: RockScissorsPaper},
        {path: '/lotto-generator', component: LottoGenerator},
        {path: '/game/:name', component: GameMatcher }
    ]
})

//라우터는 눈속임이다(실제로 화면은 하나)

//1. 먼저 보여 줄 화면을 만든다(컴포넌트)