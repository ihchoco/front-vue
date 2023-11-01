new Vue({
    el: '#app', 
    data : {
        'isAnswer' : '',
        'num1' : 1,
        'num2' : 1,
        'answer' : ''
    },
    methods : {
        onSubmitForm : function(e){
            console.log(this.$refs);
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
})
