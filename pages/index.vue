<template>
  <section class="container">
    <div class="search-bar">
      <div class="form_group">
        <label for=""> Name</label>
        <input type="text" v-model="searchName">
      </div>
      <div class="form_group">
        <label for="sel1">Brand</label>
        <select id="sel1" v-model="searchBrand" >
          <option v-for="(brand , i)  in brands"  v-bind:key="i">
            {{ brand }}
          </option>
        </select>
      </div>
      <div class="form_group">
        <label for="sel2">Price</label>
        <select id="sel2"  v-model="searchPrice" >
          <option > High to low </option>
          <option > Low to high </option>
        </select>
      </div>
      <div class="form_group">
        <button type="button" class="clear-btn" @click="clearSearchBar()">Clear</button>
      </div>
    </div>
    <div class="product-list">
      <div v-if="productsShowList" v-for="(product , i) in productsShowList" :key="i">
        <Product :product="product"/>
      </div>
    </div>
    <div class="pagination-bar" v-if="productsShowList">
      <ul class="pagination" >
        <li class="pagination-item"  ><a ref="pre"  @click="movePage(-1)"><span aria-hidden="true" > Prev </span></a></li>
        <li class="pagination-item" v-for="i in pageCount()"  @click="changePage(i)" :key="i" ><button class="pagination-btn " :class="{'active-red': currentPage === i }"   >{{i}}</button></li>
        <li class="pagination-item"  ><a ref="aft" href="#" class="arrow-pgn" aria-label="Next"  @click="movePage(1)"><span aria-hidden="true" class="arrow-pgn" > Next </span></a></li>
      </ul>
    </div>
  </section>
</template>

<script>
  import Product from '~/components/Product.vue'
  import {mapGetters} from 'vuex';

  export default {
    components: {
      Product
    },

    data() {
      return {
        filteredProducts: null,
        searchName: '',
        searchBrand:'',
        searchPrice:'',
        currentPage: 1,
        pageSize: 5,
        totalPage: '',
        productsShowList:null
      }
    },

    computed: {
      ...mapGetters({
        products: "products/list",
        brands: "products/brandList",
      }),

    },

    async mounted() {
      this.$store.dispatch('products/getProducts').then(() => {
        this.filteredProducts = this.products;
      });
    },

    methods: {
      pageCount () {
        return Math.ceil( (this.filteredProducts.length  / this.pageSize) )
      },

      changePage (page) {
        this.currentPage = page
      },

      movePage(i) {
        if( (this.currentPage + i) <=  this.pageCount() && (this.currentPage + i) > 0 ){
          this.currentPage = this.currentPage + i;
        }
      },

      clearSearchBar() {
        this.searchBrand  = '';
        this.searchPrice  = '';
        this.searchName  = '';
        this.filteredProducts = this.products;
        this.currentPage = 1;
      },

      filterByName(el){
        let search = el.toLowerCase();
        let filtered = this.filteredProducts.filter((product) => {
          let searchString = product.name.toLowerCase();
          return searchString.indexOf(search) !== -1;
        });
        this.filteredProducts = filtered;
      },

      filterByBrand(brand){
        let filter = this.filteredProducts.filter((product) => {
          return product.brand === brand;
        });
        this.filteredProducts = filter;
      },

      filterByPrice(price){
        let res = null;
        if(price === "High to low"){
          res = this.filteredProducts.slice().sort( (a , b )=> b.price - a.price);
        }else{
          res = this.filteredProducts.slice().sort( (a , b )=> a.price - b.price )
        }
        this.filteredProducts = res;
      }
    },


    watch: {
      searchName(el) {
        this.filteredProducts = this.products;
        if(this.searchBrand !== ''){
          this.filterByBrand(this.searchBrand)
        }

        if(this.searchPrice !== ''){
          this.filterByPrice(this.searchPrice)
        }

        this.filterByName(el);
      },

      searchBrand(brand){
        this.filteredProducts = this.products;
        if(this.searchName !== ''){
          this.filterByName(this.searchName);
        }

        if(this.searchPrice !== ''){
          this.filterByPrice(this.searchPrice)
        }

        this.filterByBrand(brand);
      },

      searchPrice(price){
        this.filteredProducts = this.products;
        if(this.searchBrand !== ''){
          this.filterByBrand(this.searchBrand)
        }

        if(this.searchName !== ''){
          this.filterByName(this.searchName);
        }

        this.filterByPrice(price);
      },

      filteredProducts(){
        let start = (this.currentPage - 1) * this.pageSize;
        let end = start + this.pageSize;
        this.productsShowList = this.filteredProducts.slice(start, end);
      },

      currentPage(){
        let start = (this.currentPage - 1) * this.pageSize;
        let end = start + this.pageSize;
        this.productsShowList = this.filteredProducts.slice(start, end);
      }
    }
  }
</script> class=pagination-item

<style scoped>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;

  }

  .product-list {
    min-height: 600px;
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .search-bar {
    display: flex;
    width: 90%;
    padding: 10px;
    margin: auto;
    align-items: flex-end;
  }

  .form_group {
    width: 25%;
    padding: 20px 0;
    margin: 0 10px;
    /*display: flex;*/
    /*align-items: flex-end;*/
    /*overflow: hidden;*/
  }

  .form_group label {
    font-size: 20px;
    display: inline-block;
    padding-right: 10px;
  }

  select, input {
    padding: 10px;
    width: 75%;
    line-height: 1.2;
    border: none;
    background: none;
    border-bottom: 1px solid #ccca10;
    outline: none;
  }

  select {
    /* for Firefox */
    -moz-appearance: none;
    /* for Chrome */
    -webkit-appearance: none;
    background: url('~assets/img//Path.svg');
    background-position: 95% 50%;
    background-repeat:no-repeat;
    outline: none;
  }

  select::-ms-expand {
    display: none;
  }

  .clear-btn{
    padding: 10px;
    line-height: 1.2;
    width: 60%;
    /*background-color: yellow;*/
    box-shadow: 0px 0px 5px 1px rgb(224, 230, 80);
    border-radius: 15px 0px 15px 2px;
    border: none;
    background-color: #ffffff;
  }
  .clear-btn:hover {
    box-shadow: 0px 0px 5px 1px rgb(226, 230, 11);
    transform: scale(1.01);
  }

  .pagination-bar {
    width: 300px;
    height: 20px;
  }

  .pagination{
    cursor: pointer;
  }

  .pagination-item{
    list-style-type: none;
    color: #526488;
    cursor: pointer !important;
    display: inline;
  }
  .pagination-item a{
    text-decoration: none;
    color: #526488;
    cursor: pointer !important;
  }

  .pagination-item a:hover{
    color: #4c885b;
  }

  .active-red{
    background-color: #ffa199;
  }

  .pagination-btn{
    cursor: pointer ;
  }

</style>

