import React, { useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_LIKE_POSTS_REQUEST } from '../reducers/post';
import { Content } from '../styled/explore';
import PostLoader from '../components/PostLoader';

const ImageLayout = dynamic(() => import('../components/ImageLayout'), {
  loading: () => <PostLoader />,
});

const Like = () => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (mainPosts.length !== 0 && hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_LIKE_POSTS_REQUEST,
            lastId,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    countRef.current = [];
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost]);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <Content>
      {me ? (
        <>
          <ImageLayout
            title={'좋아요 탭'}
            mainPosts={mainPosts}
            hasMorePost={hasMorePost}
            location={'like'}
          />
        </>
      ) : (
        <Loading />
      )}
    </Content>
  );
};

Like.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_LIKE_POSTS_REQUEST,
  });
};

export default Like;
