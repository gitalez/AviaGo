export class InstalacionesItemModel {

  image: string;
  icon: string;
  name: string;
  description: string;
  category: string;
  address: string;
  rating: number;
  reviewsCount: number;
}

export class InstalacionesListingModel {
  
  items: Array<InstalacionesItemModel> = [
    new InstalacionesItemModel(),
    new InstalacionesItemModel(),
    new InstalacionesItemModel(),
    new InstalacionesItemModel()
  ];

  constructor(readonly isShell: boolean) { }
}
