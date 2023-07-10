
<script setup lang="ts">
  import {reactive} from 'vue'
import AlienGrid from './components/AlienGrid.vue';
import Astro from './components/Astro.vue';
  const game : {level: number, score: number, aliens:number[]} = reactive({
    level: 1,
    score: 0,
    aliens: [1,1,0,1,0,1,1,0,1]
  })
  const startGame = (e: Event) => {
    console.log('started')
  }
</script>

<template>
  <div class="wrapper">
    <div class="topbar">
      <p>LEVEL {{ game.level}}</p>
      <p>SCORE {{ game.score }}</p>
      <p><a href="#" @click.prevent="startGame">START GAME</a></p>
    </div>
    <div class="alien-wrapper">
      <AlienGrid :aliens="game.aliens"/>
    </div>
    <div class="bottom-bar">
      <Astro />
    </div>
  </div>

</template>

<style scoped>
  @font-face {
    font-family: "Pixel-LCD";
    src: local("Pixel-LCD-7"),   url(./assets/fonts/Pixel-LCD-7.woff) format("truetype");
  }
.wrapper{
  width:100%;
  min-height: 100vh;
  padding:50px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
}
.topbar{
  display:flex;
  position:absolute;
  top: 10px;
  left: 0px;
  padding: 20px 50px;
  justify-content: space-between;
  width: 100%;
  font-family: "Pixel-LCD";
  a:hover{
    cursor: pointer;
  }
}
.alien-wrapper{
  margin-top: 100px;
  width:100%;
  padding:5%;
}
</style>
