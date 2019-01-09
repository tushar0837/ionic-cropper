import { Component, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularCropperjsComponent } from "angular-cropperjs";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  cropperOptions;
  croppedImage: null;
  myImage = null;
  scaleX = 1;
  scaleY = 1;

  @ViewChild("angularCropper") public angularCropper: AngularCropperjsComponent;
  constructor(private camera: Camera, public navCtrl: NavController) {
    this.cropperOptions = {
      dragMode: "move",
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      zoomOnTouch: false,
      scalable: true,
      cropBoxResizable: false,
      autoCropArea: 0.8,
      minCropBoxWidth: 300,
      minCropBoxHeight: 300
    };
  }
  cropperTouchStart(event){
    event.stopPropagation();
    event.preventDefault(); //Most important
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.myImage = "data:image/jpeg;base64," + imageData;
      },
      err => {
        // Handle error
      }
    );
  }

  reset() {
    this.angularCropper.cropper.reset();
  }
  clear() {
    this.angularCropper.cropper.clear();
  }
  rotate() {
    this.angularCropper.cropper.rotate(90);
  }
  zoomIn() {
      this.angularCropper.cropper.zoom(0.1);
      if (
        this.angularCropper.cropper.getCroppedCanvas().width < 300 ||
        this.angularCropper.cropper.getCroppedCanvas().height < 300
      ){
        this.zoomOut();
        console.log("min allowed size is 300x300")
      }
  }
  zoomOut() {
    this.angularCropper.cropper.zoom(-0.1);
  }
  crop() {
    this.croppedImage = this.angularCropper.cropper
      .getCroppedCanvas()
      .toDataURL();
  }
  move(x, y) {
    this.angularCropper.cropper.move(x, y);
  }
}
