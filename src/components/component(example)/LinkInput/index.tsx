import { useState } from 'react';
import styles from '@/components/component(example)/LinkInput/style.module.scss';
import Logo from '@public/addlink.svg';
import Image from 'next/image';

export default function LinkInput() {
  const [url, setUrl] = useState<string>('');

  //FIXME URL 유효성 검사 안됨;;
  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i', // fragment locator
    );
    return !!urlPattern.test(url);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleAddLink = async () => {
    if (!url) {
      alert('URL을 입력해주세요.');
      return;
    }
    if (!isValidUrl(url)) {
      alert('유효한 URL을 입력해주세요.');
      return;
    }

    try {
      // WARNING api post 시 로그인 필요하다는 응답이 돌아옴.
      const response = await fetch('https://linkbrary-api.vercel.app/6-1/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, folderId: '1' }),
      });

      if (!response.ok) {
        throw new Error('Failed to add link');
      }

      const result = await response.json();
      console.log('Link added:', result);

      setUrl('');
    } catch (error) {
      alert('링크 추가에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div className={styles.linkInput}>
      <div className={styles.container}>
        {/* TODO 이미지 SVG component로 교체 후 반응형 대응 */}
        <Image src={Logo} width={20} height={20} alt="AddLink logo" className={styles.linkIcon} />
        <input type="text" value={url} onChange={handleInputChange} placeholder="링크를 추가해 보세요" className={styles.input} />
        {/* FIXME 버튼 교체 */}
        <button onClick={handleAddLink} style={{ whiteSpace: 'nowrap' }}>
          추가하기
        </button>
      </div>
    </div>
  );
}
