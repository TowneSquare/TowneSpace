import { useDispatch } from "react-redux";
import { toggleWalletPanel } from "../../../state/dialog";
import FollowUs from "../../../components/followUs";

const Footer = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-center w-full bg-primary-footer pt-6 pb-5 h-[607px] sm:h-[372px]">
            <div className="flex justify-between w-[90%] xl:w-[1280px] relative">
                <img src="./home/footer/tr.svg" className="w-[102px] h-[95px] absolute right-0 top-0 z-10" />
                <img src="./home/footer/bl.svg" className="w-[122px] h-[247px] absolute left-0 bottom-0 z-10" />
                <img src="./home/footer/br.svg" className="hidden md:block w-[345px] h-[162px] absolute right-0 bottom-0 z-10" />
                <div className="flex flex-col w-full md:w-[576px] justify-between z-20">
                    <div>
                        <img src="./logo.svg" className="w-[200px] h-[34px] mb-[37px] sm:mb-[45px]" />
                        <div className="sm:hidden block z-20 mb-[55px] sm:mb-0">
                            <FollowUs />
                        </div>
                        <div className="flex flex-wrap w-[300px] sm:w-[411px] justify-between gap-x-[140px] gap-y-6">
                            {/* <p onClick={() => {  }} className="text-[15px] font-bold w-[140px]">
                                Creator Studio
                            </p>
                            <a href="" className="text-[15px] font-bold w-[131px]">
                                Terms of Service
                            </a>
                            <a href="" className="mt-8 sm:mt-0 text-[15px] font-bold w-[140px]">
                                Dev documentation
                            </a>
                            <a href="" className="text-[15px] font-bold w-[131px]">
                                Privacy policy
                            </a> */}
                        </div>
                    </div>
                    <p className="text-[16px] font-normal">
                        Copyright © {new Date().getFullYear()}. All rights reserved.
                    </p>
                </div>
                <div className=" hidden sm:block z-20">
                    <FollowUs />
                </div>
            </div>
        </div>
    );
}

export default Footer;