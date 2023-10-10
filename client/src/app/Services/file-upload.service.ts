import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient,
    private fireStorage: AngularFireStorage) { }
  
  uploadFile(file: any, username: string) {
    const fileName = "/files"+Math.random()+file;
    const fileRef = this.fireStorage.ref(fileName);
    this.fireStorage.upload(fileName, file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          url = url.replace('https://firebasestorage.googleapis.com/v0/b/wetalk-firebase.appspot.com/o/', '');
          const body = {
            "url": url
          }
          this.setProfilePicId(username, url).subscribe((res: any) => {
            return true;
          });
        })
      })
    ).subscribe();
  }
  setProfilePicId(username: string, url: any) {
    return this.http.put('http://127.0.0.1:3001/setImageId/'+username, { url }, this.httpOptions);
  }
}
