import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, TrustWalletAdapter, BackpackWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";
import React from "react";
import { FC, ReactNode, useMemo } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

const WalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // const url = useMemo(() => clusterApiUrl("devnet"), []);
  const phantom = new PhantomWalletAdapter();
  // const trust = new TrustWalletAdapter();
  // const backpack = new BackpackWalletAdapter();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[phantom]}>
        <WalletModalProviderDynamic>{children}</WalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
