import { ref, onMounted } from 'vue'

export function useType(dataType, dataPeriod, params = {}) {
  const typewrite = ref()
  const { speed = 150 } = params

  onMounted(() => {
    var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate
      this.el = el
      this.loopNum = 0
      this.period = parseInt(period, 10) || 2000
      this.txt = ''
      this.tick()
      this.isDeleting = false
    }
    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length
      var fullTxt = this.toRotate[i]

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

      var that = this
      var delta = speed - Math.random() * 100

      if (this.isDeleting) {
        delta /= 2
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period
        this.isDeleting = true
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false
        this.loopNum++
        delta = 500
      }

      setTimeout(function () {
        that.tick()
      }, delta)
    }

    var toRotate = dataType
    var period = dataPeriod
    if (toRotate) {
      new TxtType(typewrite.value, toRotate, period)
    }
  })

  const TypeWrite = () => (
    <a ref={typewrite} class="typewrite">
      <span class="wrap"></span>
    </a>
  )

  return { TypeWrite }
}
