interface Props {
   children: any;
   label?: string;
   className?: string;
}
const ToolTip: React.FC<Props> = ({ children, label, className }) => {
   return (
      <div className={`${className} flex gap-2`}>
         {children}
         <div className="relative group">
            <img src="/deploy/tip.svg" alt="tip" className="cursor-pointer" />
            <div className="hidden group-hover:block absolute -top-6 left-1">
               <p className="whitespace-nowrap">{label}</p>
            </div>
         </div>
      </div>
   )
}

export default ToolTip;