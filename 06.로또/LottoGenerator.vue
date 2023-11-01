<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
    </div>
</template>

<script>
    import LottoBall from './LottoBall';

    function getWinNumbers(){
        console.log("getWinNumbers");
        const candidate = Array(45).fill().map((v, i) => i + 1);
        const shuffle = [];
        while(candidate.length > 0){
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((p,c) => p - c);
        return [...winNumbers, bonusNumber];
    }
    const timeouts = [];
    export default {
        components: {
            'lotto-ball' : LottoBall, //컴포넌트 등록
            //LottoBall 단순하게 이렇게 해도 괜찮다(실무에서는 이렇게 씀) -> 파스칼 케이스를 자동으로 케밥 케이스로 변환 -> lotto-ball 이렇게 된다 
        },
        data(){
            return {
                winNumbers: getWinNumbers(), 
                winBalls: [], //시각 효과를 주기 위해서(1개씩 추가하면서 로또볼 채우기 위해서)
                bonus: null,
                redo: false
            };
        },
        computed: {
          
        },
        methods: {
            onClickRedo(){
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
            },
            showBalls(){
                for(let i = 0; i < this.winNumbers.length - 1; i++){
                    timeouts[i] = setTimeout(() => {
                        this.winBalls.push(this.winNumbers[i]);
                    }, (i + 1) * 1000);
                };
                timeouts[6] = setTimeout(() => {
                    this.bonus = this.winNumbers[6];
                    this.redo = true;
                }, 7000);
            }
        },
        created(){

        },
        mounted(){
            this.showBalls();
        },
        updated(){

        },
        beforeDestroy(){
            timeouts:forEach((t) => {
                clearTimeout(t);
            })
        },  
        destroyed(){

        },
        watch: {
            bonus(val, oldval){
                if(val.length === null){
                    this.showBalls();
                }
            }
        }

    }
</script>

<!-- 만약 scoped를 붙여주게 되면 이 컴포넌트 안에서만 사용하겠다(즉 다른곳에 영향 X), 만약에 안쓰면 다른곳에도 영향을 끼침 -->
<style scoped> 
    
</style>