import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
    authors: [],
    modalIsActive: false,
    modalComponent: "",
    modalProps: {},
    message: { type: "error", text: "" }
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    addArticle(state, article) {
      state.articles.push(article);
    },
    updateArticle(state, article) {
      let index = state.articles.findIndex(a => a.id == article.id);
      if (index == -1) return;

      state.articles[index].title = article.title;
      state.articles[index].body = article.body;
      state.articles[index].updated_at = article.updated_at;
    },
    removeArticle(state, article) {
      state.articles = state.articles.filter(a => a.id != article.id);
    },
    setAuthors(state, authors) {
      state.authors = authors;
    },
    openModal(state, { component, props }) {
      state.modalIsActive = true;
      state.modalComponent = component;
      state.modalProps = props;
    },
    closeModal(state) {
      state.modalIsActive = false;
      state.modalComponent = "";
      state.modalProps = {};
    },
    sendMessage(state, { type, text }) {
      state.message.type = type;
      state.message.text = text;
    }
  },
  actions: {
    loadAuthors({ commit }) {
      Vue.prototype.$http.get("/authors").then(response => {
        commit("setAuthors", response.data);
      });
    }
  }
});
