<template>
  <header class="header">
    <h1 class="title">
      <nuxt-link to="/">{{ TITLE }}</nuxt-link>
    </h1>

    <nav>
      <ul class="nav">
        <li class="nav-item">
          <nuxt-link to="/">
            <i class="fas fa-home" />
            Home
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/about">
            <i class="fas fa-question" />
            About
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    TITLE: () => process.env.TITLE
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  z-index: 1000;
}
.title {
  z-index: 11;
  & a {
    display: block;
    padding: 4px 8px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    letter-spacing: 0.08em;
    color: #fff;
    border-radius: 0 0 4px 0;
    background-color: var(--main-color);
    text-decoration: none;
  }
}

.nav {
  position: absolute;
  top: 10px;
  right: 0;
  display: flex;
  z-index: 1000;
}

.nav-item {
  list-style-type: none;
  font-size: 12px;
  margin-right: 16px;
  letter-spacing: 0.5px;
  & a {
    color: #9e9e9e;
    text-decoration: none;
    &:hover {
      color: var(--main-color);
      text-decoration: underline;
    }
  }
}
</style>
