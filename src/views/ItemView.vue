<template>
  <div  v-if="item">
    <template v-if="item">
      <div>
        <a :href="item.url" target="_blank">
          <h2>{{ item.title }}</h2>
        </a>
        <span v-if="item.url" class="host">
          ({{ item.url | host }})
        </span>
        <p class="meta">
          {{ item.score }} points | by
          <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
          {{ item.time | timeAgo }} ago
        </p>
      </div>
      <div class="">
        <p class="ui dividing header">
          {{ item.kids ? item.descendants + ' comments' : 'No comments yet.'}}
        </p>
        <ul v-if="item.kids" class="comment-children">
          <comment v-for="id in item.kids" :id="id"></comment>
        </ul>
      </div>
      <form class="ui reply form">
        <div class="field">
          <textarea></textarea>
        </div>
        <div class="ui blue labeled submit icon button">
          <i class="icon edit"></i> 回复
        </div>
      </form>
    </template>
  </div>
</template>

<script>

import Comment from '../components/Comment.vue'

function fetchItem (store) {
  return store.dispatch('FETCH_ITEMS', {
    ids: [store.state.route.params.id]
  })
}

export default {
  name: 'item-view',
  components: { Comment },
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },
  preFetch: fetchItem,
  beforeMount () {
    fetchItem(this.$store)
  }
}
</script>