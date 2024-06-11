import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { toggleWalletPanel } from '../../state/dialog';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { useState } from 'react';

const ConnectButton = () => {
  const dispatch = useAppDispatch();
  const { account, connected, disconnect } = useWallet();
  const [isOpenDropDown, toggleOpen] = useState(false);

  const address = account?.address.toString() ?? "";
  return (
    <>
      {connected ? (
        <div className="flex flex-col gap-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img src="/header/ellipse.svg" className="w-8" alt="ellipse" />
            </div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleOpen(!isOpenDropDown);
              }}
              className="font-bold"
            >
              {address.slice(0, 5)}...{address.slice(-3)}
              <span className="text-xs">
                &nbsp;&nbsp;&nbsp;{isOpenDropDown ? '▲' : '▼'}
              </span>
            </span>
          </div>
          {isOpenDropDown && (
            <>
              <div
                className="flex top-20 bg-gray-dark-2 h-[60px] rounded-b-[10px] w-[200px] items-center justify-center absolute z-50 right-2"
                onClick={() => disconnect()}
              >
                <p className="text-cente hover:font-bold">Disconnect Wallet</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className="font-semibold cursor-pointer"
          onClick={() => dispatch(toggleWalletPanel(true))}
        >
          <p className="whitespace-nowrap">Connect Wallet</p>
        </div>
      )}
    </>
  );
};

export default ConnectButton;
