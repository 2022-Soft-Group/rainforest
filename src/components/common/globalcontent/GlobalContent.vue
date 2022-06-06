<template>
  <div class="flex min-h-screen">
    <div class="fixed h-full w-full" id="rain"></div>
    <div class="w-260 z-200 h-full mx-auto">
      <div class="h-10"></div>
      <slot></slot>
    </div>
  </div>
  <div class="flex justify-between w-40 fixed right-10 bottom-10">
    <n-rate color="#63e2b7" @update-value="handleChangeRainAmount" :value="rainAmount * 5" allow-half>
      <n-icon size="20">
        <rain-icon />
      </n-icon>
    </n-rate>
  </div>
  <n-button class="fixed left-10 top-1/2" type="primary" size="large" secondary circle @click="handlePreImg">
    <n-icon><back-icon /></n-icon>
  </n-button>
  <n-button class="fixed right-10 top-1/2" type="primary" size="large" secondary circle @click="handleNextImg">
    <n-icon><forward-icon /></n-icon>
  </n-button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Water as RainIcon } from '@vicons/ionicons5';
import * as THREE from 'three';
import type { PerspectiveCamera, Scene, Texture, WebGLRenderer } from 'three';
import Vert from '@/shader/planeShaderVert';
import Frag from '@/shader/rainshader';
import { ChevronBackOutline as BackIcon, ChevronForwardOutline as ForwardIcon } from '@vicons/ionicons5';

let texture: THREE.Texture;
let uniforms: {
  iChannel0: any;
  rainAmount: any;
  iTime: any;
  resolution?: { value: THREE.Vector2 };
  iResolution?: { type: string; value: THREE.Vector2 };
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

const rainAmount = ref(0.8);
const handleChangeRainAmount = (value: number) => {
  rainAmount.value = value / 5.0;
  uniforms.rainAmount.value = rainAmount.value;
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
      value: rainAmount.value,
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
