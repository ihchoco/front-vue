<template>
    <div>
        <div> {{ turn }}님의 차례입니다. </div>
        <table-component v-bind:table-data="tableData"/>
        <div v-if="winner"> {{ winner }}님의 승리입니다. </div>
    </div>
</template>

<script>
    import TableComponent from './TableComponent';

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
            }
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