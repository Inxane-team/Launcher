<template>
  <div>
    <div id="home">
      <h1>LIBRARY</h1>
      <div>
        <br>
        <Modal ref='clientSettings' :mtitle="'Settings for '+clientSettingsData.name">
          <span class="label">DEFAULT USERNAME</span>
          <input class="input" type="text" placeholder="Username" v-model="clientSettingsData.userName">
          <span class="label">RAM</span>
          <input class="input" type="text" placeholder="Username" v-model="clientSettingsData.ram">
          <a class="button" style="float: right" @click="saveSettings(clientSettingsData)">SAVE</a>
        </Modal>
        <MarketEntry v-for="item of items" :key="item.id" :image='item.image' :name="item.name" @click.native="launch(item.id)" @contextmenu.native="openedContextMenu = item.id" action="LAUNCH">
          <div v-if="openedContextMenu == item.id" >
            <div id="context-menu-bg" @click.stop.prevent="openedContextMenu = ''"></div>
            <div id="context-menu" @click.stop.prevent>
              <a @click="launch(item.id); openedContextMenu = ''">LAUNCH</a>
              <router-link :to="'/market/'+item.id">VIEW IN STORE</router-link>
              <a @click="$refs.clientSettings.open(); clientSettingsData = item.json">SETTINGS</a>
              <a @click="openClientDirectory(item.json); openedContextMenu = ''">OPEN FOLDER</a>
              <a @click="deleteClientDirectory(item.json)">DELETE</a>
              <a style="background: #0000 !important; cursor: default;">VERSION: {{item.version}}</a>
            </div>
          </div>
        </MarketEntry>
      </div>
    </div>
  </div>
</template>

<script>
import MarketEntry from "../components/MarketEntry";
import electron from 'electron';
import Modal from '../components/Modal.vue';
const fs = require("fs")
const os = require('os')

export default {
  name: 'Library',
  data: ()=>({
    items: [],
    openedContextMenu: "",
    clientSettingsData: {}
  }),
  components: {
    MarketEntry,
    Modal
  },
  mounted(){
    this.loadClients()
    this.$refs.clientSettings.onOpen = ()=>{
      this.openedContextMenu = ""
    }
  },
  methods: {
    loadClients(){
      this.items = []
      fs.readdir(os.homedir()+"/.inxanelauncher/clients", (e, dir)=>{
        for (const item of dir) {
          try {
            const json = JSON.parse(fs.readFileSync(os.homedir()+"/.inxanelauncher/clients/"+item+"/launcher.json"))
            const data = {
              id: json.id,
              name: json.name,
              version: json.version,
              json
            }

            if (fs.existsSync(os.homedir()+"/.inxanelauncher/clients/"+item+"/client.png"))
              data.image = "data:image/png;base64,"+fs.readFileSync(os.homedir()+"/.inxanelauncher/clients/"+item+"/client.png").toString('base64')
            else
              data.image = require("../assets/img/ex.png")
            console.log(data);
            this.items.push(data)
          } catch (e) {
            console.log(e);
          }
        }
      })
    },
    launch(id){
      electron.ipcRenderer.send('request-mainprocess-action', {
          "action": "launch",
          "id": id
      });
    },
    saveSettings(json){
      fs.writeFile(os.homedir()+"/.inxanelauncher/clients/"+json.id+"/launcher.json", JSON.stringify(json), ()=>{
        this.$refs.clientSettings.close()
      })
    },
    openClientDirectory(json){
      electron.shell.showItemInFolder(os.homedir()+"/.inxanelauncher/clients/"+json.id)
    },
    deleteClientDirectory(json){
      
      fs.rmdir(os.homedir()+"/.inxanelauncher/clients/"+json.id, {recursive: true}, ()=>{
        this.loadClients()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#home {
  padding: 30px;
  max-width: 1300px;

  h1 {
    font-size: 30px;
    font-weight: 700;
  }

  #top-banner {
    background: linear-gradient(
          rgba(0, 0, 0, 0.2), 
          rgba(0, 0, 0, 0.3)
        ),
        url(../assets/img/ex.png);
    background-size: cover;
    background-position: center;
    height: 250px;
    border-radius: 10px;
    padding: 20px;
    padding-top: 135px;
  }
}

#context-menu-bg {
  position: fixed;
  top: 20px;
  left: 0px;
  height: 100%;
  width: 100%;
  cursor: default;
}

#context-menu {
  position: absolute;
  background: #0E1631;
  padding: 4px;
  width: 170px;
  color: #FFF;
  border-radius: 7px;
  margin-top: -254px;
  margin-left: 160px;

  a {
    padding: 10px;
    border-radius: 6px;
    display: block;
    color: #FFF;
    text-decoration: none;

    &:hover {
      background: #FFFFFF22;
    }
  }
}
</style>