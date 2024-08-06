<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import JobCard from '@/components/JobCard.vue';

// Reactive state to manage jobs, loading, and error state
const state = reactive({
  jobs: [],
  isLoading: true,
  error: null,
});

// Fetch jobs when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get('/data/data.json');
    state.jobs = response.data;
    console.log('Jobs:', state.jobs);
  } catch (error) {
    console.error('Error fetching jobs', error);
    state.error = 'Failed to load jobs. Please try again later.';
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="flex flex-col">
    <header class="header flex justify-center items-center min-h-28 bg-primary">
      <div class="flex items-center justify-between mx-6 sm:mx-20 py-2 px-6 bg-white rounded-md w-full">
        <div>
          <button class="flex items-center p-1 overflow-hidden rounded-sm">
            <span class="block bg-light-cyan-tablets text-primary font-bold pl-2 pr-4 py-1 rounded-l-sm">Front-end</span>
            <span class="block h-full bg-primary hover:bg-dark-cyan-bg py-2 px-2 rounded-r-sm">
              <svg 
                class="block"
                xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/>
              </svg>
            </span>
          </button>
        </div>
        <button class="text-dark-cyan font-bold hover:underline hover:text-primary">Clear</button>
      </div>
    </header>
    
    <main class="flex">
      <div v-if="state.isLoading">
          <p>Loading jobs...</p>
      </div>
      <div v-else-if="state.error">
          <p class="error-message">{{ state.error }}</p>
      </div>
      <div class="pt-10 w-full flex flex-col justify-center bg-light-cyan-bg">
        <JobCard 
          v-for="job in state.jobs"
          :key="job.id"
          :job="job"
        />
      </div>
    </main>
  </div>
</template>

