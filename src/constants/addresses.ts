import { Networks } from "./blockchain";

const FTM_MAINNET = {
  DAO_ADDRESS: "0x561c56b6ea927c157A9F51fCcCfa50B777c1EA7C",
  SSB_ADDRESS: "0xE9Eb40d52CE4744322204d4a29Af63C30f0260a4",
  SB_ADDRESS: "0x7d1232b90d3f809a54eeaeebc639c62df8a8942f",
  AKNOX_ADDRESS: "0x33ce3907a2aC48C34767455A20B0ddb05Ac1B2A9",
  MIM_ADDRESS: "0x82f0b8b456c1a451378467398982d4834b6829c1",
  PRESALE_ADDRESS: "0xd54f26D533B181EFf11B78bCf154E558682bD9F5",
  STAKING_ADDRESS: "0x85784d5e2CCae89Bcb39EbF0ac6Cdc93d42d99AD",
  STAKING_HELPER_ADDRESS: "0x3d371d925Db78F8e46130AF95756789ecE6387ce",
  SB_BONDING_CALC_ADDRESS: "0xf1AC1eD0Ef7F61223df64e52A6E6E1d6Ca6f992b",
  TREASURY_ADDRESS: "0xa82422A5FD4F9cB85cD4aAc393cD3296A27dD873",
  ZAPIN_ADDRESS: "0xc669dC61aF974FdF50758d95306e4083D36f1430",
};

export const getAddresses = (networkID: number) => {
  if (networkID === Networks.FTM) return FTM_MAINNET;

  throw Error("Network don't support");
};
