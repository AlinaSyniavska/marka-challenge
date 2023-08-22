import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";

@Injectable()
export class AzureBlobStorageService {
  azureConnection = process.env.AZURE_CONNECTION || 'DefaultEndpointsProtocol=https;AccountName=saperformanceapp;AccountKey=pLypAvaUH7nOmAFHleXv8LS/aYGW6vlLDmpyhBYPDiCANPOR9PIA8dBQQXYtofNxnUqZzu3w6c+Z+ASto0bTaQ==;EndpointSuffix=core.windows.net';
  azureContainerName = process.env.AZURE_CONTAINER_NAME || 'documents';
  // azureText.txt

  getBlobClient(fileName:string):BlockBlobClient{
    const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
    const containerClient = blobClientService.getContainerClient(this.azureContainerName);
    const blobClient = containerClient.getBlockBlobClient(fileName);
    return blobClient;
  }

  async getFileStream(fileName: string){
    const blobClient = this.getBlobClient(fileName);
    const blobDownloaded = await blobClient.download();
    return blobDownloaded.readableStreamBody;
  }

}


