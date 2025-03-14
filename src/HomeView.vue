<template>
  <div class="home">
    <!-- Top Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">UV Aware</a>
        <div class="ms-auto">
          <span class="avatar">JL</span>
        </div>
      </div>
    </nav>

    <!-- Navigation Tabs -->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">UV Map</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Alerts</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Learn</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Profile</a>
      </li>
    </ul>

    <div class="container mt-3">
      <!-- Location Information -->
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi bi-geo-alt-fill text-primary me-2"></i>
            <input
              v-model="city"
              class="form-control form-control-sm"
              style="width: 200px"
              @keyup.enter="fetchWeatherData"
              placeholder="Enter location..."
            />
          </div>
          <button class="btn btn-primary btn-sm" @click="fetchWeatherData">Update</button>
        </div>
      </div>

      <!-- UV Index Display -->
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between mb-2">
            <div>
              <h6>{{ currentDate }}</h6>
              <p>{{ currentTime }} • {{ temperature }}°C</p>
            </div>
            <div class="text-end">
              <p class="text-warning">UV INDEX</p>
              <h3 class="text-warning">{{ getUVLevel }}</h3>
            </div>
          </div>
          <div class="uv-circle" :style="{ background: getUVColor }">{{ uvIndex }}</div>
          <div class="progress">
            <div class="progress-bar bg-success" style="width: 30%"></div>
            <div class="progress-bar bg-warning" style="width: 30%"></div>
            <div class="progress-bar bg-danger" style="width: 40%"></div>
          </div>
        </div>
      </div>

      <!-- Protection Recommendations -->
      <div class="alert alert-warning">
        <h6>Recommended Protection</h6>
        <p>SPF 30+ sunscreen, hat, sunglasses</p>
        <p><i class="bi bi-alarm"></i> Reapply sunscreen every 2 hours</p>
      </div>

      <!-- Calculator and Health Data -->
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-primary">Sunscreen Calculator</h5>
              <select class="form-select mb-3" v-model="selectedSkinType">
                <option v-for="type in skinTypes" :key="type.id" :value="type.id">
                  {{ type.label }}
                </option>
              </select>
              <p>UV Index: {{ uvIndex }}</p>
              <div class="teaspoon-circle">2.5</div>
              <p>For face, neck, and both arms</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-primary">UV Health Impact Data</h5>
              <div class="charts-container">
                <div class="row">
                  <div class="col-6 mb-3">
                    <img
                      src="@/assets/images/skin_cancer_mortality.jpg"
                      alt="UV Exposure Chart"
                      class="img-fluid rounded"
                    />
                    <p class="text-center mt-2 small">
                      Skin Cancer Mortality Rates in AUS 2007-2024
                    </p>
                  </div>
                  <div class="col-6 mb-3">
                    <img
                      src="@/assets/images/skin_cancer_rates_over_time.jpg"
                      alt="Skin Health Chart"
                      class="img-fluid rounded"
                    />
                    <p class="text-center mt-2 small">Skin Cancer Rates Over Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="row mt-3">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="feature-icon bg-primary text-white">
                    <i class="bi bi-alarm"></i>
                  </div>
                  <h6 class="ms-2 mb-0">Sunscreen Reminders</h6>
                </div>
                <span class="timer-display">{{ formatTime(timerMinutes, timerSeconds) }}</span>
              </div>
              <div class="mt-3 d-flex gap-2">
                <button 
                  class="btn btn-sm" 
                  :class="timerActive ? 'btn-danger' : 'btn-primary'"
                  @click="timerActive ? stopTimer() : startTimer()"
                >
                  {{ timerActive ? 'Stop' : 'Start' }}
                </button>
                <button 
                  class="btn btn-sm btn-secondary" 
                  @click="resetTimer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="feature-icon bg-purple text-white">
                  <i class="bi bi-shirt"></i>
                </div>
                <h6 class="ms-2 mb-0">UV-Safe Clothing</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="feature-icon bg-orange text-white">
                  <i class="bi bi-graph-up"></i>
                </div>
                <h6 class="ms-2 mb-0">UV Tracking</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeatherData } from './weatherService'

export default {
  name: 'HomeView',
  data() {
    return {
      city: localStorage.getItem('lastCity') || '',
      temperature: null,
      uvIndex: null,
      loading: true,
      error: null,
      currentDate: '',
      currentTime: '',
      selectedSkinType: 1,
      skinTypes: [
        { id: 1, label: 'Type I (Very Fair) - Always burns, never tans' },
        { id: 2, label: 'Type II (Fair) - Burns easily, tans minimally' },
        { id: 3, label: 'Type III (Medium) - Burns moderately, tans gradually' },
        { id: 4, label: 'Type IV (Olive) - Burns minimally, tans well' },
        { id: 5, label: 'Type V (Dark) - Burns rarely, tans deeply' },
      ],
      timerMinutes: 120,
      timerSeconds: 0,
      timerActive: false,
      timerId: null,
    }
  },
  computed: {
    getUVLevel() {
      if (!this.uvIndex) return 'N/A'
      if (this.uvIndex <= 2) return 'LOW'
      if (this.uvIndex <= 5) return 'MODERATE'
      if (this.uvIndex <= 7) return 'HIGH'
      if (this.uvIndex <= 10) return 'VERY HIGH'
      return 'EXTREME'
    },
    getUVColor() {
      if (!this.uvIndex) return '#6c757d'
      if (this.uvIndex <= 2) return '#28a745'
      if (this.uvIndex <= 5) return '#ffc107'
      if (this.uvIndex <= 7) return '#fd7e14'
      if (this.uvIndex <= 10) return '#dc3545'
      return '#6f42c1'
    }
  },
  methods: {
    async fetchWeatherData() {
      if (!this.city.trim()) {
        this.error = 'Please enter a location'
        return
      }
      
      this.loading = true
      this.error = null
      
      try {
        const data = await getWeatherData(this.city)
        this.temperature = Math.round(data.temperature)
        this.uvIndex = Math.round(data.uv)
        
        // Update date and time from API response
        const localTime = new Date(data.localTime)
        this.currentDate = localTime.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        this.currentTime = localTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
        
        localStorage.setItem('lastCity', this.city)
        this.loading = false
      } catch (error) {
        this.error = 'Failed to fetch weather data. Please check the location.'
        this.loading = false
      }
    },
    getProgressWidth(min, max) {
      if (!this.uvIndex) return 0
      if (this.uvIndex >= min && this.uvIndex <= max) {
        return 100 / 3 // Equal width for each section
      }
      return 0
    },
    startTimer() {
      if (!this.timerActive) {
        this.timerActive = true;
        this.timerMinutes = 120;
        this.timerSeconds = 0;
        this.timerId = setInterval(this.updateTimer, 1000);
      }
    },
    stopTimer() {
      this.timerActive = false;
      clearInterval(this.timerId);
    },
    resetTimer() {
      this.stopTimer();
      this.timerMinutes = 120;
      this.timerSeconds = 0;
    },
    updateTimer() {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
      } else if (this.timerMinutes > 0) {
        this.timerMinutes--;
        this.timerSeconds = 59;
      } else {
        this.stopTimer();
        // You might want to add a notification here
      }
    },
    formatTime(minutes, seconds) {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  created() {
    this.fetchWeatherData()
  },
  beforeUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  },
}
</script>

<style scoped>
.avatar {
  background: #fff;
  color: #0d6efd;
  padding: 5px 10px;
  border-radius: 50%;
}

.uv-circle {
  width: 100px;
  height: 100px;
  background: #f4a261;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  margin: 20px auto;
}

.teaspoon-circle {
  width: 80px;
  height: 80px;
  background: #f4a261;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin: 20px 0;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-purple {
  background-color: #6f42c1;
}

.bg-orange {
  background-color: #fd7e14;
}

.home {
  padding: 20px;
}

.weather-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.weather-info {
  text-align: center;
}

.temperature,
.uv-index {
  margin: 10px 0;
  font-size: 1.2em;
}

h1,
h2 {
  color: #2c3e50;
}

.form-control {
  border: none;
  background: transparent;
  padding: 0.25rem 0.5rem;
}

.form-control:focus {
  box-shadow: none;
  border-bottom: 1px solid #0d6efd;
}

.timer-display {
  font-family: monospace;
  font-size: 1.2rem;
  font-weight: bold;
  color: #0d6efd;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>
