<template>
  <div id="app">
    <canvas
      id="canvas"
      ref="canvas"
      :height="h"
      :width="w"
      style="border-style: solid"
    >
    </canvas>
    <button @click="renderProjectile">Render Projectile</button>
  </div>
</template>

<script>
import { Tuple } from "@/Tuple";
import { Color } from "@/Color";
import { Canvas } from "@/Canvas";

export default {
  name: "app",
  data: function() {
    return {
      w: 900,
      h: 550,
      imgData: []
    };
  },
  mounted() {
    var ctx = this.$refs.canvas.getContext("2d");
    this.imgData = ctx.getImageData(0, 0, this.w, this.h);
  },
  methods: {
    renderProjectile() {
      console.log("RenderProjectile");
      const data = this.imgData.data;

      let start = Tuple.point(0, 1, 0);
      let velocity = Tuple.vector(1, 1.8, 0)
        .normalize()
        .multiply(11.25);
      let position = start;
      let gravity = Tuple.vector(0, -0.1, 0);
      let wind = Tuple.vector(-0.01, 0, 0);
      let canvas = new Canvas(900, 550);

      for (let i = 0; i < 150; i++) {
        position = position.add(velocity);
        velocity = velocity.add(gravity).add(wind);
        // console.log(Math.round(position.x), ", ", Math.round(position.y));
        canvas.writePixel(
          Math.round(position.x),
          Math.round(canvas.height - position.y),
          new Color(1, 1, 1)
        );
        let index =
          ((canvas.height - Math.round(position.y)) * this.w +
            Math.round(position.x)) *
          4;
        data[index] = 255;
        data[index + 1] = 0;
        data[index + 2] = 0;
        data[index + 3] = 255;
      }

      this.imgData = new ImageData(data, this.w, this.h);
      var ctx = this.$refs.canvas.getContext("2d");
      ctx.putImageData(this.imgData, 0, 0);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
