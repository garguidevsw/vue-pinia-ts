<script setup lang="ts">import { useCounterOptionsStore } from '@/store/counter-options';
import { storeToRefs } from 'pinia';
import CounterOptionsValue from '../components/CounterOptionsValue.vue';

const counterOptions = useCounterOptionsStore();
const { count, squareCount } = storeToRefs(counterOptions);

</script>

<template>
    <div>
        <h1>Pinia Options</h1>
        <h4>{{ count }}</h4>
        <h4>{{ squareCount }}</h4>

        <br>

        <button @click="counterOptions.incrementByOne()">+1</button>
        <button @click="counterOptions.incrementBy(2)">+2</button>
        <button @click="counterOptions.incrementBy(5)">+5</button>
        <button @click="counterOptions.$reset()">Reset</button>

        <br>

        <CounterOptionsValue />
    </div>
</template>

<style scoped>
button {
    margin-right: 5px;
}
</style>