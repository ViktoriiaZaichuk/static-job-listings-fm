<script setup>
import { ref, reactive, onMounted, computed , watch} from 'vue';
import axios from 'axios';
import JobCard from '@/components/JobCard.vue';

// Reactive state to manage jobs, loading, and error state
const state = reactive({
  jobs: [],
  isLoading: true,
  error: null,
});

// Define a ref to keep track of the selected filters
const selectedFilters = ref([]);

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

// Update the selected filters when the child component emits an event
function updateFilters(newFilter) {
  if (!selectedFilters.value.includes(newFilter)) {
    selectedFilters.value.push(newFilter);
  }
}

// Function to clear selected filters
function clearAllFilters() {
  selectedFilters.value = [];
}

function removeFilter(filter) {
  selectedFilters.value = selectedFilters.value.filter(f => f !== filter);
}

// Computed property to filter jobs based on selected filters
const filteredJobs = computed(() => {
  if (selectedFilters.value.length === 0) {
    return state.jobs;
  }
  return state.jobs.filter(job => {
    const jobAttributes = [job.role, job.level, ...job.languages, ...job.tools];
    return selectedFilters.value.every(filter => jobAttributes.includes(filter));
  });
});
</script>

<template>
  <div class="flex flex-col min-h-dvh">
    <header class="header flex justify-center items-center min-h-28 bg-primary">
      <div class="flex items-center justify-between mx-6 sm:mx-20 py-2 px-6 bg-white rounded-md w-full">
        <div class="flex items-center">
          <div
            v-for="filter in selectedFilters"
            :key="filter"
          >
            <button class="flex items-center p-1 overflow-hidden rounded-sm">
              <span class="block bg-light-cyan-tablets text-primary font-bold pl-2 pr-4 py-1 rounded-l-sm">{{ filter }}</span>
              <span class="block h-full bg-primary hover:bg-dark-cyan-bg py-2 px-2 rounded-r-sm"
                @click="removeFilter(filter)"
                >
                <svg 
                  class="block"
                  xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <button 
          class="text-dark-cyan font-bold hover:underline hover:text-primary"
          @click="clearAllFilters"
        >Clear</button>
      </div>
    </header>
    
    <main class="flex flex-auto">
      <div v-if="state.isLoading">
          <p>Loading jobs...</p>
      </div>
      <div v-else-if="state.error">
          <p class="error-message">{{ state.error }}</p>
      </div>
      <div class="pt-10 w-full flex flex-col bg-light-cyan-bg">
        <JobCard 
          v-for="job in filteredJobs"
          :key="job.id"
          :job="job"
          @updateTablets="updateFilters"
        />
      </div>
    </main>
  </div>
</template>

