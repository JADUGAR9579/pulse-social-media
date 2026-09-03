import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

import { useExploreStore } from '../../store/exploreStore';
import SearchBar from '../../components/explore/SearchBar';
import ExploreTabs from '../../components/explore/ExploreTabs';
import TrendingList from '../../components/explore/TrendingList';
import SuggestedUsers from '../../components/explore/SuggestedUsers';
import PopularMedia from '../../components/explore/PopularMedia';
import SearchResults from '../../components/explore/SearchResults';
import { fadeIn } from '../../animations/variants';

function NewsPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center px-6">
      <p className="font-display text-xl font-semibold">News</p>
      <p className="text-sm text-text-muted">
        Curated news integration powered by an external news API lands in a future update.
      </p>
    </div>
  );
}

export default function Explore() {
  const { loadExplore, query, hasSearched, activeTab } = useExploreStore();

  useEffect(() => {
    loadExplore();
  }, [loadExplore]);

  const showSearch = !!query || hasSearched;

  return (
    <>
      <Helmet>
        <title>Explore · Pulse</title>
      </Helmet>

      {/* Sticky header */}
      <div className="glass sticky top-0 z-30">
        <div className="border-b border-border px-4 py-3">
          <h1 className="mb-3 font-display text-xl font-semibold">Explore</h1>
          <SearchBar autoFocus={false} />
        </div>
        {!showSearch && <ExploreTabs />}
      </div>

      {/* Search results take over when query is active */}
      <AnimatePresence mode="wait">
        {showSearch ? (
          <motion.div
            key="search"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <SearchResults />
          </motion.div>
        ) : (
          <motion.div
            key="explore"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {activeTab === 'trending' && (
              <div className="flex flex-col gap-0">
                <div className="border-b border-border px-4 py-3">
                  <h2 className="font-display text-base font-semibold">
                    Trending right now
                  </h2>
                </div>
                <TrendingList />
              </div>
            )}

            {activeTab === 'people' && (
              <div className="p-4">
                <h2 className="mb-4 font-display text-base font-semibold">
                  Who to follow
                </h2>
                <SuggestedUsers />
              </div>
            )}

            {activeTab === 'media' && (
              <div className="p-4">
                <h2 className="mb-4 font-display text-base font-semibold">
                  Popular media
                </h2>
                <PopularMedia />
              </div>
            )}

            {activeTab === 'news' && <NewsPlaceholder />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
