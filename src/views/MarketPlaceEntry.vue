<template>
    <div>
        <div id="market-place-entry">
            <div id="top" :style="{backgroundImage: ' url('+entry.banner+')'}">
                <svg @click="$router.go(-1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/></svg>
                <img v-if="entry.icon" :src="entry.icon" />
                <h1 v-else>{{entry.name}}</h1>
            </div>
            <div id="contents">
                <div style="float: right; margin-top: 20px">
                    <a @click="install" class="big-button">{{json.installed ? 'RE' : ''}}INSTALL</a>
                    <a v-if="json.installed" @click="launch" class="big-button" style="margin-left: 10px">START</a>
                </div>
                <h1>{{entry.name}}</h1>
                <h2>{{entry.short_description}}</h2>
                <br>
                <h3>DESCRIPTION</h3>
                <h2 style="font-size: 25px; font-weight: 500">{{entry.description}}</h2>
                
                <br><br>
                <span v-for="category of entry.categories" :key="category" class="category">{{category}}</span>
                
                <br><br><br>
                <Modal ref="dlcEntry" :mtitle="'DLC'">
                    <div style="float: right; margin-top: 5px">
                        <a class="big-button" style="font-size: 20px; padding: 6px 10px">{{false ? 'RE' : ''}}INSTALL</a>
                    </div>
                    <h1 style="font-size: 40px">Redesky Bug</h1>
                    <h3 style="font-size: 30px;">DESCRIPTION</h3>
                    <h2 style="font-size: 27px; max-width: 600px;">LiquidBounce is a so-called hacked client for the game Minecraft.</h2>
                </Modal>
                <h3>DLCs</h3>
                <DLC @click.native="$refs.dlcEntry.open()" />
            </div>
        </div>
    </div>
</template>
<script>
import electron from 'electron';
import DLC from '../components/DLC.vue';
import Modal from '../components/Modal.vue';
const fs = require("fs")
const os = require("os")
export default {
  components: { DLC, Modal },
    data: ()=>({
        entry: {
            name: "LOADING",
            description: "LOADING",
            image:  require("../assets/img/ex.png"),
            banner: require("../assets/img/ex.png"),
            download_url: '',
            categories: [],
        },
        json: { installed: false }
    }),
    mounted() {
        this.load(this.$route.params.id)

        electron.ipcRenderer.on("asynchronous-message", (event, data) => {
        console.log(data);
            if (data.action == 'done') {
                this.load(this.$route.params.id)
            }
        })
    },
    methods: {
        load(id){
            this.api.get("/v1/clients/"+id)
                .then(res=>res.json())
                .then(res=>{
                    this.entry = res

                    if (fs.existsSync(os.homedir()+"/.inxanelauncher/clients/"+res.id+"/launcher.json")) {
                        try {
                            this.json = JSON.parse(fs.readFileSync(os.homedir()+"/.inxanelauncher/clients/"+res.id+"/launcher.json"))
                        } catch (e) {
                            console.log(e);
                        }
                    }
                })
        },
        install(){
            electron.ipcRenderer.send('request-mainprocess-action', {
                "action": "install",
                "id": this.entry.id,
                "name": this.entry.name,
                "image": this.entry.image,
                "download": this.entry.download_url
            });
        },
        launch(){
            electron.ipcRenderer.send('request-mainprocess-action', {
                "action": "launch",
                "id": this.entry.id
            });
        }
    }
    
}
</script>
<style lang="scss" scoped>
#market-place-entry {
    min-height: 100%;

    #top {
        background-size: cover;
        background-position: center;
        height: 70px;

        svg {
            width:  56px;
            height: 56px;
            margin: 7px;
            border-radius: 100px;
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            &:hover {
                background: #FFFFFF44;
            }
        }

        h1 {
            display: inline-block;
            vertical-align: middle;
            font-size: 40px;
            margin-left: 10px;
            font-weight: 600;
            user-select: none;
        }

        img {
            height: 46px;
            margin: 12px;
            display: inline-block;
            vertical-align: middle;
            user-select: none;
        }
    }

    #contents {
        padding: 80px 50px;

        // background-image: url(../assets/img/neon.svg);
        background-position: center;
        background-size: cover;

        min-height: 100%;

        h1 {
            font-size: 70px;
            font-weight: 600;
            user-select: none;
        }

        h2 {
            font-size: 35px;
            margin-top: 20px;
            max-width: 800px;
            font-weight: 600;
        }

        h3 {
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 35px;
            margin-top: 20px;
            max-width: 800px;
            font-weight: 600;

        }

        .category {
            font-size: 22px;
            padding: 3px 14px;
            display: inline-block;
            background: #FFF;
            color: #04091A;
            margin-right: 10px;
            border-radius: 4px;
            font-weight: 600;
            user-select: none;
        }
    }
}
</style>