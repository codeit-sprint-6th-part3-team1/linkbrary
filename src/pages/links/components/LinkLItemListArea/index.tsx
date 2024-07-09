import { fetchMsgState, linkListState } from '@/recoil';

import { useRecoilState } from 'recoil';

import type { LinkProps } from '@/types';

const LinkItemCard = ({ link }: { link: LinkProps }) => {
  return (
    <div>
      <h3>{link.title}</h3>
      <p>{link.description}</p>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {link.url}
      </a>
    </div>
  );
};

const LinkLItemListArea = () => {
  const [fetchMsg] = useRecoilState(fetchMsgState);
  const [linkList] = useRecoilState<LinkProps[]>(linkListState);

  return (
    <>
      {fetchMsg ? (
        <div>{fetchMsg}</div>
      ) : linkList?.length > 0 ? (
        <div>
          {linkList.map((link) => (
            <LinkItemCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <div>저장된 링크가 없습니다.</div>
      )}
    </>
  );
};

export default LinkLItemListArea;
