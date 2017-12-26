import { Component, Input, OnChanges, SimpleChanges, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ConvData } from '../dev/convData.model';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
@Component({
 selector: 'app-bar-chart',
 templateUrl: './plot.component.html'
})
export class PlotComponent implements OnChanges  {
  
  showPlot = false;
  summary = [];
  @Input() plot: ConvData;
  @Input() originalData;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  ngOnChanges() {
    this.summary=this.originalData;
    this.showPlot=this.plot.ifPlot;
    console.log(this.summary);
    setTimeout(() => {
      this.barChartData=[{data: this.plot.plotData, label: 'Diff'}];
      this.barChartLabels=this.plot.plotTest;
      // console.log(this.barChartLabels);
           if (this.chart && this.chart.chart && this.chart.chart.config) {
               this.chart.chart.config.data.labels = this.barChartLabels;
               this.chart.chart.config.data.datasets = this.barChartData;
               this.chart.chart.config.data.options = this.barChartOptions;
              //  console.log(this.chart.chart.config.data);               
               this.chart.chart.update();
               console.log(this.chart.chart);
           }
       });
  }

 // barChart
 public barChartData:Array<any> = [
   {data: [], label: 'Diff'},
  //  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //  {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
 ];
 public barChartLabels:Array<any>=[];


 public barChartOptions:any = {
   responsive: true
 };
 public barChartColors:Array<any> = [
  //  { // grey
  //    backgroundColor: 'rgba(148,159,177,0.2)',
  //    borderColor: 'rgba(148,159,177,1)',
  //    pointBackgroundColor: 'rgba(148,159,177,1)',
  //    pointBorderColor: '#fff',
  //    pointHoverBackgroundColor: '#fff',
  //    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //  },
   { // dark grey
    backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"] ,
    borderColor: 'rgba(225,10,24,0.2)',
    pointBackgroundColor: 'rgba(225,10,24,0.2)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(225,10,24,0.2)'
   },
  //  { // grey
  //    backgroundColor: 'rgba(148,159,177,0.2)',
  //    borderColor: 'rgba(148,159,177,1)',
  //    pointBackgroundColor: 'rgba(148,159,177,1)',
  //    pointBorderColor: '#fff',
  //    pointHoverBackgroundColor: '#fff',
  //    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //  }
 ];
 public barChartLegend:boolean = true;
 public barChartType:string = 'bar';

 public randomize():void {
   let _barChartData:Array<any> = new Array(this.barChartData.length);
   for (let i = 0; i < this.barChartData.length; i++) {
     _barChartData[i] = {data: new Array(this.barChartData[i].data.length), label: this.barChartData[i].label};
     for (let j = 0; j < this.barChartData[i].data.length; j++) {
       _barChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
     }
   }
   this.barChartData = _barChartData;
 }

 // events
 public chartClicked(e:any):void {
   console.log(e);
 }

 public chartHovered(e:any):void {
   console.log(e);
 }
}