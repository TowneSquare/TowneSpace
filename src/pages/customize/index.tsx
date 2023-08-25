import { useParams } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import Header from "./header";
import Preview from "./preview";

const Customize = () => {
   const { address } = useParams();
   const data = useAppSelector(state => {
      let result = state.nftsState.nfts.filter(nft => nft.address == address)
      return result.length > 0 ? result[0] : undefined;
   });

   return (
      <div>
         <Header data={data} />
         <div className="px-2 md:px-[150px]">
            <Preview data={data} />
         </div>
      </div>
   )
}

export default Customize;