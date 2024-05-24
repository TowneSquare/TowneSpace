const Navbar = () => {
  return (
    <div className="mt-8 px-4 flex justy-center flex-col md:flex-row md:items-end gap-4">
      <div className="flex items-end gap-4">
        <img
          src="/deploy/avatar.png"
          alt="order"
          className="h-[135px] w-[152px]"
        />
        <div className="">
          <p className="text-sm text-[30px] mb-[18px]">Sl0thians</p>
          <div className="md:min-w-[130px] h-11 px-4 flex items-center rounded-full mt-1">
            <p>Total Dynamic PFPs 10000</p>
          </div>
        </div>
      </div>
      <div className="w-[80%] flex items-end">
        <div className="min-w-[225px] h-11 flex justify-center items-center">
          Royalties 5%
        </div>
        <div className="w-full h-11 px-16 py-2 flex gap-2  rounded-full">
          10,000 crazy Sl0thians ready to sleep all day! Bring your pillow, grab
          a Sl0thian and join the party!
        </div>
      </div>
    </div>
  );
};

export default Navbar;
