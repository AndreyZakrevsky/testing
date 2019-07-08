export const state = () => ({
  products: null,
  allBtands: null
});

export const mutations = {
  SET_PRODUCTS(state, data) {
    state.products = data;
  },
  SET_ALL_BRANDS(state, data) {
    state.allBtands = data;
  }
};

export const actions = {
  async getProducts({commit}) {
    try {
      let allBrands = {};
      let {data} = await this.$axios.get('data.json');
      commit("SET_PRODUCTS", data);
      data.map( (el)=>{ allBrands[el.brand] = null } );
      commit("SET_ALL_BRANDS", Object.keys(allBrands));
    } catch (e) {
      console.log(e)
    }
  }
};

export const getters = {
  list: (state) => state.products,
  brandList: (state) => state.allBtands,
};








