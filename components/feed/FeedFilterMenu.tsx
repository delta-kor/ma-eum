import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useQuery from '@/hooks/query';
import { FeedFilter, FeedTypes, getFeedHeaderName, getFeedIconName } from '@/utils/feed.util';
import { FeedType } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  filter: FeedFilter;
  onFilterSet: (filter: FeedFilter) => void;
}

export default function FeedFilterMenu({ filter, onFilterSet }: Props) {
  const query = useQuery();

  function handleFeedTypeClick(type: FeedType) {
    query.softSet({ feed: type });
    onFilterSet({
      ...filter,
      types: [type],
    });
  }

  function handleFeedTypeReset() {
    query.softSet({ feed: null });
    onFilterSet({
      ...filter,
      types: FeedTypes,
    });
  }

  function handleDirectionClick(direction: 'asc' | 'desc') {
    query.softSet({ direction });
    onFilterSet({
      ...filter,
      direction,
    });
  }

  const isAllTypes = filter.types.length === FeedTypes.length;

  return (
    <div className="scrollbar-hide -mx-24 flex justify-between gap-24 overflow-x-scroll px-24">
      <div className="flex shrink-0 items-center gap-8">
        <AnimatePresence>
          {!isAllTypes && (
            <motion.div
              key="all"
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFeedTypeReset}
              className="flex cursor-pointer items-center gap-8 rounded-full bg-gray-50 px-16 py-12 transition-colors hover:bg-gray-100"
            >
              <Icon
                type="left"
                className="w-10 text-gray-500 group-data-[active=true]:text-white"
              />
              <div className="text-14 font-500 text-black group-data-[active=true]:text-white">
                <Translate>$all</Translate>
              </div>
            </motion.div>
          )}
          {FeedTypes.map(type => (
            <motion.div
              key={type}
              data-active={!isAllTypes && filter.types.includes(type)}
              layout="position"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFeedTypeClick(type)}
              className="group flex cursor-pointer items-center gap-8 rounded-full bg-gray-50 px-16 py-12 transition-colors hover:bg-gray-100 data-[active=true]:bg-gradient-primary"
            >
              <Icon
                type={getFeedIconName(type)}
                className="w-16 text-black group-data-[active=true]:text-white"
              />
              <div className="text-14 font-500 text-black group-data-[active=true]:text-white">
                {getFeedHeaderName(type)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex shrink-0 items-stretch gap-16 self-stretch">
        <div className="mr-8 w-2 shrink-0 self-stretch bg-gray-100 lg:hidden" />
        <div
          data-active={filter.direction === 'desc'}
          onClick={() => handleDirectionClick('desc')}
          className="jelly group flex cursor-pointer items-center text-gray-200 hover:text-gray-400 data-[active=true]:text-primary-500"
        >
          <div className="text-16 font-500 transition-colors group-data-[active=true]:font-600">
            <Translate>$sort_newest</Translate>
          </div>
        </div>
        <div
          data-active={filter.direction === 'asc'}
          onClick={() => handleDirectionClick('asc')}
          className="jelly group flex cursor-pointer items-center text-gray-200 hover:text-gray-400 data-[active=true]:text-primary-500"
        >
          <div className="text-16 font-500 transition-colors group-data-[active=true]:font-600">
            <Translate>$sort_oldest</Translate>
          </div>
        </div>
      </div>
    </div>
  );
}
