import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterSetupStore = defineStore('counterSetup', () => {
    const count = ref<number>(0)
    const lastChanged = ref<Date>()

    const incrementBy = (value: number) => {
        count.value += value
        lastChanged.value = new Date()
    }
    const reset = () => {
        count.value = 0;
        lastChanged.value = undefined;
    }

    return {
        // State properties
        count, 
        lastChanged,
        // getters
        squareCount: computed( () => count.value * count.value ),
        // Actions
        incrementBy,
        incrementByOne: () => incrementBy(1),
        reset

    }
})