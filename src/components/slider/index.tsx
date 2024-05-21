import { FC } from 'react';
import './slider.css';
import ToolTip from '../tooltip';

interface Props {
  className?: string;
  value: number;
  onChange?: (e: number) => void;
}
const Slider: FC<Props> = ({ className, value, onChange }) => {
  return (
    <div className={`${className} h-7 relative flex items-center`}>
      <div className="absolute w-full flex h-[5px]">
        <div
          className={`w-[${value}%] bg-primary-light rounded-l-full`}
          style={{
            width: `${value}%`,
          }}
        />
        <div
          className={`w-[${100 - value}%] bg-white rounded-r-full`}
          style={{
            width: `${100 - value}%`,
          }}
        />
      </div>
      <input
        type="range"
        value={value}
        className="w-full slider z-10"
        onChange={(e: any) => onChange && onChange(e.target.value)}
      />
      <ToolTip
        className="absolute w-[20px] h-[20px] left-0 rounded-full bg-primary-light border border-black cursor-pointer -translate-x-1/2 z-20"
        label="Super rare"
        icon={false}
        onClick={() => onChange && onChange(0)}
      >
        <div />
      </ToolTip>
      <ToolTip
        className="absolute w-[20px] h-[20px] left-[33%] rounded-full bg-primary-light border border-black cursor-pointer -translate-x-1/2 z-20"
        label="Rare"
        icon={false}
        onClick={() => onChange && onChange(33)}
      ></ToolTip>
      <ToolTip
        className="absolute w-[20px] h-[20px] left-[67%] rounded-full bg-primary-light border border-black cursor-pointer -translate-x-1/2 z-20"
        label="Common"
        icon={false}
        onClick={() => onChange && onChange(67)}
      ></ToolTip>
      <ToolTip
        className="absolute w-[20px] h-[20px] right-0 rounded-full bg-primary-light border border-black cursor-pointer translate-x-1/2 z-20"
        label="Often"
        icon={false}
        onClick={() => onChange && onChange(100)}
      ></ToolTip>
    </div>
  );
};

export default Slider;
