import { useState } from 'react';
import styles from './style.module.scss';
import Logo from '@public/addlink.svg';
import Image from 'next/image';
import useApiReq from '@/hooks/useApiReq';

export default function LinkInput() {
  const [url, setUrl] = useState<string>('');
  const { loading, sendRequest } = useApiReq();

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

  // NOTE accessToken 매우 필요. 로그인 기능이 필요함. 테스트를 위해서라도.. test 정보 하나라도 넣어주면 좋을 듯.
  const handleAddLink = async () => {
    if (!url) {
      alert('URL을 입력해주세요.');
      return;
    }
    if (!isValidUrl(url)) {
      alert('유효한 URL을 입력해주세요.');
      return;
    }

    const apiUrl = endpoints.links;
    const token = 'accessToken';

    const { success, data, error } = await sendRequest(apiUrl, 'POST', { url }, token);

    if (success) {
      console.log('Link added:', data);
      setUrl('');
      alert('링크가 성공적으로 추가되었습니다.');
    } else {
      console.error('링크 추가에 실패했습니다:', error);
      alert('링크 추가에 실패했습니다.');
    }
  };

  return (
    <div className={styles.addLink}>
      <form className={styles.container} action="" method="post">
        {/* TODO 이미지 SVG component로 교체 후 반응형 대응 */}
        <Image src={Logo} width={20} height={20} alt="AddLink logo" className={styles.linkIcon} />
        <input type="url" value={url} onChange={handleInputChange} placeholder="링크를 추가해 보세요" className={styles.input} />
        {/* FIXME 버튼 교체 */}
        <button onClick={handleAddLink} style={{ whiteSpace: 'nowrap' }}>
          추가하기
        </button>
      </form>
    </div>
  );
}
