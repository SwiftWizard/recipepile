import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlobStorageService } from '../../services/azure/blob/blob-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { filter } from 'rxjs/operators';
import { __values } from 'tslib';

@Component({
  selector: 'app-recipe-image-upload',
  templateUrl: './recipe-image-upload.component.html',
  styleUrls: ['./recipe-image-upload.component.css']
})
export class RecipeImageUploadComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload: any;

  @Input() title: string = "";

  MAX_NUM_OF_IMAGES: number  = 5;
  currentNumOfImages: number = 0;
  cropImageButtonDisabled = true;

  recipeImagesId: string = '';

  imageChangedEvent: any;

  imageSubjects: Subject<any>[] = [];

  croppedImages: Observable<any>[] = [];
  
  selectedImage: any;
  lastCroppedImage: any;

  constructor(private blobService: BlobStorageService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.recipeImagesId = uuidv4();
  }

  uploadImagesAndReturnUrls(): string[]{
    let result: string[] = [];
    this.croppedImages.forEach(img => {
      let blobName = this.title + uuidv4();
      let url = environment.storageUri + environment.storageResourceName + "/" + blobName;
      result.push(url);
      img.subscribe({
        next: blob => {
          this.blobService.uploadImage(environment.storageToken, base64ToFile(blob), blobName, ()=>{});
        }
      })
    });

    return result;
  }

  addImage(){
    if(this.currentNumOfImages < this.MAX_NUM_OF_IMAGES){
      this.imageSubjects[this.currentNumOfImages] = new ReplaySubject();
      this.imageSubjects[this.currentNumOfImages].next(this.lastCroppedImage);
      this.croppedImages.push(this.imageSubjects[this.currentNumOfImages].asObservable());
      this.currentNumOfImages++;
    }
  }

  removeImage(imageToRemove: Observable<any>){
    let index = this.croppedImages.indexOf(imageToRemove);
    if(index > -1){
      this.croppedImages.splice(index, 1);
      this.currentNumOfImages--;
    }    
  }

  imageCropped(event: ImageCroppedEvent) {
    this.cropImageButtonDisabled = false;
    this.lastCroppedImage = event.base64;
  }

  clearFileField(){
    this.fileUpload.clear();
  }

  fileChangeEvent(event: any): void {
    this.selectedImage = event.currentFiles.at(0);
    this.clearFileField();
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
