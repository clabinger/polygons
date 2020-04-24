const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

new Vue({
  el: "#app",
  data: {
  	size: 100,
    current: [0, 0],
  	points: [],
    drawActive: false,
    removeActive: false
  },
  computed: {
  	pointList() {
    	return this.points.join(' ')
    }
  },
  created () {
  	this.points.push(this.current)
  },
  created () {
  	window.setInterval(() => {
    	if (this.drawActive) {
      	this.draw()
      }
      if (this.removeActive) {
      	this.remove()
      }
    }, 1)
  },
  methods: {
  	reset () {
    	this.drawActive = false
      this.removeActive = false
      this.points = []
    },
  	toggleDraw () {
    	this.drawActive = !this.drawActive
    },
    toggleRemove(){
    	this.removeActive = !this.removeActive
    },
    stopRemove () {
    	this.removeActive = false
    },
  	draw () {
    	if (this.points.length === 0) {
      	this.points.push(this.current)
      }
      
      const current = this.points.slice(-1)[0]
    	let x = current[0]
      let y = current[1]
      x += getRandomInt(-5,5)
      y += getRandomInt(-5,5)
      
      if (x > this.size) {
      	x = this.size
      } else if(x < 0) {
      	x = 0
      }
      
      if (y > this.size) {
      	y = this.size
      } else if(y < 0) {
      	y = 0
      }
      
      this.points.push([x,y])
    },
    remove () {
    	if (this.removeActive && this.points.length > 0) {
      	const index = getRandomInt(1, this.points.length) - 1
      	this.points.splice(index, 1)
      } else {
      	this.removeActive = false
      }
    }
  }
})