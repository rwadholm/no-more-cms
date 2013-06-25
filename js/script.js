$(document).ready(function(){
	$('#login').colorbox({inline: true, width: '300px'});
	
	$('form#loginForm').submit(function(e){
				
		if($('input#vip').val() == '' || $('input#vipp').val() == ''){
			$(this).css({'color':'red'});
			return false;
		} else {
			return true;
		}
		return false;
	});
	
	currentBodyID = $('body').attr('id');
	$('#topNav > ul > li > a[rel="'+ currentBodyID +'"]').addClass('currentNav');
	
	$('#outsideWrapper #topNav li.dropDown ul').each(function(){
		$(this).attr('style','display: none; left: 0px;');
	});
	var hoverIntentConfig = {    
		over: function(){
			$(this).find('ul').fadeIn(100);
		},
		timeout: 300, // number = milliseconds delay before onMouseOut    
		out: function(){	
			$(this).find('ul').fadeOut(100);
		}
	};
	$('#outsideWrapper #topNav li.dropDown').hoverIntent(hoverIntentConfig);
	
	$('input#referral').bind("propertychange keyup input paste", function(event){	
		if($(this).val() != ""){
			$('#referralRelated').fadeIn(1000);
		}
	});
	
	$('form.startForm a').live('click', function(e){
		e.preventDefault();
	});
	
	/* Resize background */
	pageSize = $('#wrapper').height();
	bgPosition = pageSize +100;
	
	$('body').css({'background-position':'center '+ bgPosition +'px'});
	
	/* Assessment */	
	$('.hiddenDiv').css({'display':'none'});
    $('#modelDiv').css({'display':'block'});
	$('.next').css({'display':'inline-block'});	
	
	$('form#assessmentPage p span').live('click', function(e){
		$(this).parent().find('.radioSelect').toggleClass('radioSelect');
		$(this).find('input').attr('checked', true);
		$(this).toggleClass('radioSelect');
	});
	
	$('#nav a').live('click', function(e){
		e.preventDefault();
		$('a.currentTab').toggleClass('currentTab');
		$(this).toggleClass('currentTab');
		
		
		$('.hiddenDiv').css({'display':'none'});

        alphaSection = $(this).attr('rel'); 

        $('div#'+ alphaSection).fadeIn();
    });
	
	$('.next').live('click', function(e){
		e.preventDefault();
		
		$(this).parent().parent().css({'display':'none'}).next().fadeIn();
		
		$('a.currentTab').toggleClass('currentTab');
		
		newTab = $(this).parent().parent().attr('id');
		
		$('a[rel="'+ newTab +'"]').next().toggleClass('currentTab'); 		
	});
	
	$('.back').live('click', function(e){
		e.preventDefault();
		
		$(this).parent().parent().css({'display':'none'}).prev().fadeIn();
		
		$('a.currentTab').toggleClass('currentTab');
		
		newTab = $(this).parent().parent().attr('id');
		
		$('a[rel="'+ newTab +'"]').prev().toggleClass('currentTab'); 		
	});	
	
	$('form#assessmentPage').submit(function(){
		
		totalChecked = 0;
		
		$('#assessmentPage .hiddenDiv p').each(function(){
			areChecked = $(this).find('input:checked').length;
			isInput = $(this).find('input').length;
			if(areChecked < 1 && isInput >= 1){
				$(this).addClass('unchecked');
			} else if (areChecked == 1){
				totalChecked ++;
				$(this).removeClass('unchecked');
			}
		});
		
		if(totalChecked < 54){
			$('.error').remove();
			$(this).after('<div class="error" style="border-left: 10px solid #900; color: #900; padding: 10px; margin: 10px 0px; box-shadow: 0px 0px 3px #ccc;">Please answer all questions. (All unanswered questions have been highlighted in red.) Only '+ (54 - totalChecked) +' questions above still need to be answered.</div>');
			return false;
		} else if(totalChecked == 54){
			return true;
		}
	});
		
	
	$('.hide_results div').css({'display':'none'});
	currentScore = $('.hide_results').attr('rel');
	
	if(currentScore >= 241){
		$('.hide_results div.A').show();
		$('.hide_results h1').after('<h2>Your Score: '+ currentScore +'</h2>');	
	} else if (currentScore >= 148){
		$('.hide_results div.C').show();
		$('.hide_results h1').after('<h2>Your Score: '+ currentScore +'</h2>');
	} else if (currentScore >= 54){
		$('.hide_results div.F').show();
		$('.hide_results h1').after('<h2>Your Score: '+ currentScore +'</h2>');
	} else {
		$('.hide_results h2').hide();
		$('.hide_results h1').after('<p><strong>You have no score yet. <a href="/">Take the assessment</a> and see how you do!</strong></p>');
	}
	
});