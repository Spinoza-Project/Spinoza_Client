import { TourType } from '../types/TourType.interface';

interface PropsType {
  tourList: TourType[] | null;
}

const TourList: React.FC<PropsType> = ({ tourList }) => {
  return (
    <ul className='flex gap-2'>
      {tourList?.map((tour) => {
        return (
          <li key={tour['_id']} className='flex flex-col items-center'>
            <div className='relative h-[40px] w-[60px] rounded-lg'>
              {/* <Image
                  src={tour.tourImage}
                  alt='tour image'
                  layout='fill'
                  objectFit='cover'
                /> */}
              <img
                src={tour.tourImage}
                alt='tour image'
                className='h-[40px] w-[60px] rounded-lg object-cover'
              />
            </div>
            <span>{tour.tourName}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default TourList;
