import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toggleNFTEdit } from '../../state/dialog';
import { useState } from 'react';

const NFTEdit = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bNftEdit);
  const traits = useAppSelector((state) => state.createState.traits);
  const dispatch = useAppDispatch();

  const css = traits.length < 0 ? 'flex' : 'flex-col justify-between';

  return (
    <div>
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed z-10 inset-0 flex justify-end items-center bg-[#00000050]`}
      >
        <div className="relative w-[592px] flex flex-col h-full bg-gray-dark-2 border-gray-light-3 rounded-md">
          <div
            className={`flex w-full h-[92px] justify-center items-center bg-gray-dark-2 px-6 gap-4 z-10`}
          >
            <p className="p-4 text-xl">Replace Traits</p>
          </div>

          <div className={`flex ${css} h-full`}>
            <div className="w-full p-6 grid grid-cols-4">
              {traits.length > 0 ? (
                traits[0].files.map((trait, index) => {
                  const isActive = trait.name == 'Carrot';
                  const borderColor = isActive
                    ? 'border-primary-default'
                    : 'border-gray-dark-1';
                  const isSelected = trait.name == 'Cigar';
                  const bgColor = isSelected
                    ? 'bg-primary-default border-primary-default'
                    : '';
                  return (
                    <div className="">
                      <div
                        className={`w-[120px] h-[120px] cursor-pointer border-4 relative ${borderColor} ${bgColor} rounded-xl`}
                      >
                        {isSelected && (
                          <img
                            className="absolute m-10"
                            src="/customize/check.svg"
                            alt=""
                          />
                        )}
                        <img src={trait.imageUrl} className="w-full h-full" />
                      </div>
                      <div className="my-2">
                        <p className="text-[13px]">Sl0thians</p>
                        <p className="text-sm">{trait.name}&nbsp;#7821</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div className="w-[592px] h-[75vh] gap- rounded-2xl px-14 py-8 flex flex-col items-center justify-center">
                    <img src="/customize/non-trait.svg" />
                    <p className="w-[300px] px-4 my-10 text-center">
                      You don’t have any of these Traits. When you transfer them
                      in your wallet, they will show up here.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`flex w-full h-[92px] justify-between items-center bg-gray-dark-3 px-6 gap-4 z-10`}
            >
              <div className="flex items-center gap-2">
                <Link
                  to=""
                  onClick={() => {
                    dispatch(toggleNFTEdit(false));
                  }}
                >
                  <p className="text-sm md:text-base text-primary-light font-semibold">
                    Cancel
                  </p>
                </Link>
              </div>
              <button className="md:flex flex-col hidden bg-primary-default rounded-[40px] w-[242px] md:w-[196px] h-[48px] items-center justify-center">
                <p className="font-[500] text-[16px]">Save</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTEdit;
