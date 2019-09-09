<template>
  <li :class="cardClassNames" @click="$emit('click')">
    <div :class="['animation-inner', 'inner']">
      <div class="front">
        <i class="mark">{{ mark }}</i>
      </div>
      <div class="back" />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    mark: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 1
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cardClassNames() {
      return [
        { selected: this.selected },
        'card',
        `${this.mark}`,
        `${this.mark}_${this.num}`,
        `num_${this.num}`
      ]
    }
  }
}
</script>

<style scoped>
.selected .inner {
  transform: rotateY(180deg);
}

/* card */
:root {
  --marks: (spade: ♠, heart: ♥, club: ♣, dia: ♦);
}

.♥,
.♦ {
  color: var(--card-red-color);
}

.♣ {
  color: var(--card-clover-color);
}

.card {
  width: var(--card-width);
  height: var(--card-height);
  perspective: 1000;
  position: relative;
  list-style-type: none;
}

.inner {
  width: var(--card-width);
  height: var(--card-height);
  border-radius: var(--card-border-radius);
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  font-family: helvetica;
  transition: all 1s ease;
  transform-style: preserve-3d;
  transition: 0.6s;
}

.front,
.back {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: var(--card-border-width) solid var(--card-border-color);
  box-sizing: border-box;
  border-radius: var(--card-border-radius);
}

.front {
  background-color: #fff;
  transform: rotateY(0);
  display: table;
  vertical-align: middle;
  overflow: hidden;

  &:before,
  &:after {
    display: block;
    padding: 10px;
    width: 100%;
    position: absolute;
    white-space: pre;
    display: block;
    -webkit-box-reflect: right;
    box-sizing: border-box;
    line-height: 1.4;
    text-align: left;
    font-size: 20px;
  }
  &:before {
    top: 0;
    left: 0;
  }
  &:after {
    right: 0;
    bottom: 0;
    transform: rotate(-180deg);
  }
}

.back {
  transform: rotateY(-180deg);

  background-color: var(--back-bg);
  background-image: var(--back-image);
  background-size: 37px 37px;
}

@each $key, $mark in var(--marks) {
  .$(mark)_1 .front:before,
  .$(mark)_1 .front:after {
    content: 'A\A$(mark)';
  }
}

@for $i from 2 to 13 {
  @each $key, $mark in var(--marks) {
    .$(mark)_$(i) .front:before,
    .$(mark)_$(i) .front:after {
      content: '$(i)\A$(mark)';
    }
  }
}

/* mark */
.mark {
  font-size: var(--mark-size);
  white-space: pre;
  text-align: center;
  display: block;
  font-style: normal;
  &:before,
  &:after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
}

@each $key, $mark in var(--marks) {
  .$(mark) {
    & .mark:before {
      content: '$mark';
    }
  }
}

/* number1 */
.num_1 {
  & .mark {
    display: table-cell;
    vertical-align: middle;
    &:before {
      display: none;
    }
  }
}

/* number2 */
.num_2 {
  & .mark {
    line-height: calc(var(--card-height) / 2);
    -webkit-box-reflect: below;
    vertical-align: top;
    display: block;
    &:before {
      display: none;
    }
  }
}

/* number3 */
.num_3 {
  & .mark {
    line-height: var(--card-height);
    position: relative;

    &:before {
      line-height: calc(var(--card-height) / 2);
      -webkit-box-reflect: below;
      vertical-align: top;
      right: 0;
      width: 100%;
    }
  }
}

/* number4 */
.num_4 {
  & .mark {
    text-indent: -9999px;
    &:before {
      line-height: calc(var(--card-height) / 2);
      text-indent: 0;

      width: 100%;
      text-align: center;
      -webkit-box-reflect: below;
    }
  }
}

@each $key, $mark in var(--marks) {
  .$(mark).num_4 {
    & .mark:before {
      content: '$mark       $mark';
    }
  }
}

/* number5 */
.num_5 {
  @extend .num_4;
  & .mark {
    text-indent: 0;
    line-height: calc(var(--card-height));
  }
}
@each $key, $mark in var(--marks) {
  .$(mark).num_5 {
    & .mark:before {
      content: '$(mark)       $(mark)';
    }
  }
}

/* number6 */
.num_6 {
  @extend .num_3;

  & .mark {
    width: 50%;
    -webkit-box-reflect: right;
  }
}

/* number7 */
.num_7 {
  @extend .num_5;
  & .mark {
    line-height: calc(var(--card-height) / 1.3);

    &:after {
      width: 50%;
      line-height: calc(var(--card-height));
      -webkit-box-reflect: right;
    }
  }
}

@each $key, $mark in var(--marks) {
  .$(mark).num_7 {
    & .mark:before {
      content: '$mark       $mark';
    }
    & .mark:after {
      content: '$mark';
    }
  }
}

/* number8 */
.num_8 {
  @extend .num_5;
  & .mark {
    text-indent: -9999px;

    &:before {
      -webkit-box-reflect: below calc(var(--card-height) / 8);
    }
    &:after {
      width: 50%;
      text-indent: 0;
      line-height: calc(var(--card-height));
      -webkit-box-reflect: right;
    }
  }
}
@each $key, $mark in var(--marks) {
  .$(mark).num_8 {
    & .mark:before {
      top: calc(var(--card-height) / 8 * 1.5);
      content: '$(mark)       $(mark)\A$(mark)';
      line-height: calc(var(--card-height) / 8);
    }
    & .mark:after {
      content: '$mark';
    }
  }
}

/* number9 */
.num_9 {
  & .mark {
    display: table-cell;
    vertical-align: middle;

    &:before {
      line-height: calc(var(--card-height) / 5);

      width: 100%;
      text-align: center;
      top: calc(var(--card-height) / 5 / 2);
      -webkit-box-reflect: below;
    }
  }
}

@each $key, $mark in var(--marks) {
  .$(mark).num_9 {
    & .mark:before {
      content: '$(mark)       $(mark)\A$(mark)       $(mark)';
    }
  }
}

/* num 10 */
.num_10 {
  & .mark {
    height: 50%;
    line-height: calc(var(--card-height) / 5 * 3);
    -webkit-box-reflect: below;
    &:before {
      line-height: calc(var(--card-height) / 5);
      width: 100%;
      text-align: center;
      top: calc(var(--card-height) / 5 / 2);
    }
  }
}
@each $key, $mark in var(--marks) {
  .$(mark).num_10 {
    & .mark:before {
      content: '$(mark)       $(mark)\A$(mark)       $(mark)';
    }
  }
}

.num_11,
.num_12,
.num_13 {
  & .mark {
    text-indent: -9999px;
    &:before {
      text-indent: 0;
      width: 100%;
      text-align: center;
      font-size: 6em;
      font-weight: bold;
      line-height: calc(var(--card-height));
    }
    &:after {
      text-indent: 0;
      font-size: 45px;
      width: 100%;
      line-height: calc(var(--card-height));
    }
  }
}

@each $key, $mark in var(--marks) {
  .$(mark).num_11,
  .$(mark).num_12,
  .$(mark).num_13 {
    & .mark:after {
      content: '$(mark)';
    }
  }
}

/* num 11 */
.num_11 {
  & .mark {
    &:before {
      content: 'J';
    }
    &:after {
      top: -18px;
      left: -38px;
    }
  }
}

/* num 12 */
.num_12 {
  & .mark {
    &:before {
      content: 'Q';
    }
    &:after {
      top: -3px;
    }
  }
}

/* num 13 */
.num_13 {
  & .mark {
    &:before {
      content: 'K';
    }
    &:after {
      top: -10px;
      left: 50px;
    }
  }
}
</style>
