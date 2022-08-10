import { Component, OnInit } from '@angular/core';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlobStorageService } from '../services/azure/blob/blob-storage.service';

@Component({
  selector: 'app-recipe-image-upload',
  templateUrl: './recipe-image-upload.component.html',
  styleUrls: ['./recipe-image-upload.component.css']
})
export class RecipeImageUploadComponent implements OnInit {

  NUM_OF_IMAGES: number = 4;
  uploadProgress$: Observable<number> | undefined;
  cropImageButtonDisabled = true;

  imageChangedEvent: any;
  croppedImages: any[] = [];
  selectedImage: any;
  lastCroppedImage: any;

  constructor(private blobService: BlobStorageService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  uploadImages(){
    this.blobService.uploadImage(environment.storageToken, base64ToFile(this.croppedImages.at(0)), 't2', () => {});
  }

  fileChangeEvent(event: any): void {
    console.log(event);
    this.selectedImage = event.currentFiles.at(0);
  }

  cropImage(){
    if(this.croppedImages.length < this.NUM_OF_IMAGES){
      this.croppedImages.push(this.lastCroppedImage!);
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.cropImageButtonDisabled = false;
    this.lastCroppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    this.messageService.add({
      severity: "warn",
      summary: "Image faild to load"
    });
  }

}
