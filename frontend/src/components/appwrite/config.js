import conf from "../../config/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";


console.log(conf.appwriteUrl);

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getSpace(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getSpace() :: ", error);
      return false;
    }
  }
  // Yaha Pe Doubt Hai Ki "queries" Ko Kis Form Me Bhejenge.. Lets See...
  // Samajh gya.. after watching again, ye '[]' syntax hai querry dene ka appwrite app me, and "Query" vo object h jisko use karke kaun se type ki query deni h vo set karte hai.. fir andar pe index and its desired value.
  async getSpaces(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts() :: ", error);
      return false;
    }
  }
  async createSpace({ title, slug, content, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          userId
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }
  async updateSpace(slug, { title, content }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost() :: ", error);
      return false;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost() :: ", error);
      return false;
    }
  }
  // Storage service:

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }
}

const service = new Service();
export default service;
