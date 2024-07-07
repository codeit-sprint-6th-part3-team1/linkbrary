import Footer from '@/components/Footer';
import Gnb from '@/components/Gnb';

function Page() {
  return (
    <div>
      <Gnb isLogin={false} /> Home
      <Footer />
    </div>
  );
}
export default Page;
