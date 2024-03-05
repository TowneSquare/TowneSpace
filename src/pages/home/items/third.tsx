import { useDispatch } from "react-redux";
import { toggleWalletPanel } from "../../../state/dialog";
import PrimaryButton from "../../../components/primary_button";
import ButtonStatus from "../../../type/button_status";

const Third = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col xl:flex-row items-center justify-between w-[360px] md:w-[1280px] relative mb-[80px] md:mb-[297px]">
            <img src="./home/item3.png" className="w-full md:w-[505px] md:h-[488px]" />
            <div className="flex flex-col justify-center w-[90%] md:w-[684px] xl:w-[550px] h-[460px]">
                <p className="text-[36px] font-bold mb-6">
                    Developer tools for web & mobile
                </p>
                <p className="text-[18px] m:w-[530px]">
                    TowneSpace supports premium collections on Aptos with <br className="hidden md:block" /> applications such as TowneSpace cNFT & migration studio.
                </p>
                <div className="flex items-center gap-4 mt-12">
                    {/* <PrimaryButton type={ButtonStatus.active} className="flex w-[191px] h-[48px] items-center justify-center" onClick={() => { }}>
                        See documentation
                    </PrimaryButton> */}
                </div>
            </div>
        </div>
    );
}

export default Third;