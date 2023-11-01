<template>
    <div>
        <div>
            <span>{{ num1 }}</span> 곱하기 <span>{{ num2 }}</span>
            <form @submit.prevent="onSubmitForm">
                <input type="number" v-model="answer" ref="inputNum" />
                <button type="submit">입력!</button>
            </form>
            <div>
                {{ isAnswer }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isAnswer: '',
                num1 : 1,
                num2 : 1,
                answer : ''
            }
        },
        methods: {
            onSubmitForm(e){
                e.preventDefault();
                if(this.num1 * this.num2 === parseInt(this.answer)){
                    this.isAnswer = '정답';
                    this.num1 = Math.ceil(Math.random() * 9);
                    this.num2 = Math.ceil(Math.random() * 9);
                    this.answer = '';
                    this.$refs.inputNum.focus();
                }else{
                    this.isAnswer = '땡';
                    this.answer = '';
                    this.$refs.inputNum.focus();
                }
            }
        }
    }
</script>

<style scoped>

</style>