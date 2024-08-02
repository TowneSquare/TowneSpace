import { BloctoWallet } from '@blocto/aptos-wallet-adapter-plugin';
import { FaceWallet } from '@haechi-labs/face-aptos-adapter-plugin';
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter';
import { FlipperWallet } from '@flipperplatform/wallet-adapter-plugin';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { NightlyWallet } from '@nightlylabs/aptos-wallet-adapter-plugin';
import { OpenBlockWallet } from '@openblockhq/aptos-wallet-adapter';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { RiseWallet } from '@rise-wallet/wallet-adapter';
import { TokenPocketWallet } from '@tp-lab/aptos-wallet-adapter';
import { TrustWallet } from '@trustwallet/aptos-wallet-adapter';
// import { MSafeWalletAdapter } from "msafe-plugin-wallet-adapter";
import { WelldoneWallet } from '@welldone-studio/aptos-wallet-adapter';
import {
  AptosWalletAdapterProvider,
  NetworkName,
} from '@aptos-labs/wallet-adapter-react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { FC, ReactNode } from 'react';
import face from './lib/faceInitialization';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custom-toastify.css';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallets = [
    new PetraWallet(),
    new PontemWallet(),
    new MartianWallet(),
    new RiseWallet(),
    new FewchaWallet(),

    // Blocto supports Testnet/Mainnet for now.
    // new BloctoWallet({
    //   network: NetworkName.Testnet,
    //   bloctoAppId: "6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46",
    // }),
    // new FaceWallet(face!),
    // new FlipperWallet(),
    // // new MSafeWalletAdapter(),
    // new NightlyWallet(),
    // new OpenBlockWallet(),
    // new TokenPocketWallet(),
    // new TrustWallet(),
    // new WelldoneWallet(),
  ];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={(error) => {
        console.log('Custom error handling', error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};

const contextClass = {
  success:
    'relative bg-gray-dark-2 flex w-[330px]  border-gray-light-3 overflow-hidden rounded-lg border-[1px] items-start justify-between px-2 py-2',
  error:
    'relative bg-gray-dark-2 flex w-[330px]  border-gray-light-3 overflow-hidden rounded-lg border-[1px] items-center justify-between px-2 py-2', // Changed items-start to items-center
  info: 'relative bg-gray-dark-2 flex w-[330px]  border-gray-light-3 overflow-hidden rounded-lg border-[1px] items-center justify-between px-2 py-2',
  warning: 'bg-orange-400',
  default: 'bg-indigo-600',
  dark: 'bg-white-600 font-gray-300',
};

export const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ToastContainer
        toastClassName={(context) => contextClass[context?.type || 'default']}
      />
      <AutoConnectProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
      </AutoConnectProvider>
    </>
  );
};
