import { isValidAddress } from "algosdk";

async function isNfdValid(nfdApiUrl: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      // make request to NFD address endpoint to quickly validate the NFD
      const results = await fetch(nfdApiUrl);
      if (results.ok) {
        // good to go
        resolve(true);
      } else if (results.status <= 404) {
        // NFD not valid or not found
        resolve(false);
      } else if (results.status === 429) {
        // Rate limited. Wait the amount remaining
        const resp = await results.json();
        const delay = resp?.secsRemaining;
        setTimeout(() => {
          // need to pause for specified time
          resolve(false);
        }, delay);
      }
    } catch (err) {
      reject(false);
    }
  });
}

export async function validateAlgorandAddress(
  address: string
): Promise<boolean> {
  const nfdApiEndPoint = "https://api.nf.domains/nfd";
  const defaultParams = "view=tiny&poll=false&nocache=false";
  const nfdApiUrl = `${nfdApiEndPoint}/${address}?${defaultParams}`;

  // NFD softcheck. Don't waste api calls on bad formatted NFD's
  const nfdRegex = new RegExp("^(.+.algo)$", "g");
  const nfdSoftCheck = nfdRegex.test(address);
  const isNfd = nfdSoftCheck && (await isNfdValid(nfdApiUrl));

  return isNfd || isValidAddress(address);
}
