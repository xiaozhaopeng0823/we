// components/tabs/tabs.js
Component({
  properties: {
    tabs:{
      type:Array,
      default:[]
    }
  },
  data: {

  },
  methods: {
    changeState(e) {
      // console.log(e);
      this.triggerEvent('change',e.currentTarget.dataset.id)
    }
  }
})
