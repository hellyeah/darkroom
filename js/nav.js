/**
 * Navigation bar object for darkroom
 * @constructor
 */
var Nav = function() {
  // memoization ftw
  this.$window = $(window)
  this.$sections = $('.scroll')
  this.navOriginalTop = $('.navbar').offset().top

  // makes the navigation elements clickable and they scroll down to the appropriate
  // section. Elements with classes starting with 'nav-scroll-' will be the
  // navigation elements that are clickable
  $('[class*=nav-scroll]').each(function(ind, el) {
    var classes =  el.className.split(/\s+/)
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('nav-scroll-') > -1) {
        $(el).click(function(e) {
          $('html, body').animate({
            // elements to be scrolled to will have a class name that matches the
            // latter part of the 'nav-scroll' class on the navigation element
            scrollTop: $(classes[i].replace('nav-', '.')).offset().top
          }, 'slow', 'swing')
        })
        break
      }
    }
  })
}


/**
 * Determines which navigation item should be higlighted based on the user's position
 * on the page. To be bound to scroll event.
 */
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


/**
 * Keeps the navigation bar at the top of the page except during splash screen. Bind
 * to scroll
 */
Nav.prototype._navHeight = function() {
  var top = window.scrollY

  if (top > this.navOriginalTop)
    $('.navbar').css('position', 'fixed').css('top', 0)
  else
    $('.navbar').css('position', 'absolute').css('top', this.navOriginalTop)
}


/**
 * Must be called to initialize the Nav instance
 */
Nav.prototype.init = function() {
  var self = this

  this.$window.scroll(function(e) {
    self._activeNav()
    self._navHeight()
  })
}
