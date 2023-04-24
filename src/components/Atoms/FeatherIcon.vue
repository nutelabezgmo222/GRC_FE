<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke="currentColor"
    :width="`${width}px`"
    :height="`${height}px`"
    :class="fillClass"
    @click="$emit('click', $event)"
    v-html="svg">
  </svg>
</template>

<script>
import feather from 'feather-icons';

export default {
    name: 'FeatherIcon',
    description: 'FeatherIcon is an icon. By passing the icon prop a svg is created.',
    token: '<feather-icon :icon="" :width="" :height="" />',
    props: {
        icon: {
            type: String,
            required: true,
            note: 'the name of the feather icon. You can find the list of icons on the website: https://feathericons.com/',
        },
        width: {
            type: [String, Number],
            default: '30',
            note: 'the width of the feather icon',
        },
        height: {
            type: [String, Number],
            default: '30',
            note: 'the height of the feather icon',
        },
        fillClass: {
            type: String,
            default: 'fill-none',
            note: 'the fill color of the feather icon as tailwind color',
        },
        crossed: {
            type: Boolean,
            default: false,
            note: 'if icon should have diagonal crossing line',
        },
    },
    emits: ['click'],
    computed: {
        svg() {
            const icon = feather.icons[this.icon];
            return icon ? icon.toSvg().match(/<svg.*?>(.*?)<\/svg>/)[1] + this.additionalShapes : undefined;
        },
        additionalShapes() {
            return this.crossed ? '<line x1="0" y1="0" x2="24" y2="24"/>' : '';
        },
    },
};
</script>