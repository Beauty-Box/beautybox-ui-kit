export default {
    name: 'BTimer',
    render(h) {
        h('span', this.timerTime);
    },
    props: {
        time: {
            type: [Number, String],
            default: 100,
        },
    },
    data: (vm) => ({
        timer: null,
        timerTime: vm.time,
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
                if (this.timerTime > 0) {
                    this.timerTime--;
                } else {
                    clearInterval(this.timer);
                    this.$emit('afterEnd');
                }
            }, 1000);
        },
    },
};
