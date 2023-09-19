import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
   className?: string;
   placeholder?: string;
   value?: string;
   onChange?: (e: any) => void;
   mustNumber?: boolean;
}
const PrimaryInput: React.FC<Props> = ({
   className,
   placeholder,
   value,
   onChange,
   mustNumber = false
}) => {
   const [isNumberError, setNumberError] = useState(false);
   useEffect(() => {
      if (mustNumber) {
         if (value && !/^[0-9]+$/.test(value)) setNumberError(true);
         else setNumberError(false);
      }
   }, [value]);

   return (
      <>
         <input
            className={`${className} w-full px-4 py-2 rounded-full bg-black border ${
               isNumberError
                  ? "border-error focus-visible:outline-0"
                  : "border-white"
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
         {isNumberError && (
            <p className="mt-1 px-4 text-sm text-error">Only number allowed</p>
         )}
      </>
   );
};

export default PrimaryInput;
