<template>
    <div class="alien-grid">
        <div class="alien-slot" v-for="alien of aliens">
            <div v-if="alien === 1"><Alien /></div>
            <div v-else></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Alien from '../components/Alien.vue'
    const props = defineProps<{aliens: number[]}>()
</script>

<style scoped>
    .alien-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 40px;
        grid-row-gap: 40px;
        margin: 0 auto;
        max-width:40%;
    }


</style>