<template>
    <div>
      这是商品购物页面
      <span>{{$route.params.goodsId}}</span><br>
      <span>{{$route.params.name}}</span>
      <router-link to="/goods/title">商品标题</router-link>
      <router-link to="/goods/img">商品图片</router-link>
      <div>
        <router-view></router-view>
      </div>
      <router-link v-bind:to="{name:'cart',params:{cartId:123}}">商品购物车</router-link>
      <!--<button @click="jump">button-跳转到商品购物车</button>-->
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        methods: {
          jump(){
            this.$router.push("/cart?goodsId=123")
          }
        }
    }
</script>

<style scoped>

</style>
