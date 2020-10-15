export default {
    name: 'BTimer',
    props: {
        time: {
            type: [Number, String],
            default: 100,
        },
    },
    data: (vm) => ({
        timer: null,
        propsTime: vm.time,
    }),
    mounted() {
        this.$nextTick(() => {
            this.startTimer();
        });
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        startTimer() {
            this.timer = setInterval(() => {
                if (this.propsTime > 0) {
                    this.propsTime--;
                } else {
                    clearInterval(this.timer);
                    this.$emit('end');
                }
            }, 1000);
        },
    },
    render(h) {
        return h('span', this.propsTime);
    },
};
