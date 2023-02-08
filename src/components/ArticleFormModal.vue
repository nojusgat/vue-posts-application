<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ title }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body">
      <Input
        v-model="input.title"
        placeholder="Enter article title"
        :error="error.title"
      >
        <label class="label">Title</label>
      </Input>

      <SelectInput
        v-if="article == null"
        v-model="input.author"
        :error="error.author"
      >
        <label class="label">Author</label>
        <template #options>
          <option disabled value="">Please select one</option>
          <option v-for="author in authors" :value="author.id">
            {{ author.name }}
          </option>
        </template>
      </SelectInput>

      <TextareaInput
        v-model="input.body"
        placeholder="Enter article content"
        :error="error.body"
      >
        <label class="label">Content</label>
      </TextareaInput>
    </section>
    <footer class="modal-card-foot">
      <button
        @click="submit"
        class="button is-success"
        :class="{ 'is-loading': loading }"
      >
        Submit
      </button>
      <button class="button" @click="closeModal">Cancel</button>
    </footer>
  </div>
</template>

<script>
import { messageMixin } from "../mixins/message";

import Input from "./inputs/Input.vue";
import TextareaInput from "./inputs/TextareaInput.vue";
import SelectInput from "./inputs/SelectInput.vue";

export default {
  name: "ArticleFormModal",
  mixins: [messageMixin],
  components: {
    Input,
    TextareaInput,
    SelectInput
  },
  data() {
    return {
      loading: false,
      input: {
        title: "",
        author: "",
        body: ""
      },
      error: {
        title: null,
        author: null,
        body: null
      }
    };
  },
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  methods: {
    postArticle() {
      this.loading = true;
      this.$http
        .post("/articles", {
          ...this.input,
          created_at: new Date().toJSON(),
          updated_at: new Date().toJSON()
        })
        .then(response => {
          this.$store.commit("addArticle", response.data);
          this.showMessage("success", "Article has been created");
        })
        .catch(err => {
          console.error(err);
          this.showMessage(
            "error",
            "Got an error while creating article. Try again later"
          );
        })
        .finally(() => {
          this.loading = false;
          this.closeModal();
        });
    },
    patchArticle() {
      this.loading = true;
      this.$http
        .patch(`/articles/${this.article.id}`, {
          title: this.input.title,
          body: this.input.body,
          updated_at: new Date().toJSON()
        })
        .then(response => {
          this.$store.commit("updateArticle", response.data);
          this.showMessage("success", "Article has been updated");
        })
        .catch(err => {
          console.error(err);
          this.showMessage(
            "error",
            "Got an error while updating article. Try again later"
          );
        })
        .finally(() => {
          this.loading = false;
          this.closeModal();
        });
    },
    validate() {
      this.error = Object.keys(this.error).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {});

      if (this.input.title == "") {
        this.error.title = "Title can no be empty";
      }

      if (this.input.author == "" && this.article == null) {
        this.error.author = "Author should be selected";
      }

      if (this.input.body == "") {
        this.error.body = "Body can not be empty";
      }

      return Object.values(this.error).some(el => el != null);
    },
    submit() {
      if (this.loading) return;
      if (this.validate()) return;

      if (this.article == null) {
        this.postArticle();
      } else {
        this.patchArticle();
      }
    },
    closeModal() {
      this.$store.commit("closeModal");
    }
  },
  computed: {
    authors: {
      get() {
        return this.$store.state.authors;
      },
      set(value) {
        this.$store.commit("setAuthors", value);
      }
    },
    title() {
      return this.article == null ? "Create Article" : "Edit Article";
    }
  },
  created() {
    if (this.article != null) {
      this.input.title = this.article.title;
      this.input.body = this.article.body;
    }
  }
};
</script>
