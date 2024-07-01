import { LinkProps } from '@/types';

interface LinkItemProps {
  link: LinkProps;
  onLinkClick: (link: LinkProps) => void;
  onDelete: (linkId: number) => void;
  onUpdate: (link: LinkProps) => void;
  onToggleFavorite: (linkId: number, favorite: boolean) => void;
}

const LinkItem = ({ link, onLinkClick, onDelete, onUpdate, onToggleFavorite }: LinkItemProps) => {
  return (
    <div className="link-item" onClick={() => onLinkClick(link)}>
      <h3>{link.url}</h3>
      <p>{link.description}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(link.id);
        }}
      >
        Delete
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onUpdate(link);
        }}
      >
        Update
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(link.id, !link.favorite);
        }}
      >
        {link.favorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

export default LinkItem;
