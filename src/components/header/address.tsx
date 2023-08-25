import getWallet from "../../state/wallet";

const Address = () => {
   const wallet = getWallet();
   return (
      <div className="flex items-center gap-2">
         <div className="w-8 h-8">
            <img src="/header/ellipse.svg" className="w-8" alt="ellipse" />
         </div>
         <span className="font-bold">{wallet}</span>
      </div>
   )
}

export default Address;