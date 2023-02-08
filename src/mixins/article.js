export const articleMixin = {
  computed: {
    calculateDate() {
      if(this.article == null) return;
      let created = new Date(this.article.created_at);
      let updated = new Date(this.article.updated_at);

      if (updated.getTime() > created.getTime())
        return updated.toLocaleString("lt-LT");

      return created.toLocaleString("lt-LT");
    }
  }
};
