<script>
import TabContainer from './tab-container.vue'

export default {
  name: 'Tabs',
  // provide(){
  //   return {//不是动态的
  //     value:this.value
  //   }
  // },
  component:TabContainer,
  props:{
    value:{ //控制显示那个tab
      type:[String,Number],
      required:true
    }
  }
  ,
  methods:{
    onChange(index){
      this.$emit('change',index)
    }
  },
  data(){
    return {
      panes:[]
    }
  },
  render () {
    return (
      //jsx
      <div class="tabs">
        <ul class="tabs-header">
           {this.$slots.default}
        </ul>
        <TabContainer panes={this.panes}></TabContainer>
      </div>
    )
  }
}
</script>
<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>
