export default class Patent {
  id: string;
  applicationNumber: string | null | undefined;
  title: string | null | undefined;
  country: string | null | undefined;
  sizePatentFamily: number | null | undefined;
  numberOfCitations: number | null | undefined;
  applicationFields: string[] | null | undefined;
  status: string | null | undefined;
  owner: string | null | undefined;

  constructor(id: string, data: Partial<Patent>) {
    this.id = id;
    this.applicationNumber = data.applicationNumber;
    this.title = data.title;
    this.country = data.country;
    this.sizePatentFamily = data.sizePatentFamily;
    this.numberOfCitations = data.numberOfCitations;
    this.applicationFields = data.applicationFields;
    this.status = data.status;
    this.owner = data.owner;
  }
}

export type PatentValueObject = Omit<Patent, 'id'>;
