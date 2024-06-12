import {
  useWallet,
  WalletReadyState,
  Wallet,
  isRedirectable,
  WalletName,
} from '@aptos-labs/wallet-adapter-react';
import { useAppDispatch } from '../state/hooks';
import { toggleConnectRequest, toggleWalletPanel } from '../state/dialog';

const WalletButtons = () => {
  const { wallets } = useWallet();

  return (
    <div className="flex flex-col gap-4 pl-10 mt-4">
      {wallets?.map((wallet: any) => {
        return WalletView(wallet);
      })}
    </div>
  );
};

const WalletView = (wallet: any) => {
  const { connect } = useWallet();
  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable;
  const mobileSupport = wallet.deeplinkProvider;
  const dispatch = useAppDispatch();

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      console.log('toggleConnectRequest');
      dispatch(toggleConnectRequest(true));
      await connect(walletName);
    } catch (error: any) {
      // toast(error);
    }
    dispatch(toggleConnectRequest(false));
    dispatch(toggleWalletPanel(false));
  };

  /**
   * If we are on a mobile browser, adapter checks whether a wallet has a `deeplinkProvider` property
   * a. If it does, on connect it should redirect the user to the app by using the wallet's deeplink url
   * b. If it does not, up to the dapp to choose on the UI, but can simply disable the button
   * c. If we are already in a in-app browser, we dont want to redirect anywhere, so connect should work as expected in the mobile app.
   *
   * !isWalletReady - ignore installed/sdk wallets that dont rely on window injection
   * isRedirectable() - are we on mobile AND not in an in-app browser
   * mobileSupport - does wallet have deeplinkProvider property? i.e does it support a mobile app
   */
  if (!isWalletReady && isRedirectable()) {
    // wallet has mobile app
    if (mobileSupport) {
      return (
        <button
          className={`flex items-center gap-4  text-white font-bold py-2 px-4 rounded mr-4 hover:bg-blue-700`}
          disabled={false}
          key={wallet.name}
          onClick={() => onWalletConnectRequest(wallet.name)}
        >
          <img src={wallet.icon} alt="uri" className="w-10 h-10" />
          {wallet.name}
        </button>
      );
    }
    // wallet does not have mobile app
    return (
      <button
        className={`flex items-center  gap-4  text-white font-bold py-2 px-4 rounded mr-4 opacity-50 cursor-not-allowed`}
        disabled={true}
        key={wallet.name}
        onClick={() => onWalletConnectRequest(wallet.name)}
      >
        <img src={wallet.icon} alt="uri" className="w-10 h-10" />
        <span className="text-left">
          {wallet.name} <br /> Desktop Only
        </span>
      </button>
    );
  } else {
    // we are on desktop view
    return (
      <button
        className={`flex justify-between items-center  text-white py-2 rounded ${
          isWalletReady ? 'hover:bg-gray-light-8' : 'cursor-not-allowed'
        }`}
        disabled={!isWalletReady}
        key={wallet.name}
        onClick={() => onWalletConnectRequest(wallet.name)}
      >
        <div className="flex items-center gap-4 font-bold">
          <img src={wallet.icon} alt="uri" className="w-10 h-10" />
          {wallet.name}
        </div>
      </button>
    );
  }
};
export default WalletButtons;
