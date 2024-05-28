import { Tooltip } from 'react-tooltip';

const Traits = () => {
  const traits = [
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'HAT',
      traitsType: 'Crown #58',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'MOUTH',
      traitsType: 'Gum #7821',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'EYES',
      traitsType: 'Gum #7821',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'EYES',
      traitsType: 'Gum #7821',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'EYES',
      traitsType: 'Gum #7821',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'BACKGROUND',
      traitsType: 'Gum #7821',
    },
  ];

  return (
    <div>
      <div className="ml-2 after: w-[385px] overflow-auto  h-[75vh] p-2 border-2 border-gray-dark-1 rounded-xl">
        {traits.map((trait, index) => {
          const isStared = trait.traitsName == 'HAT';
          const background = isStared ? 'bg-gray-dark-2' : 'bg-gray-dark-1';

          const isActive = trait.traitsName == 'MOUTH';
          const bgColor = isActive
            ? 'border-2 border-primary-dark-1 bg-primary-dark-1/20'
            : 'bg-gray-dark-1';
          return (
            <div
              className={`h-[100px] mb-2 gap-2 rounded-[8px] w-full flex items-center ${background} ${bgColor} p-2`}
            >
              <img src="/customize/equal.svg" />
              <div className="w-[84px] bg-gray-light-3 rounded-lg">
                <img
                  src={trait.image}
                  alt="image"
                  className="w-[84px] h-[84px]"
                />
              </div>
              <div className="w-[154px] flex flex-col leading-4 font-semibold text-[10px] md:text-[14px] text-start mr-8">
                <p className="text-gray-light-1">{trait.tokenName}</p>
                <p className="text-gray-light-1 mt-2 font-normal">
                  {trait.traitsName}
                </p>
                <p className="">{trait.traitsType}</p>
              </div>
              <div className="flex justify-end">
                {isStared && (
                  <div className="relative">
                    <Tooltip
                      id="my-tooltip"
                      className="w-[24px] bg-gray-dark-3"
                    />
                    <img
                      src="/customize/star.png"
                      alt="star"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="This is a base trait. It can’t
be removed or replaced."
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Traits;
