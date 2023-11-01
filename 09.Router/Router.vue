<template>
    <div>
        <div> <!-- router 네비게이션 메뉴(레이아웃 넣을수 있음)-->
            <router-link to="/game/index">게임 매처</router-link>
            <router-link to="/game/number-baseball">숫자야구</router-link> <!-- a태그와 비슷하지만 Page 전환이 아니라 컴포넌트 불러오는걸로-->
            <router-link to="/game/response-check">반응속도체크</router-link>
            <router-link to="/game/rock-scissors-paper">가위바위보</router-link>
            <router-link to="/game/lotto-generator">로또 생성기</router-link>
        </div>
        <router-view></router-view> <!-- 여기에 router 내부 화면들이 바뀌면서 보여지게 된다-->
    </div>
    
</template>

<script>
    import router from './routes';
    export default {
        router,
    };
</script>

<style scoped> 
    
</style>