
var  wrapVid, video, seekBar, volumeBar, playBtn, pauseBtn, stopBtn, nextBtn, nextTenBtn, previousBtn, previousTenBtn, muteBtn, fullScreenBtn, extFullScreenBtn, curTime, durTime, controlsBar;

controlsBar = document.querySelector('#video_controls_bar');
wrapVid = document.querySelector('#video_player_box');
playBtn = document.querySelector('#playButtom');
pauseBtn = document.querySelector('#pauseButtom');
stopBtn = document.querySelector('#stopButton');
nextBtn = document.querySelector('#nextFrame');
nextTenBtn = document.querySelector('#nextTenFrames');
previousTenBtn = document.querySelector('#previousTenFrames');
previousBtn = document.querySelector('#previousFrame');
muteBtn = document.querySelector('#muteBtn');
fullScreenBtn = document.querySelector('#fullScreen');
extFullScreenBtn = document.querySelector('#exitFullScreen');
curTime = document.querySelector('#curTimeTxt');
durTime = document.querySelector('#durTimeTxt');


	video = document.querySelector('.video_0');
seekBar = document.querySelector('#seekBar');
volumeBar = document.querySelector('#volumeBar');

var data_video_id = video.dataset.videoid;
var vd_id = document.querySelector('#a_' + data_video_id);
console.log(vd_id);


volumeBar.style.visibility = "hidden";
// Event listener for the seek bar
seekBar.addEventListener("change", function() {
  // Calculate the new time
  var time = video.duration * (seekBar.value / 100);

  // Update the video time
  video.currentTime = time; 
});

// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / video.duration) * video.currentTime;
  // Update the slider value
  seekBar.value = value;

  // display current time and duration 
  var curmins = Math.floor(video.currentTime / 60);
  var cursecs = Math.floor(video.currentTime - curmins * 60);
  var durmins = Math.floor(video.duration / 60);
  var dursecs = Math.round(video.duration - durmins * 60);
  if (cursecs < 10) {
  	cursecs = "0" + cursecs;
  };
  if (dursecs < 10) {
  	dursecs = "0" + dursecs;
  };
  curTime.innerHTML = curmins + ":" + cursecs;
  durTime.innerHTML = durmins + ":" + dursecs;
});


//Play Button
playBtn.addEventListener('click', onClickPlay);
function onClickPlay() {
    // video.play();

   if (video.paused) {
      video.play();
      playBtn.innerHTML = "Pause";
   } else {
      video.pause();
      playBtn.innerHTML = "Play";
   }
}
video.addEventListener('click', onClickPlayPause);
function onClickPlayPause (){
	if(video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

//Pause Button
// pauseBtn.addEventListener('click', onClickPause);
// function onClickPause() {
// 	video.pause();
// }
//Stop Button
stopBtn.addEventListener('click', onClickStopVideo);
function onClickStopVideo() {
	video.pause();
	video.currentTime = 0;
	// video.load();
}
//Next Frame Button
nextBtn.addEventListener('click', onClickNextFrame)
function onClickNextFrame() {
	video.currentTime += + 1;
}
//Next Ten Frames Button
nextTenBtn.addEventListener('click', onClickNextTenFrames)
function onClickNextTenFrames() {
	video.currentTime += + 10;
}
//Previous Frame Button
previousBtn.addEventListener('click', onClickPrev)
 function onClickPrev() {
	video.currentTime -= 1;
}
//Previous Ten Frames Button
previousTenBtn.addEventListener('click', onClickPrevTen)
function onClickPrevTen() {
	video.currentTime-= 10;
}
// Mute Button
muteBtn.addEventListener('click', onClickMuteVideo);
function onClickMuteVideo (){

	if (video.muted == false) {
	    // Mute the video
	    video.muted = true;

	    // Update the button text
	    muteBtn.innerHTML = "<i class='fa fa-volume-off'></i>";
	  } else {
     
	    // Unmute the video
	    video.muted = false;


	    // Update the button text
	    muteBtn.innerHTML = "<i class='fa fa-volume-up'></i>";
	 }
};
//Show Volume Bar on mouseover 
muteBtn.addEventListener('mouseover', onMouseOverShowVolumeBar);
function onMouseOverShowVolumeBar() {
  volumeBar.style.visibility = 'visible';
};
//Hide Volume Bar on mouseout 
muteBtn.addEventListener('mouseout', onMouseOutShowVolumeBar);
function onMouseOutShowVolumeBar() {
  volumeBar.style.visibility = 'hidden';
  // volumeBar.style.transitionDelay = "5s";
};

//Volume Bar
volumeBar.addEventListener('change', changeVolume);
function changeVolume (){
	// Update the video volume
	  video.volume = volumeBar.value;
};


// Toggle Full Screen
fullScreenBtn.addEventListener('click',onClickFullScreen);
function onClickFullScreen (){
	console.log(wrapVid.dataset);
  var expand_min_btn =  document.querySelector('#expand_min');

	if(wrapVid.dataset.fullscreen === 'false') {
    	maximiseVideo();
   		wrapVid.dataset.fullscreen = 'true' ;
     expand_min_btn.className = 'fa fa-compress';

      
	} else {
		minimiseVideo();
		 	wrapVid.dataset.fullscreen = 'false' ;
      expand_min_btn.className = 'fa fa-expand';

	}
};


function maximiseVideo(){
	if (wrapVid.requestFullscreen) {
    	  	wrapVid.requestFullscreen();
    	  	if (window.fullScreen) {
    	  		wrapVid.classList.remove('normalW');
            video.classList.remove('normalV');
    	  		wrapVid.classList.add('fs');
	    	  	video.classList.add('videoFs');
    	  	} 
    	} else if (wrapVid.msRequestFullscreen) {
    	  wrapVid.msRequestFullscreen();
    	  if (window.fullScreen) {
    	  		wrapVid.classList.remove('normalW');
            video.classList.remove('normalV');
	    	  	wrapVid.classList.add('fs');
	    	  	video.classList.add('videoFs');
    	  };
    	} else if (wrapVid.mozRequestFullScreen) { 
    	  wrapVid.mozRequestFullScreen();
    	  if (window.fullScreen) {
          console.log('hello');
    	  		// wrapVid.classList.remove('normalW');
         //    video.classList.remove('normalV');
	    	  	// wrapVid.classList.add('fs');
	    	  	// video.classList.add('videoFs');
    	  };
    	} else if (wrapVid.webkitRequestFullscreen) {
    	  wrapVid.webkitRequestFullscreen();
    	  if (window.fullScreen) {
	    	  	wrapVid.classList.remove('normalW');
            video.classList.remove('normalV');
	    	  	wrapVid.classList.add('fs');
	    	  	video.classList.add('videoFs');
    	  };
    	};
}
function minimiseVideo(){
	if (document.mozCancelFullScreen) {
	        document.mozCancelFullScreen();
	        // wrapVid.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);

			// extFullScreenBtn.style.display = "none";
	       	wrapVid.classList.remove('fs');
	        video.classList.remove('videoFs');
	        wrapVid.classList.add('normalW');
	        video.classList.add('normalV');
	      } else {
	        document.webkitCancelFullScreen();
	        // wrapVid.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	        wrapVid.classList.remove('fs');
	        video.classList.remove('videoFs');
	        wrapVid.classList.add('normalW');
	        video.classList.add('normalV');
	      }
}

// on click exit full screen and remove the full width/height classes and add the normal ones.
// extFullScreenBtn.addEventListener('click', onClickExitFullScreen);
// function onClickExitFullScreen () {
// 	if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//         // wrapVid.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);

// 		// extFullScreenBtn.style.display = "none";
//        	wrapVid.classList.remove('fs');
//         video.classList.remove('videoFs');
//         wrapVid.classList.add('normalW');
//         video.classList.add('normalV');
//       } else {
//         document.webkitCancelFullScreen();
//         // wrapVid.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
//         wrapVid.classList.remove('fs');
//         video.classList.remove('videoFs');
//         wrapVid.classList.add('normalW');
//         video.classList.add('normalV');
//       }
// };

// On key down escape (keyCode==27)
	var windowContent_keyDown;

	window.onkeydown=function ()
    {
    	windowContent_keyDown=true;
    }

	window.onkeyup=function (event) 
   {
       if (event.keyCode==27 && windowContent_keyDown) {
       		   wrapVid.classList.remove('fs');
               video.classList.remove('videoFs');
               wrapVid.classList.add('normalW');
               video.classList.add('normalV');
       };
   // windowContent_keyDown=false;
   } 

var play = true;
//Play Video when press space bar and enter
function onKeyDown (event) {
 	switch (event.keyCode) {
 		case 32: //space bar
 		if (play) {
 			video.pause();
 			play = false;
 			pauseBtn.style.color = "red";
 		} else {
 			video.play();
 			play = true;
 			playBtn.style.color = "orange";


 		}
 		break;
 		case 13: //Enter
 		if (play) {
 			video.pause();
 			play = false;
 			pauseBtn.style.color = "red";
 		} else {
 			video.play();
 			play = true;
 			playBtn.style.color = "orange";


 		}
 		break;

 	}
 }
 window.addEventListener("keydown", onKeyDown, false);
