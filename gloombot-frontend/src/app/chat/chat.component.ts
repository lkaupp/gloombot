import {
  AfterViewChecked, AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  IterableDiffers,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {CommonModule, ViewportScroller} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CdkVirtualScrollableElement, CdkVirtualScrollViewport, ScrollingModule} from "@angular/cdk/scrolling";
import {debounceTime, delay, distinctUntilChanged, fromEvent, of, Subject, Subscription, takeUntil} from "rxjs";
import {
  castAsAny
} from "@angular/compiler-cli/src/transformers/jit_transforms/initializer_api_transforms/transform_api";
import {RagService} from "../ragservice.service";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatCardModule, CommonModule, FlexLayoutModule, FormsModule, MatFormFieldModule, MatInputModule, ScrollingModule, MatToolbarModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild(CdkVirtualScrollViewport) public virtualViewport!: CdkVirtualScrollViewport;
  protected deactivatedSubject: Subject<boolean> = new Subject<boolean>();
  scrollToIndex$: Subject<void> = new Subject();
  subscriptions = new Subscription();
  messages: any = [];
  text: any;

  constructor(private ragservice: RagService) {
  }

  public ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(
      distinctUntilChanged(),
      debounceTime(10),
      // sampleTime(0, animationFrameScheduler),
      takeUntil(this.deactivatedSubject)
      ).subscribe(() => {
        (<any>this.virtualViewport).checkViewportSize();
      });
     this.subscriptions.add(
      this.scrollToIndex$
        .pipe(delay(0))
        .subscribe(() =>
          this.virtualViewport.scrollTo({ bottom: 0, behavior: 'instant' })
        )
    );
  }

  public ngAfterViewInit() {
    this.scrollToIndex$.next();
  }

  public ngOnDestroy() {
    this.deactivatedSubject.next(true);
    this.deactivatedSubject.complete();
    this.subscriptions.unsubscribe();
  }

  addnew($event: any) {
    let question = $event.target.value;
    this.messages = [...this.messages, {author:'ME', text: question}];

    this.text ='';
    this.scrollToIndex$.next();
    this.ragservice.getAnswer(question).subscribe((answer) => {
      this.messages = [...this.messages, {author:'GloomBot', text: answer}];
       this.scrollToIndex$.next();
    });


  }

  viewportScrollToBottom(): void {

  }

}
