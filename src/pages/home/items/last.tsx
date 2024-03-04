import { useDispatch } from "react-redux";
import { toggleWalletPanel } from "../../../state/dialog";
import PrimaryButton from "../../../components/primary_button";
import ButtonStatus from "../../../type/button_status";

const Last = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-center w-full xl:w-[1280px] relative mb-[171px]">
            <img src="./home/last/tl.png" className="hidden xl:block w-[246px] h-[208px] absolute left-0 top-0" />
            <img src="./home/last/br.png" className="hidden xl:block w-[250px] h-[194px] absolute right-0 bottom-0" />
            <img src="./home/last/tr.png" className="hidden xl:block w-[197px] h-[129px] absolute right-0 top-0" />
            <img src="./home/last/bl.png" className="hidden xl:block w-[167px] h-[80px] absolute left-0 bottom-0" />
            <img src="./home/last/tl-m.png" className="xl:hidden w-[286px] h-[123px] absolute left-0 top-0" />
            <img src="./home/last/br-m.png" className="xl:hidden w-[210px] h-[193px] absolute right-0 bottom-0" />
            <div className="flex flex-col w-full md:w-[550px] justify-center items-center xl:w-full h-[750px] md:h-[460px] pb-24">
                <p className="text-[36px] font-bold text-center">
                    Join the revolution!
                </p>
                <p className="text-[36px] font-bold text-center">
                    Create your first collection of <span className=" font-Permanent font-normal text-primary-default">Composable NFTs!</span>
                </p>
                <PrimaryButton type={ButtonStatus.active} className="flex mt-12 w-[191px] h-[48px] items-center justify-center" onClick={() => { }}>
                    Launch Creator studio
                </PrimaryButton>
            </div>
        </div>
    );
}

export default Last;