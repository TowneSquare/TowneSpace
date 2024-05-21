import { useDispatch } from 'react-redux';
import { toggleWalletPanel } from '../../../state/dialog';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';

const Second = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col xl:flex-row justify-between items-center w-[360px] md:w-[1280px] relative my-[120px] md:mt-[241px] md:mb-[321px]">
      <img
        src="./home/item2.png"
        className="w-full md:w-[471px] md:h-[415px] xl:absolute right-0"
      />
      <div className="flex flex-col justify-end w-[90%] md:w-[684px] h-[460px]">
        <p className="text-[36px] font-bold mb-6">
          No-code studio for NFT creators
        </p>
        <div className="text-[18px] md:w-[530px]">
          <p className="mb-3 md:mb-0">
            TowneSpace Studio lets you create and modify Composable NFTs, a new
            NFT standard on Aptos.
          </p>
          <p>
            The first composable NFT standard leveraging Aptos Digital Assets.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:mt-12">
          {/* <PrimaryButton type={ButtonStatus.active} className="flex w-[213px] md:w-[196px] h-[48px] items-center justify-center" onClick={() => dispatch(toggleWalletPanel(true))}>
                        Launch Creator studio
                    </PrimaryButton>

                    <button
                        className="w-[213px] md:w-[196px] h-[48px] justify-center items-center text-[#9264F8] font-medium active:bg-gray-light-1 rounded-full"
                    >
                        Learn more about cNFTs
                    </button> */}
        </div>
      </div>
    </div>
  );
};

export default Second;
