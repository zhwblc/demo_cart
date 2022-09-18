<template>
  <div class="app-container">
    <EsHeader title="购物车案例"></EsHeader>
    <EsGoods
      v-for="item in goodsList"
      :key="item.id"
      :id="item.id"
      :thumb="item.goods_img"
      :title="item.goods_name"
      :price="item.goods_price"
      :count="item.goods_count"
      :checked="item.goods_state"
      @stateChange="onGoodsStateChange"
      @countChange="onGoodsCountChange"
    />
    <EsFotter :total="0" :amount="0" @fullChang="onFullSateChang"></EsFotter>
  </div>
</template>

<script>
import EsHeader from './components/es-header/EsHeader.vue'
import EsFotter from './components/es-footer/EsFooter.vue'
import EsGoods from './components/es-goods/EsGoods.vue'

export default {
  name: 'MyApp',
  components: {
    EsHeader,
    EsGoods,
    EsFotter,
  },
  data() {
    return {
      // 商品列表数据
      goodsList: [],
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表数据
    async getGoodsList() {
      const { data: res } = await this.$http.get('/api/cart')
      if (res.status !== 200) return alert('数据请求失败！')
      this.goodsList = res.list
    },
    // 监听选中状态变化的事件
    onFullSateChang(isFull) {
      // console.log(isFull)
      this.goodslist.forEach((x) => (x.goods_state = isFull))
    },
    // 监听商品选中状态的变化
    onGoodsStateChange({ id, value }) {
      // 根据 id 查找
      const findResult = this.goodslist.find((x) => x.id === id)
      // 找到对应的商品刷新其状态
      if (findResult) {
        findResult.goods_state = value
      }
    },
    onGoodsCountChange({ id, value }) {
      // 根据 id 查找
      const findResult = this.goodslist.find((x) => x.id === id)
      // 找到对应的商品刷新其数量
      if (findResult) {
        findResult.goods_count = value
      }
    },
  },
}
</script>

<style lang="less" scoped>
.app-container {
  padding-top: 45px;
}
</style>
