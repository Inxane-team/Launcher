<template>
  <div>
    <div id="home">
      <h1>CLIENTS</h1>
      <div>
        <br>
        <MarketEntry v-for="item of entries" :key="item.id" @click.native="$router.push('/market/'+item.id)" :name="item.name" :image="item.image" />
      </div>
    </div>
  </div>
</template>

<script>
import MarketEntry from "../components/MarketEntry";
export default {
  name: 'Home',
  data: ()=>({
    entries: []
  }),
  components: {
    MarketEntry
  },
  mounted(){
    this.api.get("/v1/clients")
      .then(res => res.json())
      .then(res => {
        this.entries = res.data
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
}
</style>