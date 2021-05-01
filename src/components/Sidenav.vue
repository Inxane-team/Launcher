<template>
    <div id="sidenav">
        <svg id="logo" width="147" height="79" viewBox="0 0 147 79" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M13.3144 25.3636H7.47132V53H13.3144V25.3636ZM23.7623 41.017C23.7758 38.3452 25.3682 36.7798 27.6892 36.7798C29.9967 36.7798 31.3866 38.2912 31.3731 40.8281V53H37.1217V39.8026C37.1217 34.9716 34.2879 32.0028 29.9697 32.0028C26.893 32.0028 24.6665 33.5142 23.7354 35.9297H23.4925V32.2727H18.0138V53H23.7623V41.017ZM82.7426 53.3913C85.8058 53.3913 87.7895 52.0554 88.8016 50.1257H88.9635V53H94.4152V39.0199C94.4152 34.081 90.232 32.0028 85.6169 32.0028C80.651 32.0028 77.3854 34.3778 76.5892 38.1562L81.906 38.5881C82.2973 37.2116 83.5253 36.1996 85.5899 36.1996C87.5466 36.1996 88.6666 37.1847 88.6666 38.8849V38.9659C88.6666 40.3018 87.2497 40.4773 83.6468 40.8281C79.5445 41.206 75.8605 42.5824 75.8605 47.2109C75.8605 51.3132 78.7888 53.3913 82.7426 53.3913ZM84.3889 49.424C82.6212 49.424 81.3527 48.6009 81.3527 47.022C81.3527 45.4027 82.6887 44.6065 84.7128 44.3232C85.9678 44.1477 88.0189 43.8509 88.7071 43.392V45.5916C88.7071 47.7642 86.9124 49.424 84.3889 49.424ZM104.624 41.017C104.637 38.3452 106.229 36.7798 108.551 36.7798C110.858 36.7798 112.248 38.2912 112.234 40.8281V53H117.983V39.8026C117.983 34.9716 115.149 32.0028 110.831 32.0028C107.754 32.0028 105.528 33.5142 104.597 35.9297H104.354V32.2727H98.8751V53H104.624V41.017ZM131.96 53.4048C137.088 53.4048 140.542 50.9084 141.352 47.0625L136.035 46.7116C135.455 48.2905 133.97 49.1136 132.054 49.1136C129.18 49.1136 127.358 47.2109 127.358 44.1207V44.1072H141.473V42.5284C141.473 35.4844 137.209 32.0028 131.73 32.0028C125.631 32.0028 121.677 36.3345 121.677 42.7308C121.677 49.3026 125.577 53.4048 131.96 53.4048ZM127.358 40.5447C127.48 38.1832 129.274 36.294 131.825 36.294C134.321 36.294 136.049 38.0753 136.062 40.5447H127.358Z" fill="white"/><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="23" y="5" width="70" height="70"><rect x="23" y="5" width="70" height="70" fill="#C4C4C4"/></mask><g mask="url(#mask0)"><mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="30" y="12" width="56" height="56"><circle cx="58" cy="40" r="27.7889" fill="white"/></mask><g mask="url(#mask1)"><rect width="10.3769" height="62.9648" transform="matrix(-0.902603 -0.430474 -0.430474 0.902603 76.1758 13.3435)" fill="white"/></g><rect x="17.7094" y="-32.7758" width="10.3769" height="130.659" transform="rotate(-25.4977 17.7094 -32.7758)" fill="white"/></g></g><defs><clipPath id="clip0"><rect width="147" height="79" fill="white"/></clipPath></defs></svg>

        <div id="entries">
            <router-link class="entry" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">  <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg>
                <span>Home</span>
            </router-link>
            <router-link class="entry" to="/market">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/></svg>
                <span>Market</span>
            </router-link>
            <router-link class="entry" to="/library">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16"><path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/><path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/></svg>
                <span>Library</span>
            </router-link>
        </div>

        <div id="progress-indicator" :style="{width: progress, paddingLeft: progress != '0%' ? '10px' : '0'}">{{dwtext}}</div>

    </div>
</template>
<script>
import electron from 'electron';
export default {
    data: ()=>({
        progress: "0%",
        dwtext: ""
    }),
    mounted(){
        electron.ipcRenderer.on("asynchronous-message", (event, data) => {
            console.log(data);
            if (data.action == 'progress') {
                this.progress = data.progress+"%"
            } else if (data.action == 'start-dw') {
                this.dwtext = data.text
            } else if (data.action == 'done') {
                this.dwtext = ""
                this.progress = "0%"
            }
        })
    },
    
}
</script>

<style lang="scss" scoped>
#sidenav {
    background: #0E1631;
    position: fixed;
    width: 300px;
    height: 100%;
    top: 20px;

    #logo {
        margin: 10px;
    }

    #entries {
        margin-top: 10px;
        .entry {
            user-select: none;
            display: block;
            color: #FFF;
            text-decoration: none;
            padding: 8px 14px;
            svg {
                width:  35px;
                height: 35px;
                vertical-align: middle;
                display: inline-block;
            }

            span {
                font-size: 26px;
                vertical-align: middle;
                display: inline-block;
                margin-left: 16px;
                font-weight: 500;
            }

            &:hover, &.selected, &.router-link-exact-active {
                background: linear-gradient(90deg, #00000055, #00000020)
            }
        }
    }

    #progress-indicator {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 0%;
        height: 20px;
        font-weight: 600;
        background: #343aeb;
        transition: 0.1s;
    }
}

</style>