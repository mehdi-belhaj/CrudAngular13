import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { CandidateService } from '../../modules/candidate/candidate.service';
import { TokenStorageService } from '../../modules/authentication/services/token-storage-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private tokenService: TokenStorageService) { }
public user;
  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position = 'left';

   
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        text: 'Registred Candidates By Post',
        display: true
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [

      { data: [50, 150, 350, 450, 560, 700], label: 'SALESFORCE DEVELOPERS' },
      { data: [120, 250, 500, 600, 670, 850], label: 'TESTING DEVELOPERS' },
      { data: [600, 670, 800, 900, 1000, 1200], label: 'FULLSTACK DEVELOPERS' }
    ]
  };



  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [1300, 1500, 1870, 2000, 2400, 3000],
        label: 'Number Of Candidates registred',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }],
    labels: ['2016', '2017', '2018', '2019', '2020', '2021']
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 100
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        text: 'All Registred Candidates',
        display: true
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public lineChartPlugins = [
    DataLabelsPlugin
  ];
  public lineChartType: ChartType = 'line';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: {
        text: 'Registred Candidates By Activity Area',
        display: true
      },
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['FINANCIAL SERVICES', 'CONSUMER PRODUCT', 'REATAIL DISTRIBUTION', 'ENERGY', 'PUBLIC SECTOR', 'LIFE SCIENCE', 'TELECOMMUNICATION', 'AUTOMOTIVE'],
    datasets: [{
      data: [450, 500, 200, 262, 230, 654, 320, 460]
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DataLabelsPlugin];






}
