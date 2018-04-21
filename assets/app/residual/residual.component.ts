import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DevService } from '../dev/dev.service';

@Component({
    selector: 'app-residual',
    templateUrl: './residual.component.html'

})

export class ResidualComponent implements OnInit{

    @Input() originalData;
    constructor(
        private route: ActivatedRoute,
        private devService: DevService
    ){}

    ngOnInit(): void {
        var testName = this.getTestJouNames()[0];
        var jounalName = this.getTestJouNames()[1];
        console.log(testName);
        console.log(jounalName);

        var keyName = testName + "||" + jounalName;
        console.log(keyName);
        console.log(this.originalData);

        var outIndex = this.originalData[0].indexOf(keyName);

        var outDir1 = this.originalData[4][outIndex];
        var outDir2 = this.originalData[5][outIndex];
        console.log(outDir1);
        console.log(outDir2);
    //     this.devService.getResidual(jounalName, outDir1,outDir2)
    //     .subscribe(
    //         data =>  {
    //             console.log(data);
    //         },

    //         error =>  {
    //             console.log(error);
    //         }

    //     )
    }

    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    getTestJouNames(){
        var testname =  this.route.snapshot.paramMap.get('testName');
        var jounalname = this.route.snapshot.paramMap.get('journalName');
        return [testname, jounalname];
    }
    
} 