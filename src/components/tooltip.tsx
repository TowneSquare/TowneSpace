interface Props {
  children: any;
  icon?: boolean;
  label?: string;
  className?: string;
  onClick?: (e: any) => void;
}
const ToolTip: React.FC<Props> = ({
  children,
  label,
  icon = true,
  className,
  onClick,
}) => {
  return (
    <div
      className={`${className} flex gap-2 group cursor-pointer`}
      onClick={onClick}
    >
      {children}
      <div className="relative">
        {icon && <img src="/deploy/tip.svg" alt="tip" className="" />}
        <div className="hidden group-hover:block absolute -top-6 left-1">
          <p className="whitespace-nowrap">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
