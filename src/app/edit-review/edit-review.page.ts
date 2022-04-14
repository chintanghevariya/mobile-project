import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { ReviewService } from '../services/review/review.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.page.html',
  styleUrls: ['./edit-review.page.scss'],
})
export class EditReviewPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ReviewService: ReviewService,
    private AppComponent:AppComponent,
    private toastController:ToastController
  ) { }
    rating= 3
    comment=''
    restaurantId:number
    reviewId :number
  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.reviewId = params.reviewId
      this.restaurantId=params.restaurantId
      this.rating=params.rating
      this.comment=params.comment
    })
  }

  submitUpdatedReview(){
    const details = {
      reviewId : Number(this.reviewId),
      restaurantId:Number(this.restaurantId),
      userName:localStorage.getItem('userName'),
      rating:this.rating,
      comment:this.comment
    }  

    this.ReviewService
        .editReview(this.reviewId,details)
        .then(async()=>{
          const toast = await this.toastController.create({
            message: 'Your review has been updated.',
            duration: 2000,
            color: "success"
          });
          toast.present()
          .then(
            ()=>this.AppComponent.goBack()
          )
        })
        .catch(err=>{
          console.log(err);   
        })
  }

}
