<template>
  <dl class="field">
    <dt class="field-label"><slot name="label" /></dt>
    <dt class="field-content"><slot name="content" /></dt>
  </dl>
</template>

<style scoped>
.field {
  margin: 0 5%;
  display: flex;
  margin-bottom: 32px;
  border-bottom: var(--border-bottom);
  &:first-of-type {
    border-top: var(--border-bottom);
  }
  & + .field {
    margin-bottom: 0;
  }
}

.field-label {
  width: 30%;
  font-size: 15px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  padding: 8px;
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 0;
    bottom: 2px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.02);
  }
}

.field-content {
  padding: 8px;
  width: 70%;
}
</style>
