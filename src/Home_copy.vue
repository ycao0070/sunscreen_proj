<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">UV Aware</a>
        <div class="ms-auto">
          <span class="avatar">JL</span>
        </div>
      </div>
    </nav>

    <!-- 导航标签 -->
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
      <!-- 位置信息 -->
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi bi-geo-alt-fill text-primary me-2"></i>
            <span>Lorne, Victoria</span>
          </div>
          <a href="#" class="text-primary">Change</a>
        </div>
      </div>

      <!-- UV指数显示 -->
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between mb-2">
            <div>
              <h6>Friday, March 13, 2025</h6>
              <p>12:30 PM • 28°C</p>
            </div>
            <div class="text-end">
              <p class="text-warning">UV INDEX</p>
              <h3 class="text-warning">HIGH</h3>
            </div>
          </div>
          <div class="uv-circle">9</div>
          <div class="progress">
            <div class="progress-bar bg-success" style="width: 30%"></div>
            <div class="progress-bar bg-warning" style="width: 30%"></div>
            <div class="progress-bar bg-danger" style="width: 40%"></div>
          </div>
        </div>
      </div>

      <!-- 防护建议 -->
      <div class="alert alert-warning">
        <h6>Recommended Protection</h6>
        <p>SPF 30+ sunscreen, hat, sunglasses</p>
        <p><i class="bi bi-alarm"></i> Reapply sunscreen every 2 hours</p>
      </div>

      <!-- 计算器和健康数据 -->
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-primary">Sunscreen Calculator</h5>
              <select class="form-select mb-3">
                <option>Skin Type: Type III (Medium)</option>
              </select>
              <p>UV Index: 9 (High)</p>
              <div class="teaspoon-circle">2.5</div>
              <p>For face, neck, and both arms</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-primary">UV Health Impact Data</h5>
              <div class="tableauPlaceholder" id="viz1741923968547" style="position: relative">
                <noscript
                  ><a href="#"
                    ><img
                      alt="UV Index Over Time "
                      src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;UV&#47;UVRiskbyDate&#47;Sheet1&#47;1_rss.png"
                      style="border: none" /></a></noscript
                ><object class="tableauViz" style="display: none">
                  <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
                  <param name="embed_code_version" value="3" />
                  <param name="site_root" value="" />
                  <param name="name" value="UVRiskbyDate&#47;Sheet1" />
                  <param name="tabs" value="no" />
                  <param name="toolbar" value="yes" />
                  <param
                    name="static_image"
                    value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;UV&#47;UVRiskbyDate&#47;Sheet1&#47;1.png"
                  />
                  <param name="animate_transition" value="yes" />
                  <param name="display_static_image" value="yes" />
                  <param name="display_spinner" value="yes" />
                  <param name="display_overlay" value="yes" />
                  <param name="display_count" value="yes" />
                  <param name="language" value="en-US" />
                  <param name="filter" value="publish=yes" />
                </object>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能卡片 -->
      <div class="row mt-3">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="feature-icon bg-primary text-white">
                  <i class="bi bi-alarm"></i>
                </div>
                <h6 class="ms-2 mb-0">Sunscreen Reminders</h6>
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
export default {
  name: 'Home',
  data() {
    return {
      // 数据
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
</style>
