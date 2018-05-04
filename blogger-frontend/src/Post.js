import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle } from 'material-ui/Card';


const Post = ({title, author, topic, saved}) => {

  return (
    <Card>
      <CardHeader
        title={author}
        subtitle={ saved ? 'saved' : 'unsaved' }
      />
      <CardTitle title={title} subtitle={topic} />
    </Card>
  );

};

Post.propTypes = {
};

export default Post;