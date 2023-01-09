import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Review extends Component {
  render() {
    const { inputEmail, textarea, note } = this.props;

    return (
      <div>
        <p data-testid="review-card-email">{ inputEmail }</p>
        <p data-testid="review-card-rating">{ textarea }</p>
        <p data-testid="review-card-evaluation">{ note }</p>
      </div>
    );
  }
}

Review.propTypes = {
  inputEmail: PropTypes.string.isRequired,
  textarea: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
};

export default Review;
