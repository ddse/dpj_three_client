<template>
    <li v-bind:class="['page-item', { 'disabled': disabled === true }, { 'active': active === true }]">
        <a class="page-link" href="#" v-on:click="click">
            <slot></slot>
        </a>
    </li>
</template>
<script>
export default {
    name:"PaginatorItem",
    
}
</script>