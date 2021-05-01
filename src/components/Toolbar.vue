<template>
    <div>
        <div id="toolbar">
            <span>INXANE<span style="color: #343aeb">LAUNCHER</span></span>
            <div style="float: right; -webkit-app-region: no-drag" id="buttons">
                <svg @click="minimize" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="31" height="6" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 35 29)" fill="white"/></svg>
                <svg @click="maximize" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="31" height="6" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 35 29)" fill="white"/><rect width="31" height="6" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 10 35)" fill="white"/><rect width="31" height="6" transform="matrix(1 1.74846e-07 1.74846e-07 -1 4 10)" fill="white"/><rect width="31" height="6" transform="matrix(-4.37114e-08 1 1 4.37114e-08 29 4)" fill="white"/></svg>
                <svg @click="exit" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7.24268" y="3" width="42" height="6" transform="rotate(45 7.24268 3)" fill="white"/><rect width="42" height="6" transform="matrix(-0.707107 0.707107 0.707107 0.707107 32.6982 3)" fill="white"/></svg>
            </div>
        </div>
    </div>
</template>
<script>
import electron from 'electron';
export default {
    data: ()=>({
        progress: "50%"
    }),
    mounted(){
        electron.ipcRenderer.on("router-push", (event, data)=>{
            this.$router.push(data.url)
        })
    },
    methods: {
        exit(){
            electron.ipcRenderer.send('request-mainprocess-action', {
                "action": "exit"
            });
        },
        maximize(){
            electron.ipcRenderer.send('request-mainprocess-action', {
                "action": "maximize"
            });
        },
        minimize(){
            electron.ipcRenderer.send('request-mainprocess-action', {
                "action": "minimize"
            });
        }
    }
}
</script>

<style lang="scss" scoped>
#toolbar {
    -webkit-app-region: drag;
    height: 20px;
    width: 100%;
    background: #0E1631;
    padding: 0px 4px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100000000000000000000;
    user-select: none;

    span {
        font-size: 16px;
        font-weight: 700;
        padding: 4px;
        line-height: 21.5px;
    }

    #buttons {
        svg {
            cursor: pointer;
            height: 20px;
            width:  20px;
            padding: 4px;

            &:hover {
                background: #00000033;
            }
        }
    }


    #progress-indicator {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 20%;
        height: 10px;
        background: #343aeb;
    }
}
</style>