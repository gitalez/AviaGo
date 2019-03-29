import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';

const MEMORY_KEY = 'my_memories';

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {

  constructor(
    private file: File, 
    private webview: WebView,
    private storage : Storage
    ) { }

  saveImage(imagePath) {

    let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    let folderPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

    if (currentName.indexOf('?') > -1) {
      currentName = currentName.substr(0, currentName.lastIndexOf('?'));
    }

    return this.copyFileToLocalDir(folderPath, currentName, `${new Date().getTime()}.jpg`);
  }

  copyFileToLocalDir(folderPath, currentName, newFileName) {

    return this.file.copyFile(folderPath, currentName, this.file.dataDirectory, newFileName)
      .then( success => {
        return newFileName;
      }, 
      error => {
        console.log('error: ', error);
    });
  }

  addMemory(memory) {
    
    return this.storage.get(MEMORY_KEY).then(memories => {
      if (!memories) {
        return this.storage.set(MEMORY_KEY, [memory]);
      } else {
        memories.push(memory);
        return this.storage.set(MEMORY_KEY, memories);
      }
    });
  }

  getMemories() {
    return this.storage.get(MEMORY_KEY).then(result => {
      if (!result) return [];

      return result.map(item => {
        item.images = item.images.map(img => this.webview.convertFileSrc(this.file.dataDirectory + img));
        return item;
      });
    })
  }

  getMemoryById(id) {
    return this.storage.get(MEMORY_KEY).then(result => {
      return result.filter(item => item.id == id)
      .map(item => {
        item.images = item.images.map(img => this.webview.convertFileSrc(this.file.dataDirectory + img));
        return item;
      })[0];
    })
  }

  deleteMemory(id) {

    return this.storage.get(MEMORY_KEY).then(result => {
      
      let toKeep = [];
      let toDelete = null;

      for (let mem of result) {
        if (mem.id != id) {
          toKeep.push(mem);
        } else {
          toDelete = mem;
        }
      }

      let promises = [];
      
      for (let img of toDelete.images) { // [123.jpg, 123.jpg]
        let task = this.file.removeFile(this.file.dataDirectory, img);
        promises.push(task);
      }

      promises.push(this.storage.set(MEMORY_KEY, toKeep));

      return Promise.all(promises);
    });
  }
}

