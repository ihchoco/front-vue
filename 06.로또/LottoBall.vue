<template>
    <div class="ball" :style="styleObject" >{{ number }}</div>
</template>

<script>
    export default {
        name: 'LottoBall', //근데 이건 안적어도 컴포넌트 명은 파일명으로 된다(LottoBall 똑같음)
        props: {
            number : Number, //자바스크립트 자료형 표현 number를 props로 받는데 이건 Number 타입이다
        }, //props의 값은 readonly이기 때문에 변경이 불가능(바꾸려면 부모가 다시 새로운 데이터를 주면 된다)
        computed : { //계산을 해주는 거기 때문에 data 보다는 computed 사용
            styleObject(){
                let background;
                if(this.number < 10){
                    background = 'red';
                }else if(this.number <= 20){
                    background = 'orange'
                }else if(this.number <= 30){
                    background = 'yellow';
                }else if(this.number <= 40){
                    background = 'blue';
                }else{
                    background = 'green'
                }
                return {
                    background,

                };
            }
        },
    }
</script>

<!-- 만약 scoped를 붙여주게 되면 이 컴포넌트 안에서만 사용하겠다(즉 다른곳에 영향 X), 만약에 안쓰면 다른곳에도 영향을 끼침 -->
<style scoped> 
    .ball{
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px;
}
</style>