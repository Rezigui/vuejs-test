<template>
  <div id="app">
    <a-layout id="components-layout-demo-fixed">
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <div class="logo" />
        <a-menu theme="dark" mode="horizontal" :defaultSelectedKeys="['home']" :style="{ lineHeight: '64px' }">
            <a-menu-item key="home">
              <router-link to="/" exact>Home</router-link>
            </a-menu-item>
            <a-menu-item key="companies">
              <router-link to="/companies" exact>Companies</router-link>
            </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content :style="{ margin: '110px 35px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
          <router-view/>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Made By Malik with <i class="fas fa-heart"></i> For Selency
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style>
body{
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  /* color: #2c3e50; */
}

</style>
