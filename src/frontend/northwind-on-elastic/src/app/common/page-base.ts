import {AlertController} from '@ionic/angular';
import {FilterServiceService} from '../services/filter-service.service';
import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

export abstract class PageBase implements OnInit, OnDestroy {
  private filterChangeSubscription: Subscription;

  protected constructor(
    protected filterService: FilterServiceService,
    protected alertController: AlertController) {
  }

  ngOnInit() {
    this.filterChangeSubscription = this.filterService.filterChanged.subscribe(value => this.loadData(value));
  }

  ngOnDestroy() {
    this.filterChangeSubscription.unsubscribe();
  }

  protected async showMessage(header: string, message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public abstract loadData(filterValue: string);
}
