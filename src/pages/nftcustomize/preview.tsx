const Preview = () => {
  return (
    <div className="w-[200px] md:md-[230px] lg:w-[264px]">
      <div className="h-[200px] md:h-[230px] lg:h-[264px] rounded-lg overflow-hidden">
        <img src="/customize/banner.png" className="w-full h-full" alt="uri" />
      </div>
      <div className="mt-6 flex items-center gap-2 text-[16px] font-semibold text-gray-light-1">
        Sl0thians
      </div>
      <p className="text-lg font-semibold">Slothian #9898</p>
    </div>
  );
};

export default Preview;
