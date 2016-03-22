$(document).ready(function(){

  var track = 0;

///////////Set Up Object Constructor for the Software///////////
  function Tune(title, artist, filename, image){
    this.title = title;
    this.artist = artist;
    this.filename = filename;
    this.image = image;
  };

///////////Now the Constructor for the Hardware//////////
  function JukeBox(){
    this.tunes = [];
    
    this.addTune = function(tune){      ////////Install some records into this baby
      this.tunes.push(tune);
    };
    
    this.switchTrack = function(track) {
      var filename = 'Jukebox/' + this.tunes[track].filename;
      var image = 'Jukebox/' + this.tunes[track].image;
      var title = this.tunes[track].title;
      var artist = 'Performed by: ' + this.tunes[track].artist;
      $("audio.current").attr("src", filename);
      $("img.current").attr("src", image); 
      $("h3.current").html(title);
      $("h4.current").html(artist);
    };

    this.play = function(){         ///////Play function
      $("audio")[0].play();
      $("#playPause").text("||");     ////////Play button becomes pause button
    };

    this.pause = function(){
      $("audio")[0].pause();
      $("#playPause").text("Play");
    };
      
    this.last = function(){
    if (track == 0) {
        track = this.tunes.length - 1;
      } else {
        track -= 1;
      };

      if ($("audio")[0].paused == false) {
        this.switchTrack(track);
        $("audio")[0].play();
        $("#playPause").text("||");
      } else {
        this.switchTrack(track);
        console.log("wait for iiiittt");
      };
    };

    this.next = function() {
      if (track == this.tunes.length - 1) {
        track = 0;
      } else {
        track += 1;
      };

      if ($("audio")[0].paused == false) {
        this.switchTrack(track);
        $("audio")[0].play();
        $("#playPause").text("||");
      } else {
        this.switchTrack(track);
        console.log("wait for iiiittt");
      };
    };

    this.stop = function(){
      $("audio")[0].pause();
      track = 0;
      this.switchTrack(track);
      $("audio")[0].currentTime = 0;
      $("#playPause").text("Play");
    };
  };

/////////////////Instantiate some objects///////////////
  var boogie = new JukeBox();

  boogie.addTune(new Tune("Big Apple Contest", "The Solomon Douglas Swingtet", "bigAppleContest.mp3", "bigAppleContest.png"));
  boogie.addTune(new Tune("Almost Like Being in Love", "Ella Fitzgerald", "almostLikeBeingInLove.mp3", "almostLikeBeingInLove.png"));
  boogie.addTune(new Tune("Honeysuckle Rose", "Coleman Hawkins", "honeysuckleRose.mp3", "honeysuckleRose.png"));
  boogie.addTune(new Tune("It Don't Mean a Thing (If It Ain't Got That Swing)", "Duke Ellington and His Orchestra", "itDontMeanAThing.mp3", "itDontMeanAThing.png"));
  boogie.addTune(new Tune("Keep Your Undershirt On", "Ben Pollack and His Park Central Orchestra", "keepYourUndershirtOn.mp3", "keepYourUndershirtOn.png"));
  boogie.addTune(new Tune("I Like Pie, I Like Cake", "The Four Clefs", "iLikePieILikeCake.mp3", "iLikePieILikeCake.png"));
  boogie.addTune(new Tune("(There'll Be A) Hot Time In The Town Of Berlin", "Bing Crosby & The Andrews Sisters", "hotTimeInTheTownOfBerlin.mp3", "hotTimeInTheTownOfBerlin.png"));

///////////set up event handlers//////////////
  $(document).load(boogie.switchTrack(0));

  $("#playPause").on("click", function(){
    if ($("audio")[0].paused == false) {
      boogie.pause();
    } else {
      boogie.play();
    };
  });

  $("#last").on("click", function(){
    boogie.last();
  });

  $("#next").on("click", function(){
    boogie.next();
  });

  $("#stop").on("click", function(){
    boogie.stop();
  });
});

  // JUST FOR FUN
  // $("#sloMo").on("click", function(){
  //   ***var dSpeed = video.playbackRate;
  //   ***audio.playbackRate = 1.0;
  // });
