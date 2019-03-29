import { Component, OnInit } from '@angular/core';
import { ImagePath } from '../interfaces/image-path';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MemoriaService } from '../services/memoria.service';

@Component({
  selector: 'app-nueva-instalacion',
  templateUrl: './nueva-instalacion.page.html',
  styleUrls: ['./nueva-instalacion.page.scss'],
})
export class NuevaInstalacionPage implements OnInit {


  tenemos : boolean = false;

  images: ImagePath[] = [];

  vacio: boolean = true;

  slideOpts = {

    slidesPerView: 1.5,
    spaceBetween: 5,
    autoHeight: true

  }

  colors = [

    '#91d7ff',
    '#91ffa3',
    '#ff9191',
    '#a991ff'
  ];

  memoryForm: FormGroup;


  constructor(

    private actionSheetCtrl: ActionSheetController,
    private camara: Camera,
    private webView: WebView,
    private fb: FormBuilder,
    public memoriaService: MemoriaService
    ) { 
  
    }

  ngOnInit() {

    this.vacio= true;
    console.log('mis instalaciones');
    this.tenemos = false;
    this.memoryForm = this.fb.group({

      title: ['', Validators.required],
      date: new Date().toISOString(),
      text: '',
      color: this.colors[0],
      icon: 'trash'
    });

  }

 async seleccionarFuente(){


    // await espera hasta que this.actionSheetCtrl crea el objeto
    const actionSheet = await this.actionSheetCtrl.create({

      header: 'seleccione la fuente',
      backdropDismiss: false,
      buttons: [{
        text: 'cargar desde la libreria',
        //role: 'destructive',
        icon: 'document',
        //cssClass: 'rojo',
        handler: () => { // se dispara cuando se hace click en el 
         this.capturaImagen(this.camara.PictureSourceType.PHOTOLIBRARY)
        }
      }, {
        text: 'Usar camara',
        icon: 'camera',
        handler: () => {
         this.capturaImagen(this.camara.PictureSourceType.CAMERA)
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    // muestra el actionSheet
    actionSheet.present();

 }


pushNewImage(path) {

  this.images.push({

    path: this.webView.convertFileSrc(path),
    file: path

  });
}

 capturaImagen(tipo: number){


  let options: CameraOptions = {

    quality: 100,
    sourceType: tipo,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    destinationType: this.camara.DestinationType.FILE_URI,
    encodingType: this.camara.EncodingType.JPEG,
    mediaType: this.camara.MediaType.PICTURE,
  }



  // imagePath nos devuelve el ruta  de la imagen obtenida
  this.camara.getPicture(options).then( imagePath => {

    //const img = window.Ionic.WebView.convertFileSrc( imagePath );
   
    this.pushNewImage(imagePath);
    //this.images.push(img);
    setInterval(() =>{},1000)
    console.log('images',this.images);
    this.tenemos = true;
    this.vacio= false;
  });

}


removeImage(index){

  this.images.splice(index, 1);
  if(this.images.length < 0){
    this.tenemos = false;
  }

}
setColor(color) {
  this.memoryForm.patchValue({ color: color });
}

saveMemory() {

  let promises = [];

  for (let img of this.images) {
    let oneCopyTask = this.memoriaService.saveImage(img.file);
    promises.push(oneCopyTask);
  }

  Promise.all(promises).then(result => {
    console.log('result: ', result); // [123124.jpg, 3242134231.jpg, 123123.jpg]
    let toSave = this.memoryForm.value;
    toSave.images = result;
    toSave.id = Date.now();

    this.memoriaService.addMemory(toSave).then(res => {
      alert('guardado');
    })
  });
}

}
