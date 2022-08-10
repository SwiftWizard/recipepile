import { Inject, Injectable } from '@angular/core';
import { BlobLeaseClient, BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob';
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { distinctUntilChanged, from, Observable, scan, startWith, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {
  
  constructor(){}

  private containerClient(sas?: string): ContainerClient{
    let token = "";
    if(sas){
      token = sas;
    }
    return new BlobServiceClient(environment.storageUri + "?" + token).getContainerClient(environment.storageResourceName);
  }

  public uploadImage(sas: string, content: Blob, blobName: string, handler:() => void){
    const blobClient = this.containerClient(sas).getBlobClient(blobName);
    blobClient.getBlockBlobClient()
                  .uploadData(content, {blobHTTPHeaders: {blobContentType: content.type}})
                  .then(handler);
  }

}
