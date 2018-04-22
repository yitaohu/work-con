import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DevService } from '../dev/dev.service';

@Component({
    selector: 'app-residual',
    templateUrl: './residual.component.html'

})

export class ResidualComponent implements OnInit{


    constructor(
        private route: ActivatedRoute,
        private devService: DevService
    ){}
    isChartReady1 = false;
    isChartReady2 = false;

    ngOnInit(): void {
        var testName = this.getTestJouNames()[0];
        var jounalName = this.getTestJouNames()[1];
        var outUrl1 = decodeURIComponent(this.getTestJouNames()[2]);
        var outUrl2 = decodeURIComponent(this.getTestJouNames()[3]);
        console.log(testName);
        console.log(jounalName);
        console.log( outUrl1);
        console.log( outUrl2);
        
        this.devService.getResidual(testName,jounalName, outUrl1,outUrl2)
        .subscribe(
            data =>  {
                console.log(data);
                this.lineChartLabels1 = data.One.iteration;
                this.lineChartLabels2 = data.Two.iteration;
                this.lineChartData1 = [];
                this.lineChartData2 = [];
                for(let i = 0; i < data.One.label.length; i ++) {
                    this.lineChartData1.push({"data": data.One.resData[i], "label": data.One.label[i], "fill": false,})
                    this.lineChartData2.push({"data": data.Two.resData[i], "label": data.Two.label[i], "fill": false,})
                }
                this.isChartReady1 = true;
                this.isChartReady2 = true;

    // public lineChartData: Array<any> = [
    //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    //     { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    // ];
        


                console.log(this.lineChartData1);
                console.log(this.lineChartData2);
                
            },

            error =>  {
                console.log(error);
            }

        )
    }

    public lineChartData2 = [];
    public lineChartData1;
    public lineChartLabels1;
    public lineChartLabels2;


    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    getTestJouNames(){
        var testname =  this.route.snapshot.paramMap.get('testName');
        var jounalname = this.route.snapshot.paramMap.get('journalName');
        var outUrl1 = this.route.snapshot.paramMap.get('outUrl1');
        var outUrl2 = this.route.snapshot.paramMap.get('outUrl2');
        return [testname, jounalname, outUrl1, outUrl2];
    }

    processData(data: Object) {

    }
    
} 