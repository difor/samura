﻿/**
 * Thumbs Plugin
 * @version 2.0.0
 * @author Gijs RogÃ©
 * @license The MIT License (MIT)
 */
 !function(t,e,i,n){"use strict";var s=function(e){this.owl=e,this._thumbcontent=[],this._identifier=0,this.owl_currentitem=this.owl.options.startPosition,this.$element=this.owl.$element,this._handlers={"prepared.owl.carousel":t.proxy(function(e){if(!e.namespace||!this.owl.options.thumbs||this.owl.options.thumbImage||this.owl.options.thumbsPrerendered||this.owl.options.thumbImage){if(e.namespace&&this.owl.options.thumbs&&this.owl.options.thumbImage){var i=t(e.content).find("img");this._thumbcontent.push(i)}}else void 0!==t(e.content).find("[data-thumb]").attr("data-thumb")&&this._thumbcontent.push(t(e.content).find("[data-thumb]").attr("data-thumb"))},this),"initialized.owl.carousel":t.proxy(function(t){t.namespace&&this.owl.options.thumbs&&(this.render(),this.listen(),this._identifier=this.owl.$element.data("slider-id"),this.setActive())},this),"changed.owl.carousel":t.proxy(function(t){t.namespace&&"position"===t.property.name&&this.owl.options.thumbs&&(this._identifier=this.owl.$element.data("slider-id"),this.setActive())},this)},this.owl.options=t.extend({},s.Defaults,this.owl.options),this.owl.$element.on(this._handlers)};s.Defaults={thumbs:!0,thumbImage:!1,thumbContainerClass:"owl-thumbs",thumbItemClass:"owl-thumb-item",moveThumbsInside:!1},s.prototype.listen=function(){var e=this.owl.options;e.thumbsPrerendered&&(this._thumbcontent._thumbcontainer=t("."+e.thumbContainerClass)),t(this._thumbcontent._thumbcontainer).on("click",this._thumbcontent._thumbcontainer.children(),t.proxy(function(i){this._identifier=t(i.target).closest("."+e.thumbContainerClass).data("slider-id");var n=t(i.target).parent().is(this._thumbcontent._thumbcontainer)?t(i.target).index():t(i.target).closest("."+e.thumbItemClass).index();e.thumbsPrerendered?t("[data-slider-id="+this._identifier+"]").trigger("to.owl.carousel",[n,e.dotsSpeed,!0]):this.owl.to(n,e.dotsSpeed),i.preventDefault()},this))},s.prototype.render=function(){var e=this.owl.options;e.thumbsPrerendered?(this._thumbcontent._thumbcontainer=t("."+e.thumbContainerClass),e.moveThumbsInside&&this._thumbcontent._thumbcontainer.appendTo(this.$element)):this._thumbcontent._thumbcontainer=t("<div>").addClass(e.thumbContainerClass).appendTo(this.$element);var i;if(e.thumbImage)for(i=0;i<this._thumbcontent.length;++i)this._thumbcontent._thumbcontainer.append("<button class="+e.thumbItemClass+'><img src="'+this._thumbcontent[i].attr("src")+'" alt="'+this._thumbcontent[i].attr("alt")+'" /></button>');else for(i=0;i<this._thumbcontent.length;++i)this._thumbcontent._thumbcontainer.append("<button class="+e.thumbItemClass+">"+this._thumbcontent[i]+"</button>")},s.prototype.setActive=function(){this.owl_currentitem=this.owl._current-this.owl._clones.length/2,this.owl_currentitem===this.owl._items.length&&(this.owl_currentitem=0);var e=this.owl.options,i=e.thumbsPrerendered?t("."+e.thumbContainerClass+'[data-slider-id="'+this._identifier+'"]'):this._thumbcontent._thumbcontainer;i.children().filter(".active").removeClass("active"),i.children().eq(this.owl_currentitem).addClass("active")},s.prototype.destroy=function(){var t,e;for(t in this._handlers)this.owl.$element.off(t,this._handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.Thumbs=s}(window.Zepto||window.jQuery,window,document);