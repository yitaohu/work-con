import { Component, Input, OnChanges, SimpleChanges, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ConvData } from '../dev/convData.model';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './plot.component.html',
  styles: [`
  caption { 
    display: table-caption;
    text-align: center;
  }
 
 `]
})
export class PlotComponent implements OnChanges {

  showPlot = false;
  summary = [];
  less = 0;
  more = 0;
  less_percent;
  more_percent;
  testHref = [];
  lessArray = [];
  moreArray = [];
  sameArray = [];
  @Input() plot: ConvData;
  @Input() originalData;
  @Input() notRunStd;
  @Input() failedStd;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  ngOnChanges() {
    this.less = 0;
    this.more = 0;
    this.summary = this.originalData;
    if (typeof this.summary !=undefined && typeof this.summary[0] != undefined) {
      this.showPlot = this.plot.ifPlot;
      this.lessArray = Array(this.summary.length);
      this.moreArray = Array(this.summary.length);
      this.sameArray = Array(this.summary.length);
  
      for (let item in this.summary[1]) {
        if (parseFloat(this.summary[1][item]) < 0) {
          this.less++;
        } else if (parseFloat(this.summary[1][item]) > 0) {
          this.more++;
        }
        this.summary[1][item] = parseFloat(this.summary[1][item]).toFixed(2);
        
      }
  
      for (let i = 0; i < this.summary[0].length; i++) {
        var testname = this.summary[0][i].split('||')[0];
        var jounalName = this.summary[0][i].split('||')[1];
        var outUrl1 = encodeURIComponent(this.summary[4][i]);
        var outUrl2 = encodeURIComponent(this.summary[5][i]);
        this.testHref.push("/residual/" + testname + "/" + jounalName + "/" + outUrl1 + "/" + outUrl2);
      }
  
      for (let i = 0; i < this.lessArray.length; i++) {
        this.moreArray[i] = this.summary[i].slice(0,this.more);
        this.sameArray[i] = this.summary[i].slice(this.more, this.summary[0].length - this.less );
        this.lessArray[i] = this.summary[i].slice(this.summary[0].length - this.less, this.summary[0].length );
      }
  
      this.moreArray.push(this.testHref.slice(0,this.more));
      this.sameArray.push(this.testHref.slice(this.more, this.summary[0].length - this.less));
      this.lessArray.push(this.testHref.slice(this.summary[0].length - this.less, this.summary[0].length));
      
      this.less_percent = (this.less / this.summary[1].length * 100).toFixed(2);
      this.more_percent = (this.more / this.summary[1].length * 100).toFixed(2);
  
  
      setTimeout(() => {
        this.barChartData = [{
          "data": this.plot.plotData, "label": '% change in Convergence (up means worse)',
          "backgroundColor": Array(this.plot.plotTest.length).fill("rgba(255, 99, 132, 1)")
        }];
        this.barChartLabels = this.plot.plotTest;
        // console.log(this.barChartLabels);
        if (this.chart && this.chart.chart && this.chart.chart.config) {
          this.chart.chart.config.data.labels = this.barChartLabels;
          this.chart.chart.config.data.datasets = this.barChartData;
          this.chart.chart.config.data.options = this.barChartOptions;
          //  console.log(this.chart.chart.config.data);               
          this.chart.chart.update();
          console.log(this.chart.chart);
          console.log(this.summary);
        }
      });
    }

  }
  // barChart
  public barChartData: Array<any> = [
    { data: [], label: 'Diff' },
    //  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    //  {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public barChartLabels: Array<any> = [];


  public barChartOptions: any = {
    responsive: true
  };
  public barChartColors: Array<any> = [
    //  { // grey
    //    backgroundColor: 'rgba(148,159,177,0.2)',
    //    borderColor: 'rgba(148,159,177,1)',
    //    pointBackgroundColor: 'rgba(148,159,177,1)',
    //    pointBorderColor: '#fff',
    //    pointHoverBackgroundColor: '#fff',
    //    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //  },
    // { // dark grey
    //   backgroundColor: ["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"],
    //   borderColor: 'rgba(225,10,24,0.2)',
    //   pointBackgroundColor: 'rgba(225,10,24,0.2)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    // },
    //  { // grey
    //    backgroundColor: 'rgba(148,159,177,0.2)',
    //    borderColor: 'rgba(148,159,177,1)',
    //    pointBackgroundColor: 'rgba(148,159,177,1)',
    //    pointBorderColor: '#fff',
    //    pointHoverBackgroundColor: '#fff',
    //    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //  }
  ];
  public barChartLegend: boolean = true;
  public barChartType: string = 'bar';

}