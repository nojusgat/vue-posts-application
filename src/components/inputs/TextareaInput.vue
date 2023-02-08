<template>
  <div class="field">
    <slot></slot>
    <div class="control" :class="{ 'has-icons-right': error }">
      <textarea
        :class="['textarea', { 'is-danger': error }]"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
        >{{ value }}</textarea>
      <span v-if="error" class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p v-if="error" class="help is-danger">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "TextareaInput",
  props: {
    error: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ""
    }
  }
};
</script>
