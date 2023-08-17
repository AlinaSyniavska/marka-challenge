import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";

@Injectable()
export class AzureBlobStorageService {
  azureConnection = "DefaultEndpointsProtocol=https;AccountName=naveenazurestore;AccountKey=NLNxbk2ElnaMaUucTLt1zQDU1eOznjYUmCaiIeJB6O+934iedXSmss+r5gDePmZE6y99X8zZ8AItA==;EndpointSuffix=core.windows.net";
  containerName = "upload-file";

  getBlobClient(fileName:string):BlockBlobClient{
    const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
    const containerClient = blobClientService.getContainerClient(this.containerName);
    const blobClient = containerClient.getBlockBlobClient(fileName);
    return blobClient;
  }

  async getFileStream(fileName: string){
    const blobClient = this.getBlobClient(fileName);
    const blobDownloaded = await blobClient.download();
    return blobDownloaded.readableStreamBody;
  }

}


