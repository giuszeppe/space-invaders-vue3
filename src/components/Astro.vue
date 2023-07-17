<template>
    <div class="container" ref="container">

    </div>
    <img src="../assets/img/ship.png" ref="astro" />
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
    import {useKeyupEvent} from '../utils/useKeyupEvent'
    const keys = {
        left: 37,
        right: 39,
    }
    // Fetching props
    const props = defineProps<{rows: number, cols: number}>()

    // Initialize astro vars
    let astro: Ref< null | Node> = ref(null)
    let astro_position: {x: number, y: number} = {x: 1, y: 0}
    let container: Ref<null | {appendChild: (node: Node)=> any,style: {setProperty: (prop: string, value: number) => any}}> = ref(null)

    // Apply movement listener
    useKeyupEvent(handleKey)


    onMounted(() => {
        makeGrid(props.rows, props.cols)
    })

    function handleKey(e: KeyboardEvent){
        console.log(e)
        switch (e.keyCode) {
            case keys.left:
                astro_position.y--;
                break;

            case keys.right:
                astro_position.y++;
                break;
        }
        if(astro_position.y > props.cols) astro_position.y = props.cols
        if(astro_position.y < 0) astro_position.y = 0
        let gridItem: Node | null = document.querySelector(".grid-item-" + astro_position.x + '-' + astro_position.y);
        if(gridItem !== null && astro.value !== null){
            gridItem.appendChild(astro.value);
        }
    }

    function makeGrid(rows: number,cols: number){
        // set style properties
        container.value?.style.setProperty("--grid-cols", props.cols)
        container.value?.style.setProperty("--grid-rows", props.rows)
        // build grid
        let x = 0;
        let y = 0;
        for (let c = 0; c < props.rows * props.cols; c++) {
            let cell: HTMLDivElement = document.createElement("div");
            y = c % props.cols;
            if (y === (props.rows - 1)) {
                x++;
            }
            if (container.value !== null) {
                cell = container.value.appendChild(cell)
                cell.className = "grid-item grid-item-" + x + '-' + y;
            }
        }
        let firstGridItem: Node | null = document.querySelector(".grid-item");
        if (firstGridItem !== null) {
            if (astro.value !== null)
                firstGridItem.appendChild(astro.value);
        }
    }

</script>

<style scoped>
    .container{
        display:grid;
        grid-template-columns: repeat(var(--grid-cols),1fr);
        grid-template-rows: repeat(var(--grid-rows),1fr);
    }

</style>