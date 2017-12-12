import { Component, Input, OnChanges, SimpleChanges, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ConvData } from '../dev/convData.model';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
@Component({
 selector: 'app-line-chart',
 templateUrl: './plot.component.html'
})
export class PlotComponent implements OnChanges  {
  
  showPlot = false;
  @Input() plot: ConvData;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  ngOnChanges() {
    this.showPlot=this.plot.ifPlot;
    setTimeout(() => {
      this.lineChartData=[{data: this.plot.plotData, label: 'Series A'}];
      this.lineChartLabels=this.plot.plotTest;
      // console.log(this.lineChartLabels);
           if (this.chart && this.chart.chart && this.chart.chart.config) {
               this.chart.chart.config.data.labels = this.lineChartLabels;
               this.chart.chart.config.data.datasets = this.lineChartData;
               this.chart.chart.config.data.options = this.lineChartOptions;
               this.chart.chart.update();
           }
       });
  }

 // lineChart
 public lineChartData:Array<any> = [
   {data: [], label: 'Series A'},
  //  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //  {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
 ];
 public lineChartLabels:Array<any>=[];


 public lineChartOptions:any = {
   responsive: true
 };
 public lineChartColors:Array<any> = [
   { // grey
     backgroundColor: 'rgba(148,159,177,0.2)',
     borderColor: 'rgba(148,159,177,1)',
     pointBackgroundColor: 'rgba(148,159,177,1)',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
   },
   { // dark grey
     backgroundColor: 'rgba(77,83,96,0.2)',
     borderColor: 'rgba(77,83,96,1)',
     pointBackgroundColor: 'rgba(77,83,96,1)',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(77,83,96,1)'
   },
   { // grey
     backgroundColor: 'rgba(148,159,177,0.2)',
     borderColor: 'rgba(148,159,177,1)',
     pointBackgroundColor: 'rgba(148,159,177,1)',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
   }
 ];
 public lineChartLegend:boolean = true;
 public lineChartType:string = 'line';

 public randomize():void {
   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
   for (let i = 0; i < this.lineChartData.length; i++) {
     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
     }
   }
   this.lineChartData = _lineChartData;
 }

 // events
 public chartClicked(e:any):void {
   console.log(e);
 }

 public chartHovered(e:any):void {
   console.log(e);
 }
}