import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TeamModel } from 'src/app/shared/viewmodels/teamModel.viewmodel';
@Component({
  selector: 'tm-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy{
  @Input() step= 0;
  alertText:string=""
  @ViewChild('csvReader') file: ElementRef | undefined;
  @Input() playerData: any[] = [];
  headerRow: any[] = [];
  teamForm!: FormGroup;
  fileName:string="";
  @Output() errorPass:EventEmitter<string>=new EventEmitter<string>();
  @Output() playerDataChanged: EventEmitter<any> =new EventEmitter<any>();
  @Output() formChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamFile:['',Validators.required],
    });
  }
  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      this.fileName= input.files[0].name
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split('\n');

        this.headerRow = this.getHeaderArray(csvRecordsArray);

        this.playerData = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headerRow.length);
         console.log(this.playerData)
         this.playerDataChanged.emit(this.playerData)
         this.teamForm.controls['teamFile'].setValue(input.files[0]);
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    console.log('getHeaderArray', headerArray);
    return headerArray;
  }
  replaceRange(s:any, start:any, end:any, substitute:any) {
    var middle = s.substring(start,end)
    var cropped = middle.replaceAll(",",substitute)
    var mix = s.substring(0, start) + cropped + s.substring(end);
    return mix
}

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: number) {
    this.alertText=""
    let csvArr: any[] = [];
    csvRecordsArray.every((e: any) => {
      e=e.replace(",,",",")
      var first=e.indexOf('\"')
    var second=e.lastIndexOf('\"')
    var newString = this.replaceRange(e, first+1, second, "\t")
      let currentRecord = (<string>newString).split(",");
      if (currentRecord.length == headerLength) {
        let csvRecord: TeamModel = new TeamModel();
        csvRecord.playerName = currentRecord[0].trim();
        csvRecord.playerImage = currentRecord[1].trim();
        csvRecord.jerseyNumber = currentRecord[2].trim();
        csvRecord.position = currentRecord[3].trim();
        csvRecord.height = currentRecord[4].trim();
        csvRecord.weight = currentRecord[5].trim();
        csvRecord.nationality = currentRecord[6].trim();
        csvRecord.flag = currentRecord[7].trim();
        csvRecord.starter = currentRecord[8].trim();
        csvRecord.appearances = currentRecord[9].trim();
        csvRecord.minutesPlayed = currentRecord[10].trim();
        csvRecord.goals = currentRecord[11].trim();
        csvRecord.assists = currentRecord[12].trim();
        csvRecord.cleanSheets = currentRecord[13].trim();
        csvRecord.saves = currentRecord[14].trim();
        csvArr.push(csvRecord);
        return true
      }
      else {
        csvArr = [];
        this.playerData=[]
        this.headerRow=[]
        this.alertText="One of player have one or more missing fields. Please ensure your .csv has complete information."
        this.fileReset();
        return false


      }


    })
    this.errorPass.emit(this.alertText)
    this.formChanged.emit(this.teamForm)
    return csvArr;
  }

  fileReset() {
    this.file!.nativeElement.value = "";
    this.playerData = [];
  }
  reset(){
    this.fileName="";
    this.playerData = [];
  }
  textListener(){
    this.formChanged.emit(this.teamForm)
  }
}
