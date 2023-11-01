<template>
    <td @click="onClickTd"> {{ cellData }}</td>
</template>

<script>
    export default {
        props: {
            cellData : String,
            rowIndex : Number,
            cellIndex : Number,
        },
        methods : {
            onClickTd(){
                if(this.cellData) return; //남이 이미 누른거는 클릭 못하도록 방지

                const this = this.$root.$data;
                // console.log(this.$root.$data);
                // console.log(this.$parent.data);
                
                //이건 화면에 그림을 그리지 않는다(뷰의 한계 - 자바스크립트 한계)
                //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
                this.$set(this.tableData[this.rowIndex], this.cellIndex, this.turn);
                
                let win = false;
                if(this.tableData[this.rowIndex][0] === this.turn && 
                this.tableData[this.rowIndex][1] === this.turn &&
                this.tableData[this.rowIndex][2] === this.turn){
                    win = true;
                }
                if(this.tableData[0][this.rowIndex] === this.turn &&
                this.tableData[1][this.rowIndex] === this.turn &&
                this.tableData[2][this.rowIndex] === this.turn){
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
            },
        }
    }
</script>