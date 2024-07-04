// pages/faq.tsx
import React, { useState } from 'react';
import s from './faq.module.scss';
import MainLogo from '@/../public/assets/gnb/MainLogo';
import Footer from '@/components/Footer';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const faqData: { question: string; answer: string }[] = [
  {
    question: '질문 1: 구글로 로그인하는 방법은 무엇인가요?',
    answer: '답변 1: 로그인 페이지에서 구글 아이콘 버튼을 클릭한 후, 구글 계정 정보를 입력하여 로그인하세요.',
  },
  {
    question: '질문 2: 카카오로 로그인하는 방법은 무엇인가요?',
    answer: '답변 2: 로그인 페이지에서 카카오 아이콘 버튼을 클릭한 후, 카카오 계정 정보를 입력하여 로그인하세요.',
  },
  {
    question: '질문 3: 링크를 어떻게 저장하나요?',
    answer: '답변 3: 링크를 저장하려면 "링크 추가하기" 버튼을 클릭하고, 저장할 링크를 입력한 후 확인 버튼을 누르세요.',
  },
  {
    question: '질문 4: 링크를 폴더로 관리할 수 있나요?',
    answer: '답변 4: 네, 링크를 폴더로 관리할 수 있습니다. "폴더 추가하기" 버튼을 클릭하여 새 폴더를 만들고, 링크를 해당 폴더로 드래그하여 이동하세요.',
  },
  {
    question: '질문 5: 링크를 공유하려면 어떻게 해야 하나요?',
    answer: '답변 5: 링크를 공유하려면 공유할 링크를 선택하고 "공유" 버튼을 클릭하세요. 페이스북, 트위터 등 소셜 미디어를 선택하여 공유할 수 있습니다.',
  },
  {
    question: '질문 6: 저장한 링크를 어떻게 검색하나요?',
    answer: '답변 6: 상단의 검색창에 검색어를 입력하여 저장한 링크를 쉽게 찾을 수 있습니다.',
  },
];

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className={s.faqItem}>
    <div className={s.question} onClick={onClick}>
      {question}
    </div>
    {isOpen && <div className={s.answer}>{answer}</div>}
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <header className={s.gnb}>
        <MainLogo />
      </header>
      <main className={s.faqContainer}>
        <h1>자주 묻는 질문</h1>
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} isOpen={openIndex === index} onClick={() => handleClick(index)} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
