<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
  job: Object,
});

// Emit an event to update the tablets filter
const emit = defineEmits(['updateTablets']);

// Function to emit the filter value to the parent
function toggleTablet(filter) {
  emit('updateTablets', filter);
}

</script>

<template>
    <div class="mx-6 sm:mx-20 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-lg shadow-light-cyan-tablets rounded-md mb-6 p-6 bg-white">
        <div class="flex flex-col sm:flex-row">
            <div class="mb-3 sm:mb-0">
                <img 
                    class="block"
                    :src="job.logo" 
                    :alt="job.company + ' logo'"
                >
            </div>
            <div class="sm:ml-6">
                <div class="flex items-center"> 
                    <h3 class="mr-4 text-primary font-bold text-lg">{{ job.company }}</h3>
                    <div>
                        <span 
                            class="inline-block mx-2 px-3 bg-primary font-bold text-white rounded-xl"
                            v-if="job.new"
                        > NEW! 
                        </span>
                        <span 
                            class="inline-block mx-2 px-3 bg-dark-cyan-bg font-bold text-white rounded-xl"
                            v-if="job.featured"
                        > FEATURED 
                        </span>
                    </div>
                </div>
                <h2 class="font-bold text-lg my-3 hover:text-primary cursor-pointer">
                    {{ job.position }}
                </h2>
                <div class="text-dark-cyan">
                    <span class="inline-block">{{ job.postedAt }}</span>
                    <span class="mx-3 inline-block">{{ job.contract }}</span>
                    <span class="inline-block">{{ job.location }}</span>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap text-primary font-bold text-lg gap-x-3">
            <h3 
                class="my-3 py-1 px-2 bg-light-cyan-tablets rounded-md hover:bg-primary hover:text-white cursor-pointer"
                @click="toggleTablet(job.role)"
            >{{ job.role }}</h3>
            <h3 
                class="my-3 py-1 px-2 bg-light-cyan-tablets rounded-md hover:bg-primary hover:text-white cursor-pointer"
                @click="toggleTablet(job.level)"
            >{{ job.level }}</h3>
            <h3
                class="flex my-3 py-1 px-2 bg-light-cyan-tablets rounded-md hover:bg-primary hover:text-white cursor-pointer"
                v-for="lang in job.languages"
                :key="lang"
                @click="toggleTablet(lang)"
            >
             {{ lang }}
            </h3>
            <h3
                class="flex my-3 py-1 px-2 bg-light-cyan-tablets rounded-md hover:bg-primary hover:text-white cursor-pointer"
                v-for="tool in job.tools"
                :key="tool"
                @click="toggleTablet(tool)"
            >
             {{ tool }}
            </h3>
        </div>
    </div>
</template>