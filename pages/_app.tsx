import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { Chain } from "thirdweb";
import "../styles/globals.css";

export const bitrock: Chain = {
  chain: "bitrock",
  name: "bitrock",
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={bitrock}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
