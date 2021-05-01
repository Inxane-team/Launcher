<template>
  <div style="min-height: 100%;">
    <Toolbar />
    <Sidenav />

    <router-view id="app"/>
  </div>
</template>
<script>
import Sidenav from './components/Sidenav.vue'
import Toolbar from './components/Toolbar.vue'
export default {
  components: { Toolbar, Sidenav },
  mounted(){
    require("electron").ipcRenderer;
  }  
}
</script>
