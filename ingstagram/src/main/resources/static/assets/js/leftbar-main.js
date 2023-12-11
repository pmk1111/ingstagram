new Vue({
    el: '#leftbar-main',
    data: {
      showLogo: window.innerWidth >= 1263
    },
    mounted() {
      this.handleResize();
      window.addEventListener('resize', _.throttle(this.handleResize, 50));
    },
    methods: {
      handleResize() {
        this.showLogo = window.innerWidth >= 1263;
      },
    },
  });