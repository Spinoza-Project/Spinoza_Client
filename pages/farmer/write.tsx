import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';

const WriteFeed = () => {
  return (
    <Layout leftChild={<LogoHeader />}>
      <form>
        <input></input>
        <textarea />
      </form>
    </Layout>
  );
};

export default WriteFeed;
