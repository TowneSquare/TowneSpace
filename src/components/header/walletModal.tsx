import { Icon } from "@iconify/react";
import { toggleWalletPanel } from "../../state/dialog";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import WalletButtons from "../../wallet-adapter/WalletButtons";

const WalletModal = () => {
    const isOpen = useAppSelector((state) => state.dialogState.bWalletPanel);
    const sentRequest = useAppSelector((state) => state.dialogState.bWalletHold);
    const dispatch = useAppDispatch();

    return (
        <div className={`${isOpen ? "block" : "hidden"} fixed z-10 inset-0 flex justify-center items-center bg-[#00000050]`}>
            <div className="relative w-[400px]  bg-gray-dark-2 border-gray-light-3 rounded-md p-8">
                <p className="text-2xl font-bold text-center">Connect your wallet</p>
                <p className="px-10 font-semibold text-center mt-4">Connect an Aptos wallet from the list or create a new one</p>
                <div className={`${sentRequest && "opacity-50 cursor-not-allowed"}`}>
                    <WalletButtons />
                </div>
                <p className="text-sm font-semibold text-center mt-8 leading-[200%]">
                    By connecting your wallet, you agree to the &nbsp;
                    <span className="text-primary-dark">Terms & Conditions</span>
                    &nbsp; and &nbsp;
                    <span className="text-primary-dark">Privacy Policy</span>
                </p>
                <div className="flex w-full items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {sentRequest &&
                        <Icon icon={'svg-spinners:6-dots-rotate'} fontSize={24} className="absolute" />
                    }
                </div>
                <div className="absolute top-6 right-6 w-4 h-4 cursor-pointer" onClick={() => dispatch(toggleWalletPanel(false))}>
                    <p className="text-3xl font-bold">×</p>
                </div>
            </div>
        </div >
    );
};

export default WalletModal;