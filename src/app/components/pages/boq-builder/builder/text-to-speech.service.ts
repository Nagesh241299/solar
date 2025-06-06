import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  private synth = window.speechSynthesis;
  private utterance = new SpeechSynthesisUtterance();
  currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.utterance.lang = 'en-US'; // Set default language
  }

  /** Speak text */
  speak(text: string, lang: string) {
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
    }
    
    // Create and store a new utterance.
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = lang;
    
    // Optional: Attach event handlers if needed.
    this.currentUtterance.onend = () => {
      console.log('Utterance ended.');
      this.currentUtterance = null;
    };
    
    this.synth.speak(this.currentUtterance);
  }
  
  stop() {
    console.log('In stop case');
    // if (this.currentUtterance) {
      console.log('In cancel case');
      this.synth.cancel();
      setTimeout(() => {
        this.utterance = new SpeechSynthesisUtterance(); // Reset utterance
        console.log('Speech forcefully stopped.');
      }, 200); // Delay to ensure cancellation
    // }
  }
  /** Get available voices */
  getVoices() {
    return this.synth.getVoices();
  }
}
