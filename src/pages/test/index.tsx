import Footer from '@/components/Footer';
import Gnb from '@/components/Gnb';
import Card from '@/components/Card';
const cardData = [
  {
    id: 1,
    content: 'Lorem ipsum dolor sit amet consectetur. Metus amet habitant nunc consequat. Tldkd',
    createdAt: 'Wed Jun 26 2024 17:48:18 GMT+0900',
    updatedAt: 'Wed Jun 26 2024 17:48:18 GMT+0900',
  },
];
export default function page() {
  return (
    <>
      <Gnb isLogin />
      <Footer />
      <Card content={cardData[0].content} createdAt={cardData[0].createdAt} updatedAt={cardData[0].updatedAt} />
    </>
  );
}
