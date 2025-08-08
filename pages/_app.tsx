import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { defineChain } from "thirdweb/chains";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = defineChain({
  chainId: 7171,
  chain: "bitrock",
  name: "Bitrock Mainnet",
  shortName: "bitrock",
  slug: "bitrock",
  nativeCurrency: {
    name: "Bitrock",
    symbol: "BROCK",
    decimals: 18,
  },
  rpc: ["https://connect.bit-rock.io"], // Replace with the actual RPC endpoint
  blockExplorers: {
    default: {
      name: "Bitrock Explorer",
      url: "https://explorer.bit-rock.io",
    },
  },
  testnet: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
