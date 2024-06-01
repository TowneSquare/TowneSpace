import axios from 'axios';
import FormData from 'form-data';

const JWT = process.env.REACT_APP_PINATA_JWT;
console.log(JWT)
export async function pinJSONToIPFS(blob: Blob) {
    console.log(JWT)
  const formData = new FormData();
  formData.append('file', blob, 'filename.png'); // Append the blob to formData

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', options);

  const headers = {
    Authorization: `Bearer ${JWT}`,
  };

  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    {
      headers: headers,
      maxContentLength: 0,
      maxBodyLength: 0,
    }
  );

  const ipfsUrl = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
  return ipfsUrl;
}
