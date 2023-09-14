import * as React from "react";

const Verified = () => {
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
      setChecked(!checked);
    };

    return (
        <div className='relative mt-9 flex justify-center items-center md:gap-12'>
            <label className='lg:text-xl leading-[150%]'>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                 />
                Only Verified Collections
            </label>
        </div>
    )
}

export default Verified;