import { useNavigate } from 'react-router-dom';
import Header from './header';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { updatePrimaryTrait } from '../../../state/create';
import { Fragment } from 'react';

const Screen6 = () => {
  const traits = useAppSelector((state) => state.createState.traits);
  const primaryTrait = useAppSelector(
    (state) => state.createState.primaryTrait
  );
  const dispatch = useAppDispatch();

  return (
    <div className="pb-10">
      <Header />
      <p className="text-base md:text-xl text-center mt-8">
        Choose which trait will become the base of your Dynamic PFP&nbsp; <br />
        <span className="text-primary-light">Learn more</span>
      </p>
      <div className="mt-16 flex flex-col md:flex-row justify-center gap-2 md:gap-8">
        <div className="min-w-max p-4 md:w-[30vw] flex flex-col gap-4 rounded-md">
          {traits.map((trait, index) => {
            const isActive = trait.name == primaryTrait?.name;
            const bg = isActive
              ? 'bg-primary-dark border border-primary-light'
              : 'bg-gray-dark-2 hover:bg-gray-dark-1';
            return (
              <div
                className={`h-14 p-2 flex justify-between items-center gap-4 ${bg} rounded-md cursor-pointer`}
                key={index}
                onClick={() => dispatch(updatePrimaryTrait(trait))}
              >
                <p className="text-sm md:text-base font-semibold">
                  {trait.name}
                </p>
                {isActive && <img src="/create/check.svg" alt="check" />}
              </div>
            );
          })}
        </div>
        {primaryTrait ? (
          <>
            <div className="p-4 w-[300px] rounded-md">
              <p className="text-sm md:text-base">
                {primaryTrait?.name} will be the base trait
              </p>
              <div className="bg-gray-light-3 rounded-md">
                <img
                  src={primaryTrait?.files[0].imageUrl}
                  alt="img"
                  className="mt-4 w-full"
                />
              </div>
              <p className="mt-4 text-sm md:text-base text-center">
                {primaryTrait?.name}
              </p>
            </div>
            <div className="p-4 w-[328px]">
              <p className="text-sm md:text-base">
                These traits will be placed inside the base trait
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {traits.map((trait, index) => {
                  const isActive = trait.name == primaryTrait?.name;
                  return (
                    <Fragment key={index}>
                      {!isActive && (
                        <div className="w-32 rounded-md" key={index}>
                          <div className="h-32 bg-gray-light-3 rounded-md">
                            <img
                              src={trait.files[0].imageUrl}
                              alt="image"
                              className="w-32 h-32"
                            />
                          </div>
                          <p className="mt-2 text-sm md:text-base text-center">
                            {trait.name}
                          </p>
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
              <p className="">Select the base trait.</p>
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
