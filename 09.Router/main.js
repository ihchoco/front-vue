import Vue from 'vue'; //ES2015 모듈 시스템 사용
//package.json에서 설치한 vue 파일을 가져온다는 뜻(기존 CDN 방식은 파일을 불러왔지만 지금은 명시적으로 vue를 쓰겠다)
import Router from './Router';

//위에 import를 하게 되면 CDN과 마찬가지로 new Vue()인스턴스를 생성할 수 있다
new Vue(Router).$mount("#root");
/* 
    $mount("vue가 통제할 요소")
    기존에 작성했던 
    new Vue({
        el: '#app', <-- 이 부분이랑 같은 역할 수행
    })
*/