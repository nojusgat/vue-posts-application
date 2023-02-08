<template>
  <div class="field">
    <slot></slot>
    <div class="control" :class="{ 'has-icons-right': error }">
      <input
        :class="['input', { 'is-danger': error }]"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <span v-if="error" class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p v-if="error" class="help is-danger">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    error: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
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
