import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray  } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoService } from '../services/video.service';


@Component({
  selector: 'app-webcam-manage',
  templateUrl: './webcam-manage.component.html',
  styleUrls: ['./webcam-manage.component.css']
})
export class WebcamManageComponent implements OnInit,OnDestroy {
  
  fg :FormGroup;
  subject$ = new Subject();
  mess = { success: true , message: '' }
  show = false;

  constructor(private svideo: VideoService,  private fb: FormBuilder,private router: Router) { }
  
  
  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subject$.complete();
  }

  ngOnInit(): void {
    let fa = this.fb.array([]) ;
    this.svideo.getWebcam()
    .pipe(takeUntil(this.subject$))
    .subscribe( (list) =>  {
        for (var e of list) { 
              fa.push( this.fb.control( e.id, [Validators.required]) ) 
            };
            
        this.fg =    this.fb.group({
          params: fa
          
        }); 

    });


  }

  trackByFn(index, item) {   return index; }

  add():void {
  
    let control = this.fg.get("params") as FormArray ;
    control.push(this.fb.control( '' , [Validators.required]) ) ;
  
  }

  delete(i):void {
  
    let control = this.fg.get("params") as FormArray ;

    control.removeAt(i);
  
  }



towebcam():void {

  this.router.navigateByUrl('/webcam');

}



onSubmit():void {
let res = this.fg.value ;
if( this.fg.valid ) {
  this.show =true ;
  this.svideo.saveWebcam(res.params).subscribe( {
    next: (r) => this.mess =r ,
    error: (e)  => this.mess = e ,
    complete: () =>   setTimeout(() => {
      this.show = false;
    }, 2000)
  }
    
     );
  

}



}

}


