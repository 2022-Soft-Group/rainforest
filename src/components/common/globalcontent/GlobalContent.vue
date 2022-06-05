<template>
  <div class="flex min-h-screen" ref="globalContent">
    <div class="fixed h-full w-full" id="rain"></div>
    <div :class="{ 'w-260': showPadding, 'w-full': !showPadding }" class="z-200 h-full mx-auto">
      <div class="h-10"></div>
      <slot></slot>
    </div>
  </div>
  <div class="w-40 fixed right-0 bottom-10">
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-rate color="#70c0e8" @update-value="handleChangeRainAmount" :value="rainAmount * 5" allow-half>
          <n-icon size="20">
            <rain-icon />
          </n-icon>
        </n-rate>
      </template>
      雨量
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ChevronUp as BackupIcon, Water as RainIcon } from '@vicons/ionicons5';
import * as THREE from 'three';
import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Vert from '@/shader/planeShaderVert';
import Frag from '@/shader/rainshader';

const props = defineProps<{ showPadding: boolean }>();
const globalContent = ref<HTMLElement>(null as unknown as HTMLElement);
const target = () => globalContent.value;

var loader = new THREE.TextureLoader();
var texture = loader.load('/resource/bgimg.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
const rainAmount = ref(0.8);
const handleChangeRainAmount = (value: number) => {
  rainAmount.value = value / 5.0;
  uniforms.rainAmount.value = rainAmount.value;
};
var camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer, bgimg;
var uniforms = {
  resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  iTime: {
    type: 'f',
    value: 1.0,
  },
  iResolution: {
    type: 'v2',
    value: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  iChannel0: {
    type: 't',
    value: texture,
  },
  rainAmount: {
    type: 'f',
    value: rainAmount.value,
  },
};

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
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: Vert,
    fragmentShader: Frag,
  });

  window.addEventListener('resize', onWindowResize, false);
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  animate();
}

onMounted(backgroundVFX);
</script>
