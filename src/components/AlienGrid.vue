<template>
    <div class="grid-wrapper" ref="gridWrapper">
        <div class="alien-grid" ref="alienGrid">
            <div class="alien-slot" v-for="alien of props.aliens">
                <div v-if="alien === 1"><Alien /></div>
                <div v-else></div>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">
    import { watch,ref, type Ref } from 'vue';
    import Alien from '../components/Alien.vue'
    import {normalize} from '../utils/utils'

    const alienGrid: Ref<null | {style: {marginLeft: string}, clientWidth: number}> = ref(null)
    const gridWrapper: Ref<null | {clientWidth: number}> = ref(null)
    const props = defineProps<{aliens: number[], elapsed_tick:number}>()

    const handleMovement = (x:number, period:number) : number=> {
        console.log(`PERIOD:${period}; X:${x}; MODULUS:${x % period}`)
        if((x % period) < period/2){
            return 1;
        }
        return -1;
    }

    watch(()=>props.elapsed_tick, (actual_tick,_) => {
        //console.log(`GAME: STEPPED ${actual_tick}`)
        if(alienGrid.value && gridWrapper.value){
            let tick_period = 16

            let margin = Number(alienGrid.value.style.marginLeft.replace("px", ""))
            if (actual_tick % tick_period === 0) {
                margin = 0;
            }
            alienGrid.value.style.marginLeft = margin + Math.ceil((gridWrapper.value.clientWidth - alienGrid.value.clientWidth) / 16) * handleMovement(actual_tick,tick_period) * 2 + "px"
        }
    })
</script>

<style scoped>
    .alien-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 40px;
        grid-row-gap: 40px;
        max-width:40%;
    }
    .grid-square{
        height: 64px;
        width: 64px;
    }
    .grid-square-left{
        float:left;
    }
    .grid-wrapper{
        width:100%;
        /*
        display:flex;
        justify-content: center;
        */
    }


</style>