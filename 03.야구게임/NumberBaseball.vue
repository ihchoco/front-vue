<template>
    <div>
        <h1>{{ result }}</h1>
        <!-- <form v-on:submit="onSubmitForm"> 아래 처럼 @submit.prevent로 사용 가능 -->
        <form @submit.prevent="onSubmitForm">
            <input type="text" ref="answer" minlength="4" maxlength="4" v-model="value">
            <button type="submit">입력</button>
        </form>
        <div>시도 : {{ tries.length }}</div>
        <ul>
            <li v-for="t in tries">{{ t }}</li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => { //methods에 넣을수도 있지만 안넣는 이유는 이건 화면에 표시하기 위한 로직이 아니니깐
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const array = [];
        for(let i = 0; i < 4; i += 1){
            const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            array.push(chosen);
        }
        return array;
    }

    export default {
        data(){
            return {
                answer: getNumbers(), // ex) [1, 5, 3, 4]
                tries: [], //시도 수
                value: '', //입력 값
                result: '', //결과 메시지
            }
        },
        methods: {
            onSubmitForm(e){
                if(this.value === this.answer.join('')){ //정답 맞혔으면
                    this.tries.push({
                        try : this.value,
                        result : '홈런'
                    }); 
                    this.result = '홈런';
                    alert("게임을 다시 실행합니다.");
                    this.value = '';
                    this.answer = getNumbers();
                    this.tries = [];
                    this.$refs.answer.focus();
                }else{ //정답 틀렸을 때
                    if(this.tries.length >= 9){ //10번째 시도
                        alert("게임을 다시 실행합니다.");
                        this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다!`;
                        this.answer = getNumbers();
                        this.value = '';
                        this.tries = [];
                        this.$refs.answer.focus();
                        return;
                    }
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v)); //문자를 숫자 배열로 바꾸는것
                    for(let i = 0; i < 4; i+= 1){
                        if(answerArray[i] === this.answer[i]){ //숫자 자릴수 모두 정답
                            strike++;
                        }else if(this.answer.includes(answerArray[i])){ //숫자만 정답
                            ball++;
                        }
                    }
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크, ${ball} 볼입니다`
                    })
                    this.value = '';
                    this.$refs.answer.focus();
                }
            }
        }
    }

</script>

<style>

</style>