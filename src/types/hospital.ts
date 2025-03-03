
export interface Hospital {
  _id: string;
  name: string;
  city: string;
  image: string;
  specialty: string[];
  rating: number;
}

export interface HospitalDetail {
  _id: string;
  hospitalId: string;
  description: string;
  images: string[];
  numberOfDoctors: number;
  numberOfDepartments: number;
}
