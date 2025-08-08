import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { Chain } from "@thirdweb-dev/chains";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const bitrockChain: Chain = {
  chainId: 7171,
  chain: "bitrock",
  name: "Bitrock Mainnet",
  shortName: "brock",
  slug: "bitrock",
  nativeCurrency: {
    name: "Bitrock",
    symbol: "BROCK",
    decimals: 18,
  },
  rpc: ["https://connect.bit-rock.io"], // RPC endpoint
  explorers: {
    default: {
      name: "Bitrock Explorer",
      url: "https://explorer.bit-rock.io",
    },
  },
  testnet: false,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={bitrockChain}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
