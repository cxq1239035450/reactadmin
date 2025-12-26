import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const ChristmasTree = () => {
  const threetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. 初始化场景、相机、渲染器
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000011, 50, 200); // 深空雾效，远处星星渐隐

    // 透视相机：视角75°，宽高比适配窗口，近裁切面0.1，远裁切面1000
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30); // 初始相机位置

    // WebGL渲染器：开启抗锯齿，支持阴影
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // 适配高清屏幕
    threetRef.current?.appendChild(renderer.domElement);

    // 2. 添加轨道控制器（鼠标交互）
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 阻尼效果，旋转更顺滑
    controls.dampingFactor = 0.05;
    controls.autoRotate = true; // 开启自动旋转
    controls.autoRotateSpeed = 0.3; // 自动旋转速度
    controls.minDistance = 5;  // 最小距离：相机最多靠近目标点到 5 单位（放大上限）
    controls.maxDistance = 50; // 最大距离：相机最多远离目标点到 50 单位（缩小下限）
    controls.minPolarAngle = Math.PI / 4; // 最小垂直角度：限制相机不能低于 45°
    controls.maxPolarAngle = Math.PI / 2; // 最大垂直角度：限制相机不能高于 90°
    controls.enableZoom = true; // 允许缩放（默认 true，可省略）

    // 3. 创建星云背景（半透明渐变平面）
    function createNebula() {
      // 创建一个超大平面，覆盖整个视野
      const geometry = new THREE.SphereGeometry(10, 64, 32);
      // 渐变材质：从中心蓝色渐变到边缘黑色，半透明
      const glassMaterial  = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, // 玻璃颜色（白色=无色透明，可改为淡蓝/淡绿模拟有色玻璃）
        roughness: 0.02, // 粗糙度：0=完全光滑（镜面），0.02 模拟轻微杂质
        metalness: 0.05, // 金属度：0=非金属，0.05 增强反射质感
        transmission: 0.98, // 透射率：0=不透明，1=完全透明（玻璃建议 0.9~0.98）
        ior: 1.5, // 折射率：玻璃的标准折射率（1.5~1.6），越高折射越明显
        transparent: true, // 开启透明
        side: THREE.DoubleSide, // 双面渲染（避免球体内部看不到）
        envMapIntensity: 1.2 // 环境贴图强度：增强反射/折射效果
      });
      const nebula = new THREE.Mesh(geometry, glassMaterial);
      nebula.position.z = 0; // 放在相机后方，作为背景
      scene.add(nebula);
    }

    // 4. 创建恒星系统（核心功能）
    function createStars(count = 3000) {
      // 存储所有星星的位置、大小、颜色数据
      const positions = [];
      const sizes = [];
      const colors = [];
      const alphas = []; // 用于闪烁的透明度数据

      // 随机生成星星数据
      for (let i = 0; i < count; i++) {
        // 随机位置：在 [-100, 100] 空间内分布
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        positions.push(x, y, z);

        // 随机大小：1~5 像素，模拟星星远近差异
        const size = Math.random() * 4 + 1;
        sizes.push(size);

        // 随机颜色：白色、浅蓝色、浅黄色（模拟不同恒星光谱）
        const color = new THREE.Color();
        const colorType = Math.random();
        if (colorType < 0.7) color.setHex(0xffffff); // 70% 白色星
        else if (colorType < 0.9) color.setHex(0xADD8E6); // 20% 蓝色星
        else color.setHex(0xFFFFE0); // 10% 黄色星
        colors.push(color.r, color.g, color.b);

        // 初始透明度：0.5~1，用于闪烁动画
        alphas.push(Math.random() * 0.5 + 0.5);
      }

      // 创建粒子几何体（BufferGeometry 性能更高）
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1));

      // 粒子材质：使用 PointsMaterial 渲染点（星星）
      const material = new THREE.ShaderMaterial({
        uniforms: {
          // 传递时间变量，用于闪烁动画
          time: { value: 0 }
        },
        vertexShader: `
                    attribute float size;
                    attribute vec3 color;
                    attribute float alpha;
                    varying vec3 vColor;
                    varying float vAlpha;
                    void main() {
                        vColor = color;
                        vAlpha = alpha;
                        // 计算粒子位置
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = size * (10.0 / -mvPosition.z); // 远处星星更小
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
        fragmentShader: `
                    uniform float time;
                    varying vec3 vColor;
                    varying float vAlpha;
                    void main() {
                        // 圆形星星：计算点到中心的距离，边缘透明
                        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                        if (distanceToCenter > 0.5) discard;
                        // 闪烁动画：使用正弦函数，透明度随时间变化
                        float blink = sin(time * 2.0 + gl_PointCoord.x * 10.0) * 0.2 + 0.8;
                        gl_FragColor = vec4(vColor, vAlpha * blink);
                    }
                `,
        transparent: true,
        depthWrite: false, // 关闭深度写入，避免星星遮挡问题
        blending: THREE.AdditiveBlending // 叠加混合，星星更亮
      });

      // 创建粒子系统（星星群）
      const stars = new THREE.Points(geometry, material);
      scene.add(stars);

      // 存储材质，用于动画更新
      scene.userData.starMaterial = material;
    }

    // 5. 动画循环（星星闪烁 + 相机漫游）
    function animate() {
      requestAnimationFrame(animate);

      // 更新星星闪烁：修改 time 变量
      if (scene.userData.starMaterial) {
        scene.userData.starMaterial.uniforms.time.value += 0.01;
      }

      // 更新控制器（阻尼效果需要）
      controls.update();
      
      // 渲染场景
      renderer.render(scene, camera);
    }
    // 初始化星空
    createNebula();
    createStars(5000); // 生成 5000 颗星星（可调整数量）
    animate();
  }, []); // 空依赖数组意味着这个effect只在组件挂载时运行一次
  
  return <div ref={threetRef} style={{ width: '100%', height: '100%',overflow: 'hidden' }} />;
};
export default ChristmasTree
