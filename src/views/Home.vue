<template>
  <div>
    <div id="home">
      <div v-if="featured.success" id="top-banner" :style="{paddingTop: featured.icon ? '130px' : '140px', userSelect: 'none', backgroundImage: 'linear-gradient(  rgba(0, 0, 0, 0.2),   rgba(0, 0, 0, 0.3)),url('+featured.banner+')'}">
        <img v-if="featured.icon" :src="featured.icon" style="height: 70px; vertical-align: middle; " />
        <h1  v-if="!featured.icon" style="font-size: 50px; text-transform: uppercase">{{featured.name}}</h1>
        <h1 style="font-size: 30px">by {{featured.author}}</h1>

        <router-link :to="'/market/'+featured.id" style="float: right; margin-top: -50px;" class="big-button bg">VIEW MORE</router-link>
      </div>
      <br>
      <br>
      <h1>FREE CLIENTS</h1>
      <div>
        <br>
        <MarketEntry v-for="item of freeClients" :key="item.id" @click.native="$router.push('/market/'+item.id)" :name="item.name" :image="item.image" />
      </div>
    </div>
  </div>
</template>

<script>
import MarketEntry from "../components/MarketEntry";
export default {
  name: 'Home',
  data: ()=>({
    freeClients: [],
    featured: {}
  }),
  components: {
    MarketEntry
  },
  mounted(){
    this.api.get("/v1/clients", {
      category: "FREE"
    }).then(res => {
        this.freeClients = res.json().data
    })

    this.api.get("/v1/clients/featured")
      .then(res => res.json())
      .then(res => {
        this.featured = res
      })
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
    background-size: cover;
    background-position: center;
    height: 250px;
    border-radius: 10px;
    padding: 20px;
  }
}
</style>