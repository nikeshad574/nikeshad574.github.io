import { Client, TablesDB } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
  .setEndpoint(conf.appwrite.endpoint)
  .setProject(conf.appwrite.projectId);

const tablesDB = new TablesDB(client);

export { tablesDB };
