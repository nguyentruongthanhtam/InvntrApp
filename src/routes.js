
// import phillipsComp from './assets/vue/pages/phillipsTab.vue'
import search from './assets/vue/pages/searchComp.vue'
import itemList from './assets/vue/pages/itemList.vue'
import item from './assets/vue/pages/item.vue'
export default [
  {
    path: '/about/',
    component: require('./assets/vue/pages/about.vue')
  },
  {
    path: '/form/',
    component: require('./assets/vue/pages/form.vue'),
    props: true,
  },
  {
    path: '/items/',
    component: itemList
  },
  {
    path: '/item/:v/:id',
    component: item,
    props: true,
  },
  {
    path: '/search/',
    component: search,
    
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: require('./assets/vue/pages/dynamic-route.vue')
  }
]
