<template>
    <div class="market-entry">
        <div class="image" :style="{backgroundImage: 'url('+image+')'}">
            <a>{{action}}</a>
        </div>
        <span>{{name}}</span>
        <slot />
    </div>
</template>
<script>
export default {
    name: "DLC",
    props: {
        name: {default: "LOADING"},
        action: {default: "VIEW"},
        image: {default: require('../assets/img/ex.png')}
    }
}
</script>
<style lang="scss" scoped>
.market-entry {
    display: inline-block;
    text-decoration: none;
    margin-right: 20px;
    margin-bottom: 25px;
    cursor: pointer;
    user-select: none;
    
    .image {
        display: block;
        background-size: cover;
        background-position: center;
        width: 150px;
        height: 70px;
        object-fit: cover;
        border-radius: 10px;

        a {
            display: none;
            text-align: center;
            padding-top: 24px;
            font-weight: 700;
            font-size: 22px;
        }
    }

    span {
        display: block;
        text-align: center;
        margin-top: 17px;
        font-size: 20px;
        color: #FFF;
        width: 150px;
        font-weight: 500;
    }

    &:hover {
        .image {
            box-shadow: inset 0 0 100px 10px #00000066;
            a {
                display: block;
            }
        }
    }
}
</style>