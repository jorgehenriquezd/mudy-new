import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/models/vehicle.model';
import { TransportistaMainComponent } from '../transportista-main/transportista-main.component';

@Component({
  selector: 'app-vehicle-documents',
  templateUrl: './vehicle-documents.component.html',
  styleUrls: ['./vehicle-documents.component.scss']
})
export class VehicleDocumentsComponent implements OnInit {

  form: FormGroup;
  base64 = {
    technical_review: '',
    gas_review: '',
    circulation_permit: '',
    padron: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    public main: TransportistaMainComponent,
  ) {
    this.form = this.formBuilder.group({
      technical_review: ['', [Validators.required]],
      date_technical_review: ['', [Validators.required]],
      gas_review: ['', [Validators.required]],
      date_gas_review: ['', [Validators.required]],
      circulation_permit: ['', [Validators.required]],
      date_circulation_permit: ['', [Validators.required]],
      padron: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  _technical_review(event: any) {    
    const file = event.target.files[0]; 

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64.technical_review = reader.result as any;
      this.technical_review?.setValue(reader.result);      
    };    
  }
 
  _gas_review(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64.gas_review = reader.result as any;
      this.gas_review?.setValue(reader.result);
    };    
  }

  _circulation_permit(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64.circulation_permit = reader.result as any;
      this.circulation_permit?.setValue(reader.result);
    };

  }

  _padron(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64.padron = reader.result as any;
      this.padron?.setValue(reader.result);
    };    
  }

  back() {
    this.main.step$.next(4);
  }

  next() {
    this.main.vehicle.technical_review = this.technical_review?.value
    this.main.vehicle.date_technical_review = this.date_technical_review?.value
    this.main.vehicle.gas_review = this.gas_review?.value
    this.main.vehicle.date_gas_review = this.date_gas_review?.value
    this.main.vehicle.circulation_permit = this.circulation_permit?.value
    this.main.vehicle.date_circulation_permit = this.date_circulation_permit?.value
    this.main.vehicle.padron = this.padron?.value
    this.main.carrier.vehicles.push(this.main.vehicle);
    this.main.step$.next(6);
    this.main.vehicle = {} as Vehicle;       
  }

  get technical_review() {
    return this.form.get('technical_review');
  }
  get date_technical_review() {
    return this.form.get('date_technical_review');
  }
  get gas_review() {
    return this.form.get('gas_review');
  }
  get date_gas_review() {
    return this.form.get('date_gas_review');
  }
  get circulation_permit() {
    return this.form.get('circulation_permit');
  }
  get date_circulation_permit() {
    return this.form.get('date_circulation_permit');
  }
  get padron() {
    return this.form.get('padron');
  }
}