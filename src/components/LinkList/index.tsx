import { LinkProps } from '@/types';
import LinkItem from '@/components/LinkItem';

interface LinkListProps {
  links: LinkProps[];
  onLinkClick: (link: LinkProps) => void;
  onDelete: (linkId: number) => void;
  onUpdate: (link: LinkProps) => void;
  onToggleFavorite: (linkId: number, favorite: boolean) => void;
}

const LinkList = ({ links, onLinkClick, onDelete, onUpdate, onToggleFavorite }: LinkListProps) => {
  return (
    <div className="link-list">
      {links.map((link) => (
        <LinkItem key={link.id} link={link} onLinkClick={onLinkClick} onDelete={onDelete} onUpdate={onUpdate} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
};

export default LinkList;
