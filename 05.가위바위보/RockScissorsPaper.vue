<template>
    <div>
        <div id="computer" v-bind:style="computedStyleObject" ></div> <!-- v-bind:class={ state: true, hello: false } , v-bind:style="{backgroundImage: '', fontSize: '14px'}" 이렇게 둘 다 객체형태로도 넣을 수 있다-->
        <!-- v-bind:style="{ backgroundImage : ''}" 이 부분을 보면 background-image를 보통 사용하는데 JS에서는 -는 마이너스이기 때문에 이런 경우 대문자로 써주면 된다 ex) border-radius => borderRadius 로 표현-->
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{ result }}</div>
        <div>현재 {{ score }}점</div>
    </div>
</template>

<script>
    const rspCoords = {
        바위 : '0',
        가위 : '-142px',
        보 : '-284px'
    };

    const scores = {
        가위 : 1,
        바위 : 0,
        보 : -1
    };

    const computerChoice = (imgCoord) => {
        return Object.entries(rspCoords).find(function(v){
            return v[1] === imgCoord;
        })[0];
    };

    let interval = null;
    export default {
        data(){
            return {
                imageCoord: rspCoords.바위,
                result: '',
                score: 0,
            };
        },
        computed: {
           computedStyleObject(){
               return {
                    background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imageCoord} 0`
               }; 
           }
        },
        methods: {
            changeHand(){
                interval = setInterval(() => {
                    if(this.imageCoord === rspCoords.바위){
                        this.imageCoord = rspCoords.가위;
                    }else if(this.imageCoord === rspCoords.가위){
                        this.imageCoord = rspCoords.보;
                    }else if(this.imageCoord === rspCoords.보){
                        this.imageCoord = rspCoords.바위;
                    }
                }, 100);
            }, 
            onClickButton(choice){
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imageCoord)];
                const diff = myScore - cpuScore;
                if(diff == 0){
                    this.result = '비겼습니다';
                }else if([-1, 2].includes(diff)){
                    this.result = '이겼습니다';
                    this.score += 1;
                }else{
                    this.result = '졌습니다';
                    this.score -= 1; 
                }
                setTimeout(() => {
                    this.changeHand();
                }, 1000);
            }
        },
        created(){
            console.log("created");
        },
        mounted(){
            console.log("mounted");
            this.changeHand();
        },
        updated(){
            //console.log("updated");
        },
        beforeDestroy(){
            clearInterval(setInterval);
        },  
        destroyed(){
            console.log("destroyed");
        }

    }
</script>

<!-- 만약 scoped를 붙여주게 되면 이 컴포넌트 안에서만 사용하겠다(즉 다른곳에 영향 X), 만약에 안쓰면 다른곳에도 영향을 끼침 -->
<style scoped> 
    #computer{
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>