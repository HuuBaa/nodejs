<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked==='all'}" @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(pirce,index) in priceFilter" @click="setPriceFilter(index)">
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked===index}">{{pirce.startPrice}} - {{pirce.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>

              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading" >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="OverLayFlag" @click="closeFilterPop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  .load-more{
    text-align: center;
    height: 100px;
    line-height:100px;
  }
</style>
<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import axios from 'axios'

  export default {
    data() {
      return {
        goodsList: [],
        sortFlag:true,
        page:1,
        pageSize:8,
        busy:true,
        loading:true,
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'500.00'
          },{
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'2000.00'
          }
        ],
        priceChecked:'all',
        OverLayFlag:false,
        filterBy:false
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    mounted: function () {
      this.getGoodsList();
    },
    methods: {
      getGoodsList(flag) {

        let params={
          page:this.page,
          pageSize:this.pageSize,
          sort:this.sortFlag?1:-1,
          priceLevel:this.priceChecked,
        };
        this.loading=true;
        axios.get('/goods',{params:params}).then((result)=>{
          this.loading=false;
          if(flag){
            let res=result.data;
            this.goodsList=this.goodsList.concat(res.result.list);
            this.busy=res.result.count===0;
          }else {
            let res=result.data;
            this.goodsList=res.result.list;
            this.busy=false;
          }

        });

      },
      loadMore: function() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 500);
      },
      sortGoods(){
        this.sortFlag=!this.sortFlag;
        this.page=1;
        this.getGoodsList();
      },
      setPriceFilter(index){
        this.priceChecked=index;
        this.page=1;
        this.getGoodsList();
        this.closeFilterPop()
      },
      showFilterPop(){
        this.filterBy=true;
        this.OverLayFlag=true;
      },
      closeFilterPop(){
        this.filterBy=false;
        this.OverLayFlag=false;
      }
    }
  }
</script>
