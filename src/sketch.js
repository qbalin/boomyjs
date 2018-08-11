import p5 from 'p5';
import p5Sound from 'p5/lib/addons/p5.sound';
import musicController from './musicController';

let song;


const s = (p) => {
  p.preload = () => {
    song = p.loadSound('./musicFiles/Day299.mp3');
  };

  p.setup = () => {
    song.loop();
  };

  p.draw = () => {
    // Set the volume to a range between 0.2 and 1.0
    // var volume = p.map(p.mouseX, 0.3, p.width, 0.3, 1.5);
    // volume = p.constrain(v/olume, 0.3, 1.5);
    song.amp(musicController.volume);

    // var speed = p.map(p.mouseY, -0.5, p.height, 0, 1.5);
    // speed = p.constrain(speed, -0.5, 1.5);

    song.rate(musicController.speed);
  };
};


new p5(s, 'c1');
