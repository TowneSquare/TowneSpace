import { useNavigate } from 'react-router-dom';
import EmptyCard from '../../components/empty_card';
import Header from '../../components/header';

const Archived = () => {
  const navigate = useNavigate();
  const isEmpty = true;
  return (
    <div>
      <Header />
      <div className="flex gap-2 items-center mx-20 mt-10">
        <div className="w-10 h-10 flex justify-center items-center p-2 rounded-full bg-gray-dark-2 hover:bg-gray-dark-1 cursor-pointer"
        onClick={() => navigate("/studio/mycollect")}>
          <img src="/archived/arrow-left-circle.svg" className="w-20"/>
        </div>
        <span className="text-2xl">Archived collections</span>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mt-40">
        {isEmpty ? (
          <div className="relative w-full flex justify-center gap-6">
            {Array(5)
              .fill(null)
              .map(() => (
                <EmptyCard />
              ))}
            <div className="absolute w-full h-full flex flex-col justify-end items-center gap-14">
              <h1 className="text-2xl font-semibold">
                You didn’t archived any NFT collections
              </h1>
              <h3 className="text-center">
                When you create an NFT collection,
                <br /> they will show up here
              </h3>
              <div className="h-10"></div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Archived;
