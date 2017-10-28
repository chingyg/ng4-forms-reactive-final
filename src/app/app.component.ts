import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators,FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];

  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];


ngOnInit(){
  this.signupForm = new FormGroup({
    'userData': new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmails),
    }),
    'gender': new FormControl('male'),
    'hobbies': new FormArray([])// Form array holds an array of controls
  });

  // Use these observables if you want to react based on changes.
  // this.signupForm.valueChanges.subscribe((value) => console.log(value));
  this.signupForm.statusChanges.subscribe((status) => console.log(status));

  // You can update your own form by setting the values
  this.signupForm.setValue({
    'userData': {
      'username': 'Max',
      'email': 'max@test.com'
    },
    'gender': 'male',
    'hobbies': []
  });
}

// you can user patchValue instead of setValue for updating only certain bits of the form and not the entire form 



onSubmit(){
  console.log(this.signupForm);
  
  // reset form
  this.signupForm.reset();
}

onAddHobby()
{
  const control = new FormControl(null,Validators.required);

  // we need to downcast here
  (<FormArray>this.signupForm.get('hobbies')).push(control);
}

/**
 * Should return a key-value pair of type boolean
 */
forbiddenNames(control: FormControl): {[s: string]: boolean} {
  if(this.forbiddenUserNames.indexOf(control.value) !== -1){
    return {'nameIsForbidden': true};
  }
  // if validation is successful, you have to pass nothing or null
  return null;
}

/**
 * This is a validator
 * @param control 
 */
forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
  const promise = new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if(control.value === 'test@test.com'){
        resolve({'emailIsForbidden' : true});
      }else{
        resolve(null);
      }
    },1500);
  });
  return promise;
}

}