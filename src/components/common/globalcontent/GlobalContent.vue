<template>
  <div class="flex min-h-screen">
    <div class="fixed h-full w-full" id="rain"></div>
    <div class="w-260 z-200 h-full mx-auto" id="global-content">
      <div class="h-10"></div>
      <slot></slot>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            v-if="!showSlider"
            class="fixed right-10 bottom-35 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
            type="primary"
            size="large"
            secondary
            circle
            @click="scrollToTop"
          >
            <n-icon><back-top-icon /></n-icon>
          </n-button>
        </template>
        返回顶部
      </n-tooltip>
      <n-button
        v-if="!showSlider"
        class="fixed right-10 bottom-20 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
        type="primary"
        size="large"
        secondary
        circle
        @click="showSlider = true"
      >
        <n-icon><rain-icon /></n-icon>
      </n-button>
      <glossy-card v-else class="z-400 fixed right-8 bottom-20" @mouseleave="showSlider = false">
        <div class="rain-slider h-30 rounded-md">
          <n-slider vertical @update-value="handleChangeRainAmount" v-model:value="rainAmount" />
        </div>
      </glossy-card>
      <n-button
        class="fixed left-10 bottom-5 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
        type="primary"
        size="large"
        secondary
        circle
        @click="handlePreImg"
      >
        <n-icon><back-icon /></n-icon>
      </n-button>
      <n-button
        class="fixed right-10 bottom-5 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
        type="primary"
        size="large"
        secondary
        circle
        @click="handleNextImg"
      >
        <n-icon><forward-icon /></n-icon>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import type { PerspectiveCamera, Scene, Texture, WebGLRenderer } from 'three';
import Vert from '@/shader/planeShaderVert';
import Frag from '@/shader/rainshader';
import {
  ChevronBackOutline as BackIcon,
  ChevronForwardOutline as ForwardIcon,
  RainyOutline as RainIcon,
  ChevronUp as BackTopIcon,
} from '@vicons/ionicons5';

const showSlider = ref(false);

let texture: THREE.Texture;
let uniforms: {
  iChannel0: any;
  rainAmount: any;
  iTime: any;
  resolution: { value: THREE.Vector2 };
  iResolution: { type: string; value: THREE.Vector2 };
};
let currentBgImg = 0;
let maxBgImgNum = 4;
const textureUrl = () => {
  return '/resource/bgimg' + currentBgImg + '.jpg';
};

function loadTexture(textureInd: number) {
  loaded[textureInd] = true;
  textureArray[textureInd] = loader.load(textureUrl());
  textureArray[textureInd].wrapS = THREE.RepeatWrapping;
  textureArray[textureInd].wrapT = THREE.RepeatWrapping;
  texture = textureArray[textureInd];
}

let loader = new THREE.TextureLoader();
let textureArray = new Array<Texture>(maxBgImgNum);
let loaded = new Array<Boolean>(maxBgImgNum);

const handleNextImg = () => {
  currentBgImg = (currentBgImg + 1) % maxBgImgNum;
  localStorage.setItem('bgInd', currentBgImg.toString());
  if (loaded[currentBgImg] == false) {
    textureArray[currentBgImg] = loader.load(textureUrl());
    loaded[currentBgImg] = true;
  }
  uniforms.iChannel0.value.needsUpdate = true;
  uniforms.iChannel0.value = textureArray[currentBgImg];
};

const handlePreImg = () => {
  currentBgImg = currentBgImg - 1 < 0 ? maxBgImgNum - 1 : currentBgImg - 1;
  localStorage.setItem('bgInd', currentBgImg.toString());
  if (loaded[currentBgImg] == false) {
    textureArray[currentBgImg] = loader.load(textureUrl());
    loaded[currentBgImg] = true;
  }
  uniforms.iChannel0.value.needsUpdate = true;
  uniforms.iChannel0.value = textureArray[currentBgImg];
  console.log(currentBgImg);
};

const rainAmount = ref(80);
const handleChangeRainAmount = (value: number) => {
  rainAmount.value = value;
  uniforms.rainAmount.value = rainAmount.value / 50.0;
};

let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer, bgimg;

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
  uniforms.iResolution.value.x = window.innerWidth;
  uniforms.iResolution.value.y = window.innerHeight;
}

function backgroundVFX() {
  setupThreeEnv();
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
    iChannel0: {
      type: 't',
      value: texture,
    },
    rainAmount: {
      type: 'f',
      value: rainAmount.value / 100,
    },
  };

  let geometry = new THREE.PlaneBufferGeometry(2, 2);
  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: Vert,
    fragmentShader: Frag,
  });

  window.addEventListener('resize', onWindowResize, false);
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  animate();
}

const scrollToTop = () => {
  document.querySelector('#global-content')?.scrollIntoView({
    behavior: 'auto',
  });
};

onMounted(() => {
  loaded.fill(false);
  var bgInd = localStorage.getItem('bgInd');
  if (bgInd != null) {
    currentBgImg = parseInt(bgInd as string);
  }
  loadTexture(currentBgImg);
  backgroundVFX();
});
</script>
<style scoped>
.rain-slider {
  background-color: rgba(99, 226, 183, 0.1);
}
</style>
