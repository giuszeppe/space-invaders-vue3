
<script setup lang="ts">
  import {onMounted, reactive} from 'vue'
  import AlienGrid from './components/AlienGrid.vue';
  import Astro from './components/Astro.vue';
  import {useInterval } from './utils/useInterval'


  const game : {level: number, score: number, aliens:number[], elapsed_tick:number} = reactive({
    level: 1,
    score: 0,
    aliens: [1,1,0,1,0,1,1,0,1],
    elapsed_tick: -1
  })

  let start:()=> any;
  let stop: ()=>any;




  const stepGame = () => {
    game.elapsed_tick++;
  }

  [start,stop] = useInterval(stepGame, 300)
  onMounted(stop);
  
  const startGame = (e: Event) => {
    game.elapsed_tick = -1
    console.log("GAME: STARTED")
    start()
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
      <AlienGrid :aliens="game.aliens"
        :elapsed_tick="game.elapsed_tick"
      />
    </div>
    <div class="bottom-bar">
      <Astro :rows="1" :cols="16"/>
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
