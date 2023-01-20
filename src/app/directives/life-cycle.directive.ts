import { Directive, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLifeCycle]'
})
export class LifeCycleDirective implements OnInit, OnChanges ,OnDestroy{

  constructor() { }

  ngOnInit(): void {
    this.lifeCycle('OnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lifeCycle('onChanges');
  }


  ngOnDestroy(): void {
    this.lifeCycle('OnDestroy');
  }

  lifeCycle(hook:string, changes?: SimpleChanges){
    console.log(`CICLO DE VIDA: ${hook}`);
    if(changes){
      console.log('Cambios:', changes);
    }
  }

}
