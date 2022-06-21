import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { getPlantFeed } from '../api';

const PlantFeed: NextPage = () => {
  const [feeds, setFeeds] = useState([]);
  const router = useRouter();
  const { plantId } = router.query;
  const { status } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { feeds },
        } = await getPlantFeed(plantId as string);
        setFeeds(feeds);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [plantId]);
  if (status === 'unauthenticated') {
    router.replace('/signin');
    return <div>로그인하세요.</div>;
  }

  return <Layout>PlantId: {plantId}</Layout>;
};

export default PlantFeed;
