<template>
    <div>
        <div> {{ turn }}님의 차례입니다. </div>
        <table-component v-bind:table-data="tableData"/>
        <div v-if="winner"> {{ winner }}님의 승리입니다. </div>
    </div>
</template>

<script>
    import TableComponent from './TableComponent';
    import EventBus from './EventBus';

    export default {
        components:{
            TableComponent,
        },
        data(){
            return {
                tableData : [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                turn: 'O',
                winner : '',
            };
        },
        methods: {
            onChangeData(){
                //this.tableData[1][0] = 'X' 작동하지 않음
                this.$set(this.tableData[1], 0, 'X'); //Vue.set과 동일함
            },
            onClickTd(rowIndex, cellIndex){
                //이건 화면에 그림을 그리지 않는다(뷰의 한계 - 자바스크립트 한계)
                this.$set(tableData[this.rowIndex], cellIndex, this.turn);
                
                let win = false;
                if(this.tableData[rowIndex][0] === this.turn && 
                this.tableData[rowIndex][1] === this.turn &&
                this.tableData[rowIndex][2] === this.turn){
                    win = true;
                }
                if(this.tableData[0][rowIndex] === this.turn &&
                this.tableData[1][rowIndex] === this.turn &&
                this.tableData[2][rowIndex] === this.turn){
                    win = true;
                }
                if(this.tableData[0][0] === this.turn &&
                this.tableData[1][1] === this.turn &&
                this.tableData[2][2] === this.turn){
                    win = true;
                }
                if(this.tableData[2][0] === this.turn &&
                this.tableData[1][1] === this.turn &&
                this.tableData[0][2] === this.turn){
                    win = true;
                }
                if(win){
                    this.winner = this.turn;
                    this.turn = 'O';
                    this.tableData = [['','',''],['','',''],['','','']];
                }else { //지거나 무승부
                    let all = true; //all이 전부 true면 무승부
                    this.tableData.forEach((row) => {
                        row.forEach((cell) => {
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all){
                        this.winner = '';
                        this.turn = 'O';
                        this.tableData = [['','',''],['','',''],['','','']];
                    }else{
                        this.turn = this.turn === 'O' ? 'X' : 'O';
                    }
                }
            }
        },
        created(){
            EventBus.$on('clickTd', this.onClickTd);
        }
    }
</script>

<!-- 만약 scoped를 붙여주게 되면 이 컴포넌트 안에서만 사용하겠다(즉 다른곳에 영향 X), 만약에 안쓰면 다른곳에도 영향을 끼침 -->
<style > 
    table{
        border-collapse: collapse;
    }
    td{
        border : 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>