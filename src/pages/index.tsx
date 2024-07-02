import Footer from '@/components/Footer';
import Gnb from '@/components/Gnb';

const Page = () => {
  return (
    <div>
      <Gnb isLogin={false}></Gnb> Home
      <Footer />
    </div>
  );
};
export default Page;
