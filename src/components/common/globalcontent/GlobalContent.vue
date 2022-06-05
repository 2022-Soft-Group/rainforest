<template>
  <n-back-top :listen-to="target" :bottom="20" :right="10" :visibility-height="0">
    <div style="width: 40px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">
      <n-icon size="36"><backup-icon /></n-icon>
    </div>
  </n-back-top>

  <div class="flex min-h-screen bg-light-500" ref="globalContent">
    <div class="fixed z-10 h-full w-full" id="rain"></div>
    <div :class="{ 'w-260': showPadding, 'w-full': !showPadding }" class="z-200 h-full mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ChevronUp as BackupIcon } from '@vicons/ionicons5';
import * as THREE from 'three';
import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Vert from '@/shader/planeShaderVert';
import Frag from '@/shader/planeShaderFrag';

const props = defineProps<{ showPadding: boolean }>();
const globarContent = ref<HTMLElement>(null as unknown as HTMLElement);
const target = () => globarContent.value;

var camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer, uniforms: any, bgimg;
function setupThreeEnv() {
  bgimg = document.getElementById('rain');
  camera = new THREE.PerspectiveCamera();
  camera.position.z = 1;
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  bgimg?.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.iTime.value += 0.05;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function backgroundVFX() {
  setupThreeEnv();
  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iTime: {
      type: 'f',
      value: 1.0,
    },
    iResolution: {
      type: 'v2',
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    iMouse: {
      type: 'v2',
      value: new THREE.Vector2(),
    },
  };

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: Vert,
    fragmentShader: Frag,
  });
  window.addEventListener('touchmove', function (evt) {
    uniforms.imouse.x = evt['touches'][0].clientX;
    uniforms.imouse.y = evt['touches'][0].clientY;
  });
  window.addEventListener('resize', onWindowResize, false);
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  animate();
}

onMounted(backgroundVFX);
</script>
