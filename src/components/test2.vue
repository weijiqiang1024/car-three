<template>
  <div>
    <div class="hello" id="hello">
    </div>
    <div style="position:fixed;bottom:20px;left:50%;">
      <button @click="changeColor" style="width:70px;height:45px;line-height:40px;background:#1890FF;border:none;border-radius:4px;color:#fff;">换肤</button>
    </div>
  </div>
</template>

<script>
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      message: 'Welcome to Your Vue.js App',
      car: null,
      mixer: null,
      scene:null
    }
  },
  mounted() {
    this.drawCar();
  },
  methods: {
    drawCar() {
      let that = this
      this.scene = new this.THREE.Scene();
      const loader = new FBXLoader();

      loader.load(
        '/models/weima.FBX', (obj) => {
          obj.scale.multiplyScalar(0.001);
          this.scene.add(obj);
          //   obj.translateY(-2);
          //   obj.rotateX(-0.1);

          this.car = obj

          // 模型Mesh开启阴影
          this.car.scene.traverse(obj => {
            if (obj.isMesh) {
              obj.castShadow = true;
              obj.receiveShadow = true;
            }
          })

        }, function onProgress(xhr) {
          // 后台打印查看模型文件加载进度
          console.log(
            "加载完成的百分比" + (xhr.loaded / xhr.total) * 100 + "%"
          );
          const progress = (xhr.loaded / xhr.total) * 100;
          window.parent.postMessage(
            {
              data: progress
            },
            "*"
          );
        });

      // 设置地面
      let floorGeometry = new this.THREE.PlaneGeometry(5000, 5000, 1);
      let floorMaterial = new this.THREE.MeshPhongMaterial({
        color: 0x77F28F,
        shininess: 0,
        // wireframe: true
      });
      let floor = new this.THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -0.5 * Math.PI;
      floor.position.y = -2.1;
      // 地板接受阴影开启
      floor.receiveShadow = true;

      this.scene.add(floor);

      // 光源设置
      const pointLight = new this.THREE.PointLight(0xffffff);
      pointLight.intensity = 0.3;
      pointLight.position.set(0, 200, 300); // 点光源的位置
      pointLight.castShadow = true; // 开启阴影
      pointLight.shadow.mapSize = new this.THREE.Vector2(1024, 1024);
      this.scene.add(pointLight); // 点光源添加到场景中
      // 环境光
      const ambientLight = new this.THREE.AmbientLight(0xffffff);
      ambientLight.intensity = 1.6;
      this.scene.add(ambientLight);


      /**
       * 相机设置
       */
      const width = window.innerWidth; // 窗口宽度
      const height = window.innerHeight; // 窗口高度
      const k = width / height; // 宽高比
      const s = 2.5; // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机
      const camera = new this.THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      camera.position.set(0, 0, 200); // 设置相机位置
      camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)

      /**
       * 创建渲染器对象
       */
      const container = document.getElementById("hello");
      const renderer = new this.THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height); // 设置渲染区域尺寸
      renderer.setClearColor(0x393534, 1.0); // 设置背景颜色
      renderer.shadowMap.enabled = true;    // 开启阴影
      container.appendChild(renderer.domElement);

      // 创建一个时钟对象
      const clock = new this.THREE.Clock();
      function render() {
        renderer.render(that.scene, camera); // 执行渲染操作
        requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
        if (that.mixer) {
          // 更新混合器相关的时间
          that.mixer.update(clock.getDelta());
        }
      }
      render();

      //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
      const controls = new OrbitControls(camera, container);
      controls.enableZoom = true;
      controls.autoRotate  = true;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      controls.enablePan = true;

    },
    changeColor() {
    console.log(this.scene,99999999999)
      this.car.material.color.set(0xFF0000);
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
