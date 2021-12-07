import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  audio: any

  constructor() { }

  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.src  = "../../assets/audios/MyNameIsGiovannyGiorgio.wav";
    this.audio.load();
    this.audio.play();
    this.audio.addEventListener("ended", () =>{
      this.audio.src= "../../assets/audios/LoopGiorgio.wav";
      this.audio.load();
      this.audio.play();
      this.audio.addEventListener('timeupdate', function(){
        var buffer = .25
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 0
            this.play()
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

}
