import { useWallet } from '@aptos-labs/wallet-adapter-react';

const Address = () => {
  const { connected, account } = useWallet();
  if (!connected) return null;

  const address = account?.address.toString() ?? "";
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8">
        <img src="/header/ellipse.svg" className="w-8" alt="ellipse" />
      </div>
      <span className="font-bold">
        {address.slice(0, 7)}...{address.slice(-5)}
      </span>
    </div>
  );
};

export default Address;
