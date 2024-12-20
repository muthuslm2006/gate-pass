import { Component, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GatePassService } from '../service/gate-pass.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseObj } from '../model/responceObj';
import { AngularSignaturePadModule, NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { CommonModule, isPlatformBrowser } from '@angular/common';

class ImageUpload {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-gp-entry-screen',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AngularSignaturePadModule, CommonModule],
  templateUrl: './gp-entry-screen.component.html',
  styleUrl: './gp-entry-screen.component.css',
  providers: [GatePassService]
})
export class GpEntryScreenComponent {
  @ViewChild('signature')
  public signaturePad !: SignaturePadComponent;

  signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 200,
    canvasHeight: 100
  };
  gateEntryForm;
  profileFileForUpload: any;
  signatureFileForUpload: any;
  profileSelectedFile: ImageUpload | undefined;
  signatureSelectedFile: ImageUpload | undefined;
  public isBrowser: boolean;

  constructor(private gatePassService: GatePassService, private formBuilder: FormBuilder, private toster: ToastrService, @Inject(PLATFORM_ID) platformId: Object, private renderer2: Renderer2) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.gateEntryForm = formBuilder.group({
      name: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required] }],
      dob: ['', { validators: [Validators.required] }],
      entryDate: ['', { validators: [Validators.required] }],
      phoneNumber: ['', { validators: [Validators.required] }],

    });
  }
  addGatePassEntry() {
    console.log("sp", this.signaturePad);
    console.log(this.signaturePad.toDataURL());
    console.log(this.profileFileForUpload);
    this.signatureFileForUpload = this.dataURItoBlob(this.signaturePad, "signature.png");
    //var img = this.selectedFile.src;
    var name = this.gateEntryForm.value.name;
    var email = this.gateEntryForm.value.email;
    var dob = this.gateEntryForm.value.dob;
    var entryDate = this.gateEntryForm.value.entryDate;
    var phoneNumber = this.gateEntryForm.value.phoneNumber;
    var gatePassEntry: any = {};
    gatePassEntry['name'] = name;
    gatePassEntry['email'] = email;
    gatePassEntry['dob'] = dob;
    gatePassEntry['phoneNumber'] = phoneNumber;
    gatePassEntry['entryDate'] = entryDate;
    data: ResponseObj;
    this.gatePassService.createGatePassEntry(gatePassEntry)
      .subscribe(
        responceObj => {
          console.log("responceObj", responceObj.id);
          this.toster.success(responceObj.message, "Gate Pass is Created");
          this.gatePassService.uploadImages(this.profileFileForUpload, "Profile", responceObj.id)
            .subscribe(
              responseObjProfile => {
                console.log("this is the SUCESS of Gate Pass Profile Upload Image", responseObjProfile);
                // this.toster.success("Company created Sucessfully!!!","Company Created");
              },
              error => {
                console.log("this is the SUCESS of Gate Pass Profile Upload Image", error);
              }
            );
          this.gatePassService.uploadImages(this.signatureFileForUpload, "Signature", responceObj.id)
            .subscribe(
              responseObjSignature => {
                console.log("this is the SUCESS of Gate Pass Signature Upload Logo", responseObjSignature);
                // this.toster.success("Company created Sucessfully!!!","Company Created");
              },
              error => {
                console.log("this is the SUCESS of Gate Pass Signature Upload Logo", error);
              }
            );
          this.gateEntryForm.reset();
        })

  }

  profileProcessFile(imageInput: any, event: any) {
    const file: File = imageInput.files[0];
    this.profileFileForUpload = event.target.files[0];

    console.log("eventevent", event.target)
    // console.log("this.selectedFileForUpload", this.selectedFileForUpload);
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.profileSelectedFile = new ImageUpload(event.target.result, file);
    });
    reader.readAsDataURL(file);
    // console.log("Selected File details", this.selectedFile);
  }
  signatureProcessFile(imageInput: any, event: any) {
    const file: File = imageInput.files[0];
    this.signatureFileForUpload = event.target.files[0];

    console.log("eventevent", event.target)
    // console.log("this.selectedFileForUpload", this.selectedFileForUpload);
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.signatureSelectedFile = new ImageUpload(event.target.result, file);
    });
    reader.readAsDataURL(file);
    // console.log("Selected File details", this.selectedFile);
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5); 

        // set szimek-signature_pad options at runtime
    // this.signaturePad is now available
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    console.log('Completed drawing', event);
    console.log(this.signaturePad.toDataURL());
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }

  dataURItoBlob(dataURI: any, fileName: string): File {

    // convert base64/URLEncoded data component to a file
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new File([ia], fileName, { type: mimeString });
  }
}
