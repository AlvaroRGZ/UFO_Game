import LocalStorageManager from './LocalStorageManager.js';

export default class PreferencesManager {
  constructor() {
    this.localStorageManager = new LocalStorageManager();
  }

  loadSavedPreferences(){
    document.getElementById("numUFOs").value = this.localStorageManager.getNumberOfUFOs();
    document.getElementById("time").value = this.localStorageManager.getTime();
  }

  savePreferences(event) {
    event.preventDefault(); 
    let numberOfUFOs = document.getElementById("numUFOs").value;
    let time = document.getElementById("time").value;
  
    this.localStorageManager.setNumberOfUFOs(numberOfUFOs)
    this.localStorageManager.setTime(time)
  }
}

window.onload = function () {
  let preferencesManager = new PreferencesManager();
  preferencesManager.loadSavedPreferences();
  document.getElementById('btnSave').onclick = (event) => preferencesManager.savePreferences(event);
};
