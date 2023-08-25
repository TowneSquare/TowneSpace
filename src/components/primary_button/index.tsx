import ButtonStatus from "../../type/button_status";

interface Props {
   children: any;
   type: ButtonStatus;
   className?: string;
   onClick?: () => void
}
const PrimaryButton: React.FC<Props> = ({ children, type, className, onClick }) => {
   const isActive = type == ButtonStatus.active;
   return (
      <>
         {type == ButtonStatus.active ?
            <button className={`${className} px-6 py-2 rounded-full font-semibold bg-primary-default hover:bg-primary-light active:bg-primary-dark`}
               onClick={onClick}
            >
               {children}
            </button>
            :
            <button className={`${className} px-6 py-2 rounded-full font-semibold bg-transparent`}
               onClick={onClick}
            >
               {children}
            </button>
         }
      </>
   )
}

export default PrimaryButton;