<template>
    <div>
      <button @click="increment">+</button>
      <button v-on:click="desrement">-</button>
      <p><span>{{num}}</span></p>
    </div>
</template>

<script>
    export default {
        props:['num'],
        name: "Counter",
        data(){
          return {
            num:0
          }
        },
        methods:{
          increment(){
              this.$emit('incre');
              import('./../util');
          },
          desrement(){
            this.$emit('descre');
          }
        }
    }
</script>

<style scoped>

</style>
