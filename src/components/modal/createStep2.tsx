import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primary_button";
import PrimaryInput from "../../components/primary_input";
import ButtonStatus from "../../type/button_status";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updateCollectionName, updateTotalMaxSupply } from "../../state/create";
import { QuestionMark } from "../../svg";
import { useState } from "react";
import { toggleStep2 } from "../../state/dialog";

const CreateStep2 = () => {
    const isOpen = useAppSelector((state) => state.dialogState.bStep2);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [collectionName, setCollectionName] = useState('');
    const [maxSupply, setMaxSupply] = useState('');

    const handleCollectionNameChange = (e : any) => {
        setCollectionName(e.target.value);
        dispatch(updateCollectionName(e.target.value));
    };

    const handleSubmit = () => {
        if(!isButtonDisabled){
            dispatch(toggleStep2(false));
            navigate("/create/step3");
        }
    }

    const handleMaxSupplyChange = (e : any) => {
        setMaxSupply(e.target.value);
        dispatch(updateTotalMaxSupply(e.target.value));
    };

    const isButtonDisabled = !collectionName || !maxSupply;

    return (
        <div className={`${isOpen ? "block" : "hidden"} fixed z-[100] inset-0 flex justify-center items-center bg-black`} style={{ backgroundImage: `url(/create/background-create.png)`, backgroundSize: 'cover' }}>
            <p className="absolute top-20 text-[40px] font-semibold leading-normal" style={{ textShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' }}>Create Dynamic PFPs</p>
            <div className="md:w-[558px] h-fit mx-4 bg-gray-dark-1 rounded-lg">
                <div className="flex justify-center mt-10 mb-9">
                    <p className="text-base md:text-xl font-semibold">Create a new collection for your PFPs</p>
                </div>
                <div className="px-4 md:px-8">
                    <div className="flex gap-1 items-center">
                        <p className="text-sm md:text-base">What is the collection’s name?</p>
                        <QuestionMark />
                    </div>
                    <PrimaryInput onChange={handleCollectionNameChange} className="mt-2 bg-gray-dark-3 font-normal placeholder:text-gray-light-3" placeholder="Slothians" />
                    <div className="flex gap-1 items-center mt-8">
                        <p className="text-sm md:text-base">How many Dynamic PFPs will the collection have?</p>
                        <QuestionMark />
                    </div>
                    <PrimaryInput onChange={handleMaxSupplyChange} className="mt-2 bg-gray-dark-3 font-normal placeholder:text-gray-light-3" placeholder="10,000" />
                </div>
                <div className="flex justify-center my-14">
                    <PrimaryButton className={`w-[230px] h-[48px] ${isButtonDisabled ? 'opacity-40 cursor-not-allowed' : ''}`} type={ButtonStatus.active} onClick={handleSubmit}>
                        Continue
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default CreateStep2;