var Nav = function() {
  this.$window = $(window)
  this.$sections = $('.scroll')
  this.navOriginalTop = $('.navbar').offset().top

  $('[class*=nav-scroll]').each(function(ind, el) {
    var classes =  el.className.split(/\s+/)
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('nav-scroll-') > -1) {
        $(el).click(function(e) {
          $('html, body').animate({
            scrollTop: $(classes[i].replace('nav-', '.')).offset().top
          }, 'slow', 'swing')
        })
        break
      }
    }
  })
}


Nav.prototype._activeNav = function() {
  var self = this,
      top = window.scrollY,
      sec

  $('.active').removeClass('active')

  this.$sections.each(function(ind, el) {
    if (Math.abs($(el).offset().top - top + self.$window.height()/4) < self.$window.height()/2) {
      var classes = el.className.split(/\s+/)
      for (var i = 0; i < classes.length; i++)
        if (classes[i].indexOf('scroll-') > -1)
          $('.nav-' + classes[i]).addClass('active')
    }
  })
}


Nav.prototype._navHeight = function() {
  var top = window.scrollY

  if (top > this.navOriginalTop)
    $('.navbar').css('position', 'fixed').css('top', 0)
  else
    $('.navbar').css('position', 'absolute').css('top', this.navOriginalTop)
}


Nav.prototype.init = function() {
  var self = this

  this.$window.scroll(function(e) {
    self._activeNav()
    self._navHeight()
  })
}
