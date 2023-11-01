<template>
    <td @click="onClickTd"> {{ cellData }}</td>
</template>

<script>
    
    export default {
        props: {
            rowIndex : Number,
            cellIndex : Number,
        },
        computed: {
            ...mapState({ //이렇게 간단하게 표시 가능
                tableData: state => state.tableData,
                turn: state => state.turn,
                cellData(state){
                    return state.tableData[this.rowIndex][this.cellIndex];
                }
            })
            // cellData(){
            //     return this.$store.state.tableData[this.rowIndex][this.cellIndex];
            // },
            // tableData(){
            //     return this.$store.state.tableData;
            // },
            // turn(){
            //     return this.$store.state.turn;
            // }
        },
        
    }
</script>