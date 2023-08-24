import ButtonType from "../../type/button_status";

interface Props {
   children: any;
   type: ButtonType;
   onClick?: () => void
}
const Button: React.FC<Props> = ({ children, type, onClick }) => {
   return (
      <button className={`px-6 py-2 border border-black rounded-2xl font-semibold ${type == ButtonType.active ? "bg-white" : "bg-gray-light-2"}`} onClick={onClick}>
         {children}
      </button>
   )
}

export default Button;