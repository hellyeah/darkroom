var Carousel = function() {
  this.$window = $(window)
  this.$items = $('carousel-item')

  
}

Carousel.prototype._manyItems = function() {
  
}

Carousel.prototype.init = function() {
  var self = this

  this.$window.resize(function(e) {
    self._manyItems()
  })
}
