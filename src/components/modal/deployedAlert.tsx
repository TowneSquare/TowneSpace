const DeployedAlert = () => {
  return (
    <div className="gap-[6px] flex items-center justify-center rounded-[8px] bg-gray-dark-1 border-2 border-gray-light-1 w-[1200px] h-[67px] mb-10">
      <img src="/generate/check.svg" className="w-4" />
      <p className="">
        This collection has been deployed to the Mainnet. Changes to the
        collection are not possible at this point
      </p>
    </div>
  );
};

export default DeployedAlert;
