<template>
  <div id="app" class="uk-container uk-container-expand">
    <Dashboard />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  margin:0px !important; 
  line-height: inherit !important;
}

h1, h2 {
  line-height: inherit !important;
}

.flex-center {
    align-items: center;
    justify-content: center;
}
</style>

<script>
  import Dashboard from '@/components/Dashboard/Dashboard.ts';

  export default {
  components: {
    Dashboard
  }
};
</script>