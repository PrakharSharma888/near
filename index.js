const nearAPI = require("near-api-js");

const { keyStores, KeyPair , WalletConnection} = nearAPI;
const { connect } = nearAPI;
// creates keyStore from a private key string
// you can define your key here or use an environment variable
//ed25519:2c88PHSjHRG1nSe7eQban3aBMDmbeRoDxPheES8yxiNgVLPys5UgdLbdA2yWv6KFo8BCYoGXSp2eTKdvAQyoR4tE
async function main() {
  // creates keyStore from a private key string
  // you can define your key here or use an environment variable
  const myKeyStore = new keyStores.InMemoryKeyStore();
  const PRIVATE_KEY =
    "ed25519:2c88PHSjHRG1nSe7eQban3aBMDmbeRoDxPheES8yxiNgVLPys5UgdLbdA2yWv6KFo8BCYoGXSp2eTKdvAQyoR4tE";
  // creates a public / private key pair using the provided private key
  const keyPair = KeyPair.fromString(PRIVATE_KEY);
  // adds the keyPair you created to keyStore
  
  const newKey = await myKeyStore.setKey("testnet", "prakharsharma.testnet", keyPair);
  console.log("Key", myKeyStore);
  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  // connect to NEAR
  const nearConnection = await connect(connectionConfig);

const walletConnection = new WalletConnection(nearConnection, "");
console.log(walletConnection.isSignedIn())
const account = await nearConnection.account("prakharsharma.testnet");
console.log(account);
//   const account = await nearConnection.account("example-account.testnet");

// await account.createAccount(
//   "example-account2.testnet", // new account name
//   "b52741994abb2648846b1abd098f2005a38b35bf3d89c79a129367f98c192de7", // public key for new account
//   "10000000000000000000" // initial balance for new account in yoctoNEAR
// );
console.log(await account.getAccountBalance())

const pari = await account.sendMoney(
  "prakharsharma.testnet", // receiver account
  "1000000000000000000000000" // amount in yoctoNEAR
);





// console.log(pari);
const accountState = await account.state();
console.log(accountState);
}
main();
