<template>
  <div class="hello" id="hello">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      message: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      const renderer = new this.THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('hello').appendChild(renderer.domElement);

      const camera = new this.THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
      camera.position.set(0, 0, 100);
      camera.lookAt(0, 0, 0);

      const scene = new this.THREE.Scene();

      const material = new this.THREE.LineBasicMaterial({ color: 0x0000ff });

      const points = [];
      points.push(new this.THREE.Vector3(-10, 0, 0));
      points.push(new this.THREE.Vector3(0, 10, 0));
      points.push(new this.THREE.Vector3(10, 0, 0));

      const geometry = new this.THREE.BufferGeometry().setFromPoints(points);

      const line = new this.THREE.Line(geometry, material);

      scene.add(line);
      renderer.render(scene, camera);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  width: 100vw;
  height: 100vh;
}
</style>
