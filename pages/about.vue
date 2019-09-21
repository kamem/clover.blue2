<template>
  <Content>
    <template slot="title"
      >{{ TITLE }}について</template
    >
    <template slot="body">
      <figure class="normal abubu">
        <img src="/abubu.png" />
      </figure>
      <p>
        HTML, CSS, Javascript,
        デザインの記事や日記を書いたり。写真や作品を載せています。
      </p>
      <section>
        <h2>kamem: かめ</h2>
        <p>
          Design / Photoshop / Illustrator / HTML / CSS / Sass / PostCss /
          Javascript / jQuery / Typescript / AngularJS / Babel / React / Vue /
          Node
        </p>
        <p>
          フリーでWebを制作する仕事をしています。<br />専門学校で講師をしています。
        </p>

        <p>
          HTML,CSS,Javascriptを使ってフロントエンドな仕事を中心に活動しています。<br />
          主にプロジェクトに参加してサイトを作っています。
        </p>

        <p>デザインを作るのも好きです。</p>

        <p>
          自分でひらめいたことを作ったりするのが好きです。<br />
          読書、イラスト、カラオケ、お酒とか好き。
        </p>

        <p>スポーツはテニス、野球が好きです。</p>
      </section>
    </template>
  </Content>
</template>

<script>
import Content from '~/components/Content.vue'

export default {
  head() {
    return { title: `${this.TITLE}について` }
  },
  scrollToTop: false,
  transition: {
    name: 'page',
    mode: ''
  },
  components: {
    Content
  },
  computed: {
    TITLE: () => process.env.TITLE
  },
  jsonld() {
    return {
      '@context': 'http://schema.org',
      '@type': 'Person',
      name: process.env.AUTHOR_NAME,
      alternateName: `@${process.env.AUTHOR_NAME}`,
      mainEntityofPage: {
        '@type': 'ProfilePage',
        '@id': `https://${process.env.TITLE}/about/`
      },
      image: `https://${process.env.TITLE}/abubu.png`
    }
  }
}
</script>

<style>
.abubu {
  text-align: center;
  margin-bottom: 40px;
  & img {
    border-radius: 50%;
  }
}
</style>
