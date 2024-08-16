import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private firestore: Firestore = inject(Firestore);

  public avatar: string = './assets/images/profile.png';

  private storage = getStorage();

  public async onFileSelected(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      let uploadedPhoto = await this.uploadProfileImageTemp(file);
      if (uploadedPhoto) {
        this.avatar = uploadedPhoto;
      }
    }
  }

  private async uploadProfileImageTemp(file: File): Promise<string> {
    const storageRef = ref(this.storage, `avatars/${Date.now()}_${file.name}`);
    const uploadResult = await uploadBytes(storageRef, file);
    return await getDownloadURL(uploadResult.ref);
  }
}
