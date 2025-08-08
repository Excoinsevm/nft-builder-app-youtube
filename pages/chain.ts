import { Chain } from "@thirdweb-dev/chains";

export const bitrock: Chain = {
  chain: "bitrock",
  name: "Bitrock",
  chainId: 7171,
  rpc: ["https://connect.bit-rock.io"],
  nativeCurrency: {
    name: "BROCK",
    symbol: "BROCK",
    decimals: 18,
  },
  shortName: "custom",
  testnet: false,
  slug: "bitrock",
};

export default bitrock;
