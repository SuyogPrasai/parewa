'use client';

import axios from 'axios';

import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTopArticles } from '@/hooks/useTopArticles';

import Notice from '@/types/post_objects/notice'; // Using 'type' for imports that are only used as types
import { NoticesResponse } from '@/types/api-responses';

import { Navbar } from '@/components/collections/CollectionNavbar';
import NoticeDetail from '@/components/notice/NoticeDetail';
import NoticeSection from '@/components/notice/NoticeSection';

interface Notice_Multi {
  _id: string;
  title: string;
  content: string;
  publishedIn: string;
  postTags: string[];
  voteCount: number;
  author: string;
  trashed: boolean;
  link: string;
}

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use useMemo for notice_id to prevent unnecessary re-renders if searchParams doesn't change
  const noticeId = useMemo(() => searchParams.get('id') || '', [searchParams]);

  // Destructure isLoading from useTopArticles for clarity
  const { articles: topArticles, isLoading: isLoadingTopArticles } = useTopArticles();

  // Initialize Notice state with a default empty structure that matches the Notice type.
  // This helps prevent errors when accessing properties before data is fetched.
  const [notice, setNotice] = useState<Notice>({
    _id: '',
    title: '',
    content: [], // content should be an array, as per your Notice type from singleNotice.ts
    publishedIn: '',
    featuredImage: '',
    voteCount: 0,
    postTags: [],
    publisher: {
      _id: '',
      name: '',
      username: '',
    },
    category: '',
  });

  // State for related notices (Notice_Multi)
  const [relatedNotices, setRelatedNotices] = useState<Notice_Multi[]>([]);

  // Define navLinks outside the component if they are static, or use useMemo if they depend on props/state
  const navLinks = useMemo(() => [
    { name: "General", href: "#" },
    { name: "Departments", href: "#" },
    { name: "School", href: "#" },
    { name: "Council", href: "#" },
    { name: "Clubs", href: "#" },
  ], []);

  // Use useCallback for handleCategoryChange to memoize the function.
  // This prevents unnecessary re-renders of child components that receive this function as a prop.
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      // Correctly constructing the URL for navigation
      router.push(`/notices?category=${newCategory}`);
    },
    [router] // searchParams is not needed in the dependency array as it's not directly used here to build the URL.
  );

  // Effect to fetch a single notice based on noticeId
  useEffect(() => {
    const fetchNotice = async () => {
      if (!noticeId) {
        // If no ID is present, we don't need to fetch a specific notice.
        // You might want to handle this case, e.g., redirect or show a message.
        return;
      }
      try {
        const response = await axios.get<NoticeResponse>(`/api/get_notice/?id=${noticeId}`);
        setNotice(response.data.notice);
      } catch (error) {
        console.error('Error fetching notice:', error);
        // Handle error, e.g., set an error state, show a toast notification
      }
    };

    fetchNotice();
  }, [noticeId]); // Depend on noticeId to refetch when the ID changes



  useEffect(() => {
    const fetchRelatedNotices = async () => {
      1
      try {
        const response = await axios.get(`/api/get_news?category=General&limit=3`);
        if (response.data.success) {
          setRelatedNotices(response.data.notices);
        }
      } catch (error) {
        console.error('Error fetching related notices:', error);
        // Handle error here
      }
    };

    fetchRelatedNotices();
  }, []); // Run once on component mount, or consider adding dependencies like `notice.category`

  return (
    <div className="min-h-screen">
      <Navbar header_click={handleCategoryChange} navLinks={navLinks} />

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-3 sm:mt-4 md:mt-10 ml-3 sm:ml-5 md:ml-10">
        NOTICE
      </h1>
      <div className='flex flex-row mt-5 lg:ml-5'>
        {/* Pass the fetched notice and related notices to NoticeDetail */}
        <NoticeDetail
          Notice={notice}
          Articles={topArticles} // Use topArticles for clarity
          Notices={relatedNotices} // Use relatedNotices for clarity
        />
      </div>
    </div>
  );
}