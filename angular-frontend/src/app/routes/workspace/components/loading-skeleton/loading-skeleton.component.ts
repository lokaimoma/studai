import { Component } from '@angular/core';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [HlmSkeletonComponent],
  templateUrl: './loading-skeleton.component.html',
})
export class LoadingSkeletonComponent {}
