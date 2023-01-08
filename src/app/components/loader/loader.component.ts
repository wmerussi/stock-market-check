import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  public isLoading = this.loadingService.isLoading;
  constructor(private loadingService: LoadingService) {}
}
