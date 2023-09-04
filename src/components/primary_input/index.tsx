import ButtonStatus from "../../type/button_status";

interface Props {
   className?: string;
   placeholder?: string;
   onChange?: (e: any) => void
}
const PrimaryInput: React.FC<Props> = ({ className, placeholder, onChange }) => {
   return (
      <>
         <input className={`${className} w-full px-4 py-2 rounded-full font-semibold bg-black border border-bg-gray-dark-3`} placeholder={placeholder} onChange={onChange}
         />
      </>
   )
}

export default PrimaryInput;