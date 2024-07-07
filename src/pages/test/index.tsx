import Footer from '@/components/Footer';
import Gnb from '@/components/Gnb';
import AddLink from '@/components/AddLink';
import SearchBar from '@/components/SearchBar';
import InputBox from '@/components/InputBox';

export default function page() {
  return (
    <>
      <Gnb isLogin />
      <AddLink />
      <SearchBar />
      <InputBox />
      <Footer />
    </>
  );
}
