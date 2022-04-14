import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor() { }

  public async getAllReviews(){
    const reviews = await Storage.get({key:"reviews"});
    return JSON.parse(reviews.value);
  }

  public async addReview(
    restaurantId: number,
    userName: string,
    rating: number,
    comment: string
  ) {
    const { value: allReviewsString } = await Storage.get({ key: "reviews" });
    const allReviews = allReviewsString?JSON.parse(allReviewsString):[];
    const reviewId = allReviews.length + 1;
    allReviews.push({
      reviewId, restaurantId, userName, rating, comment
    });
    await Storage.set({
      key: "reviews",
      value: JSON.stringify(allReviews)
    });
    return {
      reviewId, restaurantId, userName, rating, comment
    }
  }

  public async allReview(
    restaurantId:number
  ){
    const {value:allReviewsString} = await Storage.get({key:'reviews'})
    const allReviews = allReviewsString ? JSON.parse(allReviewsString) : [];
    return (allReviews.filter(reviews => reviews.restaurantId === restaurantId))
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

  public async editReview(reviewId:number,details:{
    comment:string,
    rating:number
    restaurantId: number,
    userName: string
    }){
      
    const reviews = await this.getAllReviews()
    const reviewIndex = reviews.findIndex(review => review.reviewId === Number(reviewId))
    console.log(reviewIndex);
    
    if (reviewIndex === undefined) {
      throw "Review id is wrong";
    }
    reviews[reviewIndex] ={
      // reviewId,
      ...details
    };
    await Storage.set({key:'reviews',value:JSON.stringify(reviews)})
    return reviews[reviewIndex];

  }
}
