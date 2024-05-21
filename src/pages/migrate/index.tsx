import Header from '../../components/header';
import Text from './text';

const Migrate = () => {
  return (
    <div className="">
      <Header />
      <div className="pt-9 px-2 md:px-12">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between">
          <Text />
        </div>
      </div>
    </div>
  );
};

export default Migrate;
