import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Card } from './style';
import CommentForm from '../CommentForm';
import ImageSlider from '../../components/ImageSlider';
import PostCardContent from '../../components/PostCardContent';
import PostCardComment from '../../components/PostCardComment';

const PostCard = memo(({ post }) => {
  const onToggleLike = useCallback(() => {}, []);
  const onClickComment = useCallback(() => {}, []);
  return (
    <Card>
      <div className="title">
        <Row>
          <Col xs={3} md={2}>
            {post.User.image ? (
              <Avatar src={post.User.image} />
            ) : (
              <Avatar>{post.User.nickname[0]}</Avatar>
            )}
          </Col>
          <Col xs={2}>
            <h4>
              <b>{post.User.nickname}</b>
            </h4>
          </Col>
          <Col
            xs={{ offset: 18 }}
            xl={{ offset: 19 }}
            xxl={{ offset: 19 }}
            span={1}
          >
            <FontAwesomeIcon
              icon={faEllipsisH}
              color={'#000000'}
              size={'sm'}
              style={{ marginTop: '45%' }}
            />
          </Col>
        </Row>
      </div>
      <ImageSlider images={post.Images} />
      <Row style={{ margin: '4px 0px 0px', padding: '0px 16px' }}>
        <Col xs={6}>
          <FontAwesomeIcon
            icon={faHeart}
            key="like"
            onClick={onToggleLike}
            style={{ width: 24, height: 24 }}
          />
          &emsp;
          <FontAwesomeIcon
            icon={faComment}
            flip="horizontal"
            key="comment"
            onClick={onClickComment}
            style={{ width: 24, height: 24 }}
          />
        </Col>
      </Row>
      <div style={{ margin: '0px 0px 8px', padding: '0px 16px' }}>
        <h4>
          <b>좋아요 1개</b>
        </h4>
      </div>
      <div className="comment">
        <div>
          <b>{post.User.nickname}</b>&nbsp;
          <PostCardContent contentData={post.content} />
        </div>
        <PostCardComment comments={post.Comments} />
      </div>
      <div style={{ margin: '0px 0px 4px', padding: '0px 0px 0px 16px' }}>
        <h5 style={{ color: '#999999' }}>{post.createdAt}</h5>
      </div>
      <CommentForm postId={post.id} />
    </Card>
  );
});

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
