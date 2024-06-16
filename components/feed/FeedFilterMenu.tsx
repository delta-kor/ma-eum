import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import { FeedFilter, FeedTypes, getFeedHeaderName, getFeedIconName } from '@/utils/feed.util';
import { FeedType } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  filter: FeedFilter;
  onFilterSet: (filter: FeedFilter) => void;
}

export default function FeedFilterMenu({ filter, onFilterSet }: Props) {
  function handleFeedTypeClick(type: FeedType) {
    onFilterSet({
      ...filter,
      types: [type],
    });
  }

  function handleFeedTypeReset() {
    onFilterSet({
      ...filter,
      types: FeedTypes,
    });
  }

  const isAllTypes = filter.types.length === FeedTypes.length;

  return (
    <div className="flex justify-between">
      <div className="flex gap-8">
        <AnimatePresence>
          {!isAllTypes && (
            <motion.div
              key="all"
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleFeedTypeReset}
              className="flex cursor-pointer items-center gap-8 rounded-full bg-gray-100 px-16 py-12"
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
              onClick={() => handleFeedTypeClick(type)}
              className="group flex cursor-pointer items-center gap-8 rounded-full bg-gray-100 px-16 py-12 data-[active=true]:bg-gradient-primary"
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
    </div>
  );
}
