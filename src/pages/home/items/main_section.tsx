import { useDispatch } from "react-redux";
import { toggleWalletPanel } from "../../../state/dialog";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/primary_button";
import ButtonStatus from "../../../type/button_status";

const MainSection = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center xl:flex-row justify-between w-[360px] md:w-[1280px] relative mt-9 md:mt-[67px]">
            <img src="./home/item1.png" className="w-full md:w-[684px] md:h-[581px] xl:absolute -right-32" />
            <div className="flex flex-col justify-center w-[92%] md:w-[567px] md:h-[581px] mt-9">
                <p className="text-[33px] md:text-[50px]">
                    Launch and scale your
                </p>
                <p className="text-[33px] md:text-[50px] text-primary-default font-Permanent">
                    Composable NFT
                </p>
                <p className="text-[33px] md:text-[50px]">
                    projects on Aptos
                </p>
                <div className="text-[18px] md:w-[477px] mt-3">
                    <p className="mb-4 md:mb-0">
                        TowneSpace is an open, composable protocol and toolset for NFT creators and developers on Aptos.
                    </p>
                    <p className="">
                        The first composable NFT standard leveraging <br className="hidden md:block" />Aptos Digital Assets.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-12">

                    <button className="md:flex flex-col hidden bg-primary-default rounded-[40px] w-[242px] md:w-[196px] h-[48px] items-center justify-center" onClick={() => { }}>
                        <p className="font-[500] text-[16px]">Creator studio</p>
                        <p className="font-[300] text-[14px] -mt-1">Coming soon</p>
                    </button>

                    <button className="md:hidden flex flex-col bg-primary-default rounded-[40px] w-[242px] md:w-[196px] h-[48px] items-center justify-center" onClick={() => { }}>
                        <p className="font-[500] text-[16px]">Creator studio</p>
                        <p className="font-[300] text-[14px] -mt-1">Coming soon</p>
                    </button>
                    <button
                        className="w-[242px] md:w-[196px] h-[48px] justify-center items-center text-black font-medium bg-white rounded-full"
                    >
                        <p className="font-[500] text-[16px]">Dev docs</p>
                        <p className="font-[300] text-[14px] -mt-1">Coming soon</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MainSection;