
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TrainnerService } from './shared/trainner.service';
import { Trainner } from './trainner.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Trainner Registration Form ';
  registrationForm: FormGroup;
  allTrainner: Trainner[];

  data = {
	"trainer_id": "t001",
	"personal_details": {
		"name": {
			"first_name": "Naveen",
			"last_name": "Kumar"
		},
		"dob": "1990-12-20",
		"about_yourself": "i am a corporate trainer from 10 years",
		"languages_known": ["Kannada", "English", "Tamil"],
		"willing_to_travel": "yes"
	},
	"technologies": [{
		"name": "Angular 2",
		"experience": 4,
		"ratings": 7.9,
		"costing": {
			"freshers": 8000,
			"laterals": 12000,
			"project_specific": 15000
		},
		"work_as_consultant": "yes"
	}],
	"certifications": [{
		"title": "Sun Certified",
		"Year": 1999
	}],
};
  


  getLangsform(): FormArray {
    return this.registrationForm.get('personal_details').get('languages_known') as FormArray;
  }

  addLanguage() {
    this.getLangsform().push(this.fb.control(''));
  }


  constructor(private  fb: FormBuilder , private _trainnerservice: TrainnerService) {}
  ngOnInit() {
    this.registrationForm = this.fb.group({
      personal_details : this.fb.group({
        name: this.fb.group({
          first_name: [''],
          last_name: ['']
        }),
        about_yourself: [''],
        dob: [''],
        // lang: [''],
        languages_known: this.fb.array([]),
        willingly_to_travel: ['']
      }),
      technologies: this.fb.array([
        this.addTech()
      ]),

      certifications : this.fb.array([
        this.addCertificate()
      ]),
    });
    // this.getAllTrainners();
    this.editTrainner();
  }

  addTechnologies(): void {
    (this.registrationForm.get('technologies') as FormArray).push(this.addTech());
  }

  addTech(): FormGroup {
    return this.fb.group({
      name: [''],
      experience : [''],
      ratings : [''],
      costing :  this.fb.group({
        freshers: [''],
        laterals : [''],
        project_specific: ['']
      }),
      work_as_consultant: ['']
    });
  }
  addcertification(): void {
    (this.registrationForm.get('certifications')as FormArray).push(this.addCertificate());
  }
  addCertificate(): FormGroup {
    return this.fb.group({
      title: [''],
      Year : ['']
    });
  }

  getAllTrainners() {
    this._trainnerservice.getAllTrainner();
  }

  onSubmit(currentTrainner: Trainner) {
    console.log('checking');
    if (currentTrainner._id === null) {
      console.log('Create');
      this._trainnerservice.register(currentTrainner).subscribe(
        (data) => {
          this._trainnerservice.getAllTrainner();
        });
    } else {
      console.log('Update');
      this._trainnerservice.updateTrainner(currentTrainner).subscribe(
        (data) => {
          this._trainnerservice.getAllTrainner();
        });
    }
  }



  editTrainner() {
    this._trainnerservice.currentTrainner = this.data;
    this.registrationForm.patchValue({
          personal_details: { type: Object,
            name: { type: Object,
                first_name: this._trainnerservice.currentTrainner.personal_details.name.first_name,
                last_name: this._trainnerservice.currentTrainner.personal_details.name.last_name
            },
            dob: this._trainnerservice.currentTrainner.personal_details.dob,
            about_yourself: this._trainnerservice.currentTrainner.personal_details.about_yourself,
            willingly_to_travel: this._trainnerservice.currentTrainner.personal_details.willingly_to_travel
        }
    });
    this.addlanguages_known();
  }
  addlanguages_known(): any {
    const control = this.registrationForm.get('personal_details.languages_known') as FormArray;
    this._trainnerservice.currentTrainner.personal_details.languages_known.forEach(x => {
        control.push(this.fb.control(x));
      });
  }
}