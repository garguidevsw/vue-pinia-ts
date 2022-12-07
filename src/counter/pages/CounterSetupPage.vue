<script setup lang="ts">import { useCounterOptionsStore } from '@/store/counter-options';
import { useCounterSetupStore } from '@/store/counter-setup';
import { storeToRefs } from 'pinia';
import CounterSetupValue from '../components/CounterSetupValue.vue';

const counterSetup = useCounterSetupStore();
const { count, squareCount } = storeToRefs(counterSetup);

</script>

<template>
    <div>
        <h1>Pinia Setup</h1>
        <h4>{{ count }}</h4>
        <h4>{{ squareCount }}</h4>

        <br>

        <button @click="counterSetup.incrementByOne()">+1</button>
        <button @click="counterSetup.incrementBy(2)">+2</button>
        <button @click="counterSetup.incrementBy(5)">+5</button>
        <button @click="counterSetup.reset()">Reset</button>

        <br>

        <CounterSetupValue />
    </div>
</template>

<style scoped>
button {
    margin-right: 5px;
}
</style>