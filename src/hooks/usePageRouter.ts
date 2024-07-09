import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const usePageRouter = () => {
  const router = useRouter();
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const { query } = router;
    if (query.id) {
      setId(query.id as string);
    }
  }, [router]);

  return id;
};
export default usePageRouter;
