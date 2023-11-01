<template>
    <div>
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div>
        <template v-if="result.length">
            <div>평균 시간 : {{average}}ms</div>
            <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;
    export default {
        data(){
            return {
                result: [],
                state: 'waiting', //CSS Style을 위한 클래스(v-bind:class로 연결)
                message: '클릭해서 시작하세요.'
            }
        },
        computed: {
            average(){ //수식을 화면단에 적는것 보다는 computed를 통해서 return해서 사용하자
                return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
            }
        },
        methods: {
            onReset(){
                this.result = [];
            },
            onClickScreen(){
                if(this.state === 'waiting'){
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요';
                    timeout = setTimeout(() => {
                        this.state = 'now';
                        this.message = '지금 클릭!';
                        startTime = new Date();
                    }, Math.floor(Math.random() * 1000) + 2000); //2~3초
                }else if(this.state === 'ready'){
                    clearTimeout(timeout);
                    this.state = 'waiting';
                    this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
                }else if(this.state === 'now'){
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하세요';
                    this.result.push(endTime - startTime);
                }
            }
        }
    }
</script>

<!-- 만약 scoped를 붙여주게 되면 이 컴포넌트 안에서만 사용하겠다(즉 다른곳에 영향 X), 만약에 안쓰면 다른곳에도 영향을 끼침 -->
<style scoped> 
    #screen{
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting{
        background-color: aqua;
    }
    #screen.ready{
        background-color: red;
        color: white;
    }
    #screen.now{
        background-color: greenyellow;
    }
</style>