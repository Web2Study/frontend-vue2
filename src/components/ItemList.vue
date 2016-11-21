<template>
  <div class="ui segment">
    <div class="ui dimmer" :class="loading? 'active' : '' ">
      <div class="ui inverted large text loader">加载中</div>
    </div>
    <div>
      <div class="ui labeled icon button">
  <i class="left arrow icon"></i>
  <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">上页</router-link>
      <a v-else class="disabled">上页</a>
</div>
      <span>{{ page }}/{{ maxPage }}</span>
      <div class="ui right labeled icon button">
  <i class="right arrow icon"></i>
   <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">更多</router-link>
      <a v-else class="disabled">更多</a>
     
</div>
 <button class="ui primary button" @click="addNewItem">新增</button>
      <transition :name="transition">
        <div class="ui three doubling cards" :key="displayedPage" v-if="displayedPage > 0">

          <item v-for="item in displayedItems" :key="item.id" :item="item">
          </item>

        </div>
      </transition>
    </div>
  <div class="ui labeled icon button">
  <i class="left arrow icon"></i>
  <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">上页</router-link>
      <a v-else class="disabled">上页</a>
</div>
      <span>{{ page }}/{{ maxPage }}</span>
      <div class="ui right labeled icon button">
  <i class="right arrow icon"></i>
   <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">更多</router-link>
      <a v-else class="disabled">更多</a>
</div>

  </div>

</template>

<script>
//import Spinner from './Spinner.vue'
import Item from './Item.vue'
import API from '../api'

export default {
  name: 'item-list',

  components: {
 //   Spinner,
    Item
  },

  props: {
    type: String
  },

  data () {
    const isInitialRender = !this.$root._isMounted
    return {
      loading: false,
      transition: 'slide-left',
      // if this is the initial render, directly render with the store state
      // otherwise this is a page switch, start with blank and wait for data load.
      // we need these local state so that we can precisely control the timing
      // of the transitions.
      displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
      displayedItems: isInitialRender ? this.$store.getters.activeItems : []
    }
  },
 created(){
  // console.log(this.type)
   //if (this.type==='top')
    //businessMgr.updateTop()
 },
  computed: {
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    maxPage () {
      const { itemsPerPage, lists } = this.$store.state
      return Math.ceil(lists[this.type].length / itemsPerPage)
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },

  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
     
    }
    // watch the current list for realtime updates
    this.unwatchList = API.businessMgr.watchList(this.type, ids => {
      this.$store.commit('SET_LIST', { type: this.type, ids })
      this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
        this.displayedItems = this.$store.getters.activeItems
      })
    })
  },

  beforeDestroy () {
    this.unwatchList()
  },

  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },

  methods: {
    addNewItem(){
        let u=API.businessMgr.curUser()
        let demo={
              "uid": u.uid,
              "by": u.displayName,
              "descendants": 0,
              "score": 0,
              "time": Date.now(),
              "title": "this is test",
              "type": "story"
            }
        API.businessMgr.addItem(demo)
                
    },
    loadItems (to = this.page, from = -1) {
      this.loading = true
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          //this.$router.replace(`/${this.type}/1`)
          this.$route.path.replace(`/${this.type}/1`)
          //return
        }
        this.transition = to > from ? 'slide-left' : 'slide-right'
        this.displayedPage = to
        this.displayedItems = this.$store.getters.activeItems
        this.loading = false
      })
    }
  }
}
</script>