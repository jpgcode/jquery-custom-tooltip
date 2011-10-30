/* 
JPG Code Tooltip
Author: José Pablo Granados
Email: jpavril1@gmail.com
Date: October, 2011
*/

var Tooltip = {
	vars: {
		trigger: null,
		content: null,
		mouseoverTooltip: null,
		xPosition: null,
		yPosition: null
	},
	config: {
		tWidth : "110px",
		tHeight: "90px",
		hasScroll: false,
		delayTime: 600,
		fadeInTime: 200,
		fadeOutTime: 200,
		tooltipPosition: "top"
	},
	init: function(selector){
		Tooltip.vars.trigger = $(selector);
		Tooltip.vars.content = $(selector).next();
		Tooltip.mouseOverValidation();	
		Tooltip.mouseOutValidation();
	},
	mouseOverValidation: function(){
		Tooltip.vars.trigger.mouseover(function(){
			$(".tooltipContent").hide();
			var currentTooltip = $(this);
			Tooltip.vars.mouseoverTooltip = true;
			Tooltip.findPos(currentTooltip);
			Tooltip.show(currentTooltip);
		});	
		Tooltip.vars.content.mouseover(function(){
			Tooltip.vars.mouseoverTooltip = true;
		});
	},
	mouseOutValidation: function(){
		Tooltip.vars.trigger.mouseout(function(){
			Tooltip.vars.mouseoverTooltip = false;
			var currentTooltip = $(this);
			var position = "Trigger";
			setTimeout(function(){
				Tooltip.hide(position, currentTooltip);
			}, Tooltip.config.delayTime);
		});
		Tooltip.vars.content.mouseout(function(){
			Tooltip.vars.mouseoverTooltip = false;
			var currentTooltip = $(this);
			var position = "Content";
			setTimeout(function(){
				Tooltip.hide(position, currentTooltip);
			}, Tooltip.config.delayTime);
		});	
	},
	show : function(currentTooltip){
		if(Tooltip.config.hasScroll == true){
			currentTooltip.next().css({"width": Tooltip.config.tWidth, "height": Tooltip.config.tHeight,  "overflow-y": "auto", "position": "absolute", "top": Tooltip.vars.yPosition, "left": Tooltip.vars.xPosition, "z-index": "99"});
		}else{
			currentTooltip.next().css({"width": Tooltip.config.tWidth, "height": Tooltip.config.tHeight,"position": "absolute", "top": Tooltip.vars.yPosition, "left": Tooltip.vars.xPosition, "z-index": "99"});
		}
		currentTooltip.next().animate({opacity: 1, top: '+=50', height: 'toggle'}, Tooltip.config.fadeInTime);
	},
	hide : function(position, currentTooltip){
		if(Tooltip.vars.mouseoverTooltip == false){
			if(position == "Trigger"){
				currentTooltip.next().fadeOut(Tooltip.config.fadeOutTime);
			}else{
				currentTooltip.fadeOut(Tooltip.config.fadeOutTime);
			}
		}
	},
	findPos: function (obj){
		var position = obj.offset();
		switch(Tooltip.config.tooltipPosition){
			case "top":
				Tooltip.vars.xPosition = position.left -	65;
				Tooltip.vars.yPosition = position.top - 185;
			break;
			case "left":
				Tooltip.vars.xPosition = position.left - 155;
				Tooltip.vars.yPosition = position.top - 65;
			break;
			case "right":
				Tooltip.vars.xPosition = position.left + 15;
				Tooltip.vars.yPosition = position.top - 65;
			break;
			case "bottom":
				Tooltip.vars.xPosition = position.left - 75;
				Tooltip.vars.yPosition = position.top - 30;
			break;
			case "topRight":
				Tooltip.vars.xPosition = position.left;
				Tooltip.vars.yPosition = position.top - (parseInt(Tooltip.config.tHeight) + 90);
			break;
			case "topLeft":
				Tooltip.vars.xPosition = position.left - 145;
				Tooltip.vars.yPosition = position.top - (parseInt(Tooltip.config.tHeight) + 90);
			break;
			case "bottomRight":
				Tooltip.vars.xPosition = position.left + 10;
				Tooltip.vars.yPosition = position.top - 40;
			break;
			case "bottomLeft":
				Tooltip.vars.xPosition = position.left - 165;
				Tooltip.vars.yPosition = position.top - 40;
			break;
		}
	}

}
$(function() {
	Tooltip.init(".hasTooltip");
});