<template>
  <p class="switch" :class="{ on: selected }" @click="onClick">
    <input :id="id" class="switch-button" type="checkbox" />
    <label class="switch-label-on">ON</label>
    <label class="switch-label-off">OFF</label>
  </p>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    id() {
      return `${this.name}-switch-button`
    }
  },
  methods: {
    onClick() {
      this.$emit('click', !this.selected)
    }
  }
}
</script>

<style scoped>
.switch {
  --switch-width: 72px;
  --switch-size: 32px;
  --switch-padding: 2px;
  --switch-size-half: calc(var(--switch-size) / 2);
  --switch-label-width: calc(var(--switch-width) - var(--switch-size));

  margin: 0;
  position: relative;
  background-color: #ccc;
  box-sizing: border-box;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
  width: var(--switch-width);
  height: var(--switch-size);
  border-radius: var(--switch-size-half);
  transition: all 0.5s;
  & > * {
    cursor: pointer;
  }
}

.switch-button {
  --switch-button-size: calc(var(--switch-size) - (var(--switch-padding) * 2));
  background-color: #fff;
  display: block;
  position: absolute;
  margin: auto 0;
  top: 0;
  bottom: 0;
  left: var(--switch-padding);
  height: var(--switch-button-size);
  width: var(--switch-button-size);
  appearance: none;
  border-radius: var(--switch-size-half);
  transition: all 0.5s;
}

.switch-label-on,
.switch-label-off {
  position: absolute;
  line-height: var(--switch-size);
  top: 0;
  font-size: 11px;
  transition: all 0.2s;
  color: #fff;
  width: var(--switch-label-width);
  letter-spacing: 1px;
  text-align: center;
}
.switch-label-on {
  left: 0;
  opacity: 0;
}
.switch-label-off {
  left: var(--switch-size);
  opacity: 1;
}

.on {
  &.switch {
    background-color: var(--main-color);
  }
  & .switch-button {
    left: calc(var(--switch-label-width) + 1px);
  }
  & .switch-label-on {
    opacity: 1;
  }
  & .switch-label-off {
    opacity: 0;
  }
}
</style>
