import { Web3Storage } from "web3.storage";
import { WEB3STORAGE_TOKEN } from "../constants";
const web3storage_key = WEB3STORAGE_TOKEN;
function GetAccessToken() {
  return web3storage_key;
}

function MakeStorageClient() {
  return new Web3Storage({ token: GetAccessToken() });
}

export const StoreContent = async (files) => {
  console.log("Uploading files to IPFS with web3.storage....");
  const client = MakeStorageClient();
  const cid = await client.put([files]);
  console.log("Stored files with cid:", cid);
  return cid;
};
export const Retrieve = async (cid) => {
  console.log("retriving files to IPFS with web3.storage....");
  const client = MakeStorageClient();
  console.log(cid)
  const res = await client.get(cid);
const file = await res.files();
return file;
// for (const file of files) {
//   console.log(`${file.cid} ${file.name} ${file.size}`);
};