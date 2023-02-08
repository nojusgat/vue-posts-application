import Vue from "vue";
import VueRouter from "vue-router";
import PostList from "../views/PostList.vue";
import PostDetails from "../views/PostDetails.vue";
import Error from "../views/Error.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/posts",
    name: "posts",
    component: PostList,
    alias: "/"
  },
  {
    path: "/posts/:id(\\d+)",
    name: "details",
    component: PostDetails
  },
  {
    path: "*",
    component: Error
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
