<template>
    <div>
        <div> {{ turn }}님의 차례입니다. </div>
        <table>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" @click="onClickTd(rowIndex, cellIndex)"> {{ cellData }}</td>
            </tr>
        </table>
        <div v-if="winner"> {{ winner }}님의 승리입니다. </div>
    </div>
</template>

<script>
    import store from './store';
    import { mapState } from 'vuex';
    import { CHANGE_TURN, CLICK_SELL, NO_WINNER, RESET_GAME, SET_WINNER } from './store';

    export default {
        store, //root와 Vuex 연결
        data(){
            return {
                
            };
        },
        computed: {
            ...mapState(['winner', 'turn', 'tableData']),
            // ...mapState({
            //     winner(state){
            //         return state.winner;
            //     },
            //     turnState: 'turn',
            // })
            // winner(){
            //     return this.$store.state.winner;
            // },
            // turn(){
            //     return this.$store.state.turn;
            // }
        },
        methods: {
            onClickTd(rowIndex, cellIndex){
                console.log(rowIndex, cellIndex);
                if(this.cellData) return;

                this.$store.commit(CLICK_SELL, {row: rowIndex, cell: cellIndex});
                
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
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
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
                        this.$store.commit(NO_WINNER);
                        this.$store.commit(RESET_GAME);
                    }else{
                        this.$store.commit(CHANGE_TURN);
                    }
                }
            },
        },
        created(){
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