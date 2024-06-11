import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { updatePrimaryTrait } from '../../../state/create';
import { Fragment } from 'react';
import Header from '../../../components/create/header';

const Screen6 = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  const primaryTrait = useAppSelector(
    (state) => state.createState.primaryTrait
  );
  const dispatch = useAppDispatch();

  return (
    <div className="pb-10">
      <Header stepNumber={4} />
      <p className="mt-8 text-base text-center md:text-xl">
        Choose which trait will become the{' '}
        <span className="font-semibold">base</span> of your Dynamic PFP.
        <br />
        Holders won’t be able to remove the{' '}
        <span className="font-semibold">Base trait</span> from their PFP, all
        other traits can be removed.&nbsp;&nbsp;
        <span className="text-primary-light">Learn more</span>
      </p>
      <div className="flex flex-col justify-center gap-2 mt-16 md:flex-row md:gap-8">
        <div className="min-w-max p-4 md:w-[385px] flex flex-col gap-2 rounded-md">
          <div className="flex items-center h-20">
            <span className="text-[20px]">Traits</span>
          </div>
          {traits.map((trait, index) => {
            const isActive = trait.name == primaryTrait?.name;
            const bg = isActive
              ? 'bg-primary-default/20 border-2 border-primary-dark-1 '
              : 'bg-gray-dark-2 hover:bg-gray-dark-1';
            return (
              <div
                className={`h-14 px-4 py-2 flex justify-between items-center gap-4 ${bg} rounded-md cursor-pointer`}
                key={index}
                onClick={() => dispatch(updatePrimaryTrait(trait))}
              >
                <p className="text-sm font-semibold md:text-base">
                  {trait.name}
                </p>
                {isActive && <img src="/create/check.svg" alt="check" />}
              </div>
            );
          })}
        </div>
        {primaryTrait ? (
          <>
            <div className="p-4 w-[300px] rounded-md items-center text-center">
              <div className="flex flex-col items-center h-20">
                <span className="text-[20px] font-semibold">Base trait</span>
                <p className="text-sm md:text-base">
                  It won’t be possible to remove <b>{`${primaryTrait.name}`}</b>{' '}
                  it from the cNFT
                </p>
              </div>
              <div className="rounded-md bg-gray-dark-1">
                <img
                  src={primaryTrait?.files[0].imageUrl}
                  alt="img"
                  className="w-full mt-4"
                />
              </div>
              <p className="mt-4 text-2xl font-bold text-center">
                {primaryTrait?.name}
              </p>
            </div>
            <div className="p-4 w-[328px] items-center text-center">
              <div className="flex flex-col items-center h-20">
                <span className="text-[20px] font-semibold">Other traits</span>
                <p className="text-sm md:text-base">
                  It will be possible to remove
                  <br />
                  these traits from the cNFT
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {traits.map((trait, index) => {
                  const isActive = trait.name == primaryTrait?.name;
                  return (
                    <Fragment key={index}>
                      {!isActive && (
                        <div className="p-[8px] w-full rounded-md bg-gray-dark-2">
                          <div
                            className="flex items-center text-center rounded-md"
                            key={index}
                          >
                            <div className="w-[88px] h-[88px] mr-4 rounded-md bg-gray-dark-1">
                              <img
                                src={trait.files[0].imageUrl}
                                alt="image"
                                className="rounded-md"
                              />
                            </div>
                            <p className="mt-2 text-sm text-center md:text-base">
                              {trait.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-[300px] h-[300px] p-4 flex flex-col gap-4 justify-center items-center border border-dashed border-gray-light-1 rounded-md">
              <img src="/create/left-arrow.svg" alt="arrow" />
              <p className="text-base font-normal text-center">
                Select the <span className="font-bold">base trait.</span>
                <br />
                This trait cannot be
                <br />
                removed from the PFP
              </p>
              <p className="text-center text-gray-light-1">
                When you select the base trait it will show here
              </p>
            </div>
            <div className="w-[328px] h-[450px] p-4 flex flex-col gap-4 justify-center items-center border border-dashed border-gray-light-1 rounded-md">
              <p className="text-center text-gray-light-1">
                Other traits will be placed inside the base trait
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Screen6;
