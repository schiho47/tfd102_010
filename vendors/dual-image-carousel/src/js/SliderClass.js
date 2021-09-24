import $ from 'jquery'

class Slider {
  constructor({ slider, images, prev, next }) {
    this.slider = slider 
    this.images = images 
    this.prev = prev 
    this.next = next

    this.position = 0
    this.width = this.getImagesWidth()

    this.addClassAndAtts()
    this.addMoreImages()

    // Make last image active
    this.slider.find('img:last-child').prev().addClass('active')
  }

  // Add class and data index attribute to images
  addClassAndAtts() {
    this.images.each(function(index){
      $(this).addClass(`img-${index + 1}`)
      $(this).attr('data-index', index + 1)
    })
  }

  // Add more set of images to slider if there is space
  addMoreImages() {
    if(this.slider.find('img:first-child').offset().left > 0) {
      if(this.slider.find('img:first-child').offset().left > this.width) {
        let times = Math.ceil(this.slider.find('img:first-child').offset().left / this.width)
        for(let i = 0; i < times; i++) {
          this.slider.prepend(this.images.clone())
        }
      }else {
        this.slider.prepend(this.images.clone())
      }
    }
  }

  // Calculate images width
  getImagesWidth() {
    let width = 0
    this.images.each(function(){
      width += $(this).width()
    })
    return width
  }

  /**
   * Events
   */
  onPrevButtonClick() {
    const activeImg = this.slider.find('img.active')
    activeImg.removeClass('active')
    activeImg.prev().addClass('active')
    let img = this.slider.find('img:last-child')
    this.position = activeImg.width() + 10
    this.slider.css('transition-duration', '.3s')
    this.slider.css('transform', `translateX(${this.position}px)`)
    setTimeout(() => {
      this.slider.css('transition-duration', '0s')
      this.slider.css('transform', `translateX(0px)`)
      this.slider.prepend(img)
    }, 300)
  }

  onNextButtonClick() {
    const activeImg = this.slider.find('img.active')
    activeImg.removeClass('active')
    activeImg.next().addClass('active')
    let img = this.slider.find('img').eq(0)
    this.position = -activeImg.next().width() - 10
    this.slider.css('transition-duration', '.3s')
    this.slider.css('transform', `translateX(${this.position}px)`)
    setTimeout(() => {
      this.slider.css('transition-duration', '0s')
      this.slider.css('transform', `translateX(0px)`)
      this.slider.append(img)
    }, 300)
  }
}

export default Slider