interface Props {
   children: any;
   icon?: boolean;
   label?: string;
   className?: string;
   onClick?: (e: any) => void;
}
const ToolTip: React.FC<Props> = ({ children, label, icon = true, className, onClick }) => {
   return (
      <div className={`${className} flex items-center gap-2 group cursor-pointer`} onClick={onClick}>
         {children}
         <div className="relative">
            {icon &&
               <img src="/deploy/tip.svg" alt="tip" className="" />
            }
            <div className="hidden p-3 group-hover:block absolute bottom-8 left-1 bg-black rounded-md">
               <p className="w-[120px] md:w-[300px]">{label}</p>
            </div>
         </div>
      </div>
   )
}

export default ToolTip;