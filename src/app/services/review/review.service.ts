import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor() { }

  public async addReview(
    restaurantId: number,
    userId: number,
    rating: number,
    comment: string
  ) {
    const { value: allReviewsString } = await Storage.get({ key: "reviews" });
    const allReviews = JSON.parse(allReviewsString);
    const reviewId = allReviews.length + 1;
    allReviews.push({
      reviewId, restaurantId, userId, rating, comment
    });
    await Storage.set({
      key: "reviews",
      value: JSON.stringify(allReviews)
    });
  }

  public async removeReview(
    reviewId: number
  ) {
    const { value: allReviewsString } = await Storage.get({ key: "reviews" });
    const allReviews = JSON.parse(allReviewsString);
    const reviewIndex = allReviews.findIndex(review => review.reviewId === reviewId);
    if (reviewIndex > -1) {
      allReviews.splice(reviewIndex, 1);
      await Storage.set({
        key: "reviews",
        value: JSON.stringify(allReviews)
      });
    }
  }
}
